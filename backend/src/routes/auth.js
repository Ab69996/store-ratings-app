const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const pool = require('../db/pool');
const { verifyToken } = require('../middleware/auth');
const {
  nameValidator,
  addressValidator,
  emailValidator,
  passwordValidator,
} = require('../utils/validators');

const router = express.Router();

function signToken(user) {
  return jwt.sign(
    { id: user.id, role: user.role, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );
}

// POST /api/auth/signup  - Normal user self-registration
router.post(
  '/signup',
  [nameValidator, emailValidator, addressValidator, passwordValidator],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, address, password } = req.body;

    try {
      const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
      if (existing.rows.length > 0) {
        return res.status(409).json({ message: 'An account with this email already exists' });
      }

      const hashed = await bcrypt.hash(password, 10);
      const result = await pool.query(
        `INSERT INTO users (name, email, password, address, role)
         VALUES ($1, $2, $3, $4, 'user')
         RETURNING id, name, email, address, role`,
        [name, email, hashed, address]
      );

      const user = result.rows[0];
      const token = signToken(user);
      res.status(201).json({ token, user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error during signup' });
    }
  }
);

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = signToken(user);
    delete user.password;
    res.json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// PUT /api/auth/password - update own password (any logged-in role)
router.put('/password', verifyToken, [passwordValidator], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { oldPassword, password } = req.body;
  if (!oldPassword) {
    return res.status(400).json({ message: 'Current password is required' });
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [req.user.id]);
    const user = result.rows[0];
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }

    const hashed = await bcrypt.hash(password, 10);
    await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashed, req.user.id]);
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error updating password' });
  }
});

module.exports = router;
