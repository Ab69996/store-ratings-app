const express = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const pool = require('../db/pool');
const { verifyToken, requireRole } = require('../middleware/auth');
const {
  nameValidator,
  addressValidator,
  emailValidator,
  passwordValidator,
  roleValidator,
} = require('../utils/validators');

const router = express.Router();

// All admin routes require a valid token AND the admin role
router.use(verifyToken, requireRole('admin'));

const SORTABLE_USER_FIELDS = ['name', 'email', 'address', 'role', 'created_at'];
const SORTABLE_STORE_FIELDS = ['name', 'email', 'address', 'rating', 'created_at'];

function safeSort(field, allowed, fallback) {
  return allowed.includes(field) ? field : fallback;
}
function safeOrder(order) {
  return String(order).toLowerCase() === 'desc' ? 'DESC' : 'ASC';
}

// GET /api/admin/dashboard
router.get('/dashboard', async (req, res) => {
  try {
    const [users, stores, ratings] = await Promise.all([
      pool.query('SELECT COUNT(*)::int AS count FROM users'),
      pool.query('SELECT COUNT(*)::int AS count FROM stores'),
      pool.query('SELECT COUNT(*)::int AS count FROM ratings'),
    ]);
    res.json({
      totalUsers: users.rows[0].count,
      totalStores: stores.rows[0].count,
      totalRatings: ratings.rows[0].count,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error loading dashboard' });
  }
});

// POST /api/admin/users - add a new user of any role (admin, user, store_owner)
router.post(
  '/users',
  [nameValidator, emailValidator, addressValidator, passwordValidator, roleValidator],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, address, password, role } = req.body;

    try {
      const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
      if (existing.rows.length > 0) {
        return res.status(409).json({ message: 'An account with this email already exists' });
      }
      const hashed = await bcrypt.hash(password, 10);
      const result = await pool.query(
        `INSERT INTO users (name, email, password, address, role)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id, name, email, address, role, created_at`,
        [name, email, hashed, address, role]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error creating user' });
    }
  }
);

// POST /api/admin/stores - add a new store, optionally linked to a store_owner by email
router.post(
  '/stores',
  [nameValidator, addressValidator],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, address, ownerEmail } = req.body;

    try {
      let ownerId = null;
      if (ownerEmail) {
        const owner = await pool.query(
          "SELECT id, role FROM users WHERE email = $1",
          [ownerEmail]
        );
        if (owner.rows.length === 0) {
          return res.status(404).json({ message: 'No user found with the given owner email' });
        }
        if (owner.rows[0].role !== 'store_owner') {
          return res.status(400).json({ message: 'The specified owner must have the store_owner role' });
        }
        ownerId = owner.rows[0].id;
      }

      const result = await pool.query(
        `INSERT INTO stores (name, email, address, owner_id)
         VALUES ($1, $2, $3, $4)
         RETURNING id, name, email, address, owner_id, created_at`,
        [name, email || null, address, ownerId]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error creating store' });
    }
  }
);

// GET /api/admin/users?name=&email=&address=&role=&sortBy=&order=
router.get('/users', async (req, res) => {
  const { name, email, address, role, sortBy, order } = req.query;
  const sortField = safeSort(sortBy, SORTABLE_USER_FIELDS, 'name');
  const sortOrder = safeOrder(order);

  const conditions = [];
  const params = [];

  if (name) { params.push(`%${name}%`); conditions.push(`u.name ILIKE $${params.length}`); }
  if (email) { params.push(`%${email}%`); conditions.push(`u.email ILIKE $${params.length}`); }
  if (address) { params.push(`%${address}%`); conditions.push(`u.address ILIKE $${params.length}`); }
  if (role) { params.push(role); conditions.push(`u.role = $${params.length}`); }

  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  try {
    const query = `
      SELECT u.id, u.name, u.email, u.address, u.role, u.created_at,
        CASE WHEN u.role = 'store_owner' THEN (
          SELECT ROUND(AVG(r.rating)::numeric, 2) FROM ratings r
          JOIN stores s ON s.id = r.store_id WHERE s.owner_id = u.id
        ) ELSE NULL END AS rating
      FROM users u
      ${where}
      ORDER BY ${sortField === 'rating' ? 'rating' : 'u.' + sortField} ${sortOrder} NULLS LAST
    `;
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error listing users' });
  }
});

// GET /api/admin/users/:id - full details, includes rating if store owner
router.get('/users/:id', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT u.id, u.name, u.email, u.address, u.role, u.created_at,
        CASE WHEN u.role = 'store_owner' THEN (
          SELECT ROUND(AVG(r.rating)::numeric, 2) FROM ratings r
          JOIN stores s ON s.id = r.store_id WHERE s.owner_id = u.id
        ) ELSE NULL END AS rating
      FROM users u WHERE u.id = $1`,
      [req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error loading user details' });
  }
});

// GET /api/admin/stores?name=&email=&address=&sortBy=&order=
router.get('/stores', async (req, res) => {
  const { name, email, address, sortBy, order } = req.query;
  const sortField = safeSort(sortBy, SORTABLE_STORE_FIELDS, 'name');
  const sortOrder = safeOrder(order);

  const conditions = [];
  const params = [];
  if (name) { params.push(`%${name}%`); conditions.push(`s.name ILIKE $${params.length}`); }
  if (email) { params.push(`%${email}%`); conditions.push(`s.email ILIKE $${params.length}`); }
  if (address) { params.push(`%${address}%`); conditions.push(`s.address ILIKE $${params.length}`); }
  const where = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  try {
    const query = `
      SELECT s.id, s.name, s.email, s.address, s.owner_id, s.created_at,
        COALESCE(ROUND(AVG(r.rating)::numeric, 2), 0) AS rating,
        COUNT(r.id)::int AS rating_count
      FROM stores s
      LEFT JOIN ratings r ON r.store_id = s.id
      ${where}
      GROUP BY s.id
      ORDER BY ${sortField === 'rating' ? 'rating' : 's.' + sortField} ${sortOrder}
    `;
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error listing stores' });
  }
});

module.exports = router;
