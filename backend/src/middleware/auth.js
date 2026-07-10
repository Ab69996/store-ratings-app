const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
  const header = req.headers['authorization'];
  const token = header && header.startsWith('Bearer ') ? header.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ message: 'Access token is missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = decoded; // { id, role, email }
    next();
  });
}

function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'You do not have permission to access this resource' });
    }
    next();
  };
}

module.exports = { verifyToken, requireRole };
