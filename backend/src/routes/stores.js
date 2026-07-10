const express = require('express');
const { validationResult } = require('express-validator');
const pool = require('../db/pool');
const { verifyToken, requireRole } = require('../middleware/auth');
const { ratingValidator } = require('../utils/validators');

const router = express.Router();

router.use(verifyToken, requireRole('user'));

const SORTABLE_FIELDS = ['name', 'address', 'rating'];

// GET /api/stores?name=&address=&sortBy=&order=
router.get('/', async (req, res) => {
  const { name, address, sortBy, order } = req.query;
  const sortField = SORTABLE_FIELDS.includes(sortBy) ? sortBy : 'name';
  const sortOrder = String(order).toLowerCase() === 'desc' ? 'DESC' : 'ASC';

  const conditions = [];
  const params = [req.user.id]; // $1 is always the current user id (for the LEFT JOIN)

  if (name) { params.push(`%${name}%`); conditions.push(`s.name ILIKE $${params.length}`); }
  if (address) { params.push(`%${address}%`); conditions.push(`s.address ILIKE $${params.length}`); }
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  try {
    const query = `
      SELECT s.id, s.name, s.address,
        COALESCE(ROUND(AVG(r.rating)::numeric, 2), 0) AS overall_rating,
        my.rating AS my_rating
      FROM stores s
      LEFT JOIN ratings r ON r.store_id = s.id
      LEFT JOIN ratings my ON my.store_id = s.id AND my.user_id = $1
      ${where}
      GROUP BY s.id, my.rating
      ORDER BY ${sortField === 'rating' ? 'overall_rating' : 's.' + sortField} ${sortOrder}
    `;
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error listing stores' });
  }
});

// POST /api/stores/:id/rating - submit a new rating, or update if it already exists
router.post('/:id/rating', [ratingValidator], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const storeId = req.params.id;
  const { rating } = req.body;

  try {
    const store = await pool.query('SELECT id FROM stores WHERE id = $1', [storeId]);
    if (store.rows.length === 0) {
      return res.status(404).json({ message: 'Store not found' });
    }

    const result = await pool.query(
      `INSERT INTO ratings (user_id, store_id, rating)
       VALUES ($1, $2, $3)
       ON CONFLICT (user_id, store_id)
       DO UPDATE SET rating = EXCLUDED.rating, updated_at = NOW()
       RETURNING id, user_id, store_id, rating`,
      [req.user.id, storeId, rating]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error submitting rating' });
  }
});

module.exports = router;
