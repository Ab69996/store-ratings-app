const express = require('express');
const pool = require('../db/pool');
const { verifyToken, requireRole } = require('../middleware/auth');

const router = express.Router();

router.use(verifyToken, requireRole('store_owner'));

// GET /api/store-owner/dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const store = await pool.query('SELECT id, name, address FROM stores WHERE owner_id = $1', [req.user.id]);
    if (store.rows.length === 0) {
      return res.json({ store: null, averageRating: 0, raters: [] });
    }
    const storeRow = store.rows[0];

    const avgResult = await pool.query(
      'SELECT COALESCE(ROUND(AVG(rating)::numeric, 2), 0) AS avg FROM ratings WHERE store_id = $1',
      [storeRow.id]
    );

    const raters = await pool.query(
      `SELECT u.id, u.name, u.email, r.rating, r.created_at, r.updated_at
       FROM ratings r JOIN users u ON u.id = r.user_id
       WHERE r.store_id = $1
       ORDER BY r.updated_at DESC`,
      [storeRow.id]
    );

    res.json({
      store: storeRow,
      averageRating: Number(avgResult.rows[0].avg),
      raters: raters.rows,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error loading store owner dashboard' });
  }
});

module.exports = router;
