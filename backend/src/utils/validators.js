const { body } = require('express-validator');

// Name: Min 20 characters, Max 60 characters.
const nameValidator = body('name')
  .trim()
  .isLength({ min: 20, max: 60 })
  .withMessage('Name must be between 20 and 60 characters');

// Address: Max 400 characters.
const addressValidator = body('address')
  .trim()
  .isLength({ min: 1, max: 400 })
  .withMessage('Address must be at most 400 characters');

// Email: standard email validation.
const emailValidator = body('email')
  .trim()
  .isEmail()
  .withMessage('A valid email is required')
  .normalizeEmail();

// Password: 8-16 characters, at least one uppercase letter and one special character.
const passwordValidator = body('password')
  .isLength({ min: 8, max: 16 })
  .withMessage('Password must be 8-16 characters long')
  .matches(/[A-Z]/)
  .withMessage('Password must contain at least one uppercase letter')
  .matches(/[!@#$%^&*(),.?":{}|<>_\-+=~`[\]\\/;']/)
  .withMessage('Password must contain at least one special character');

const roleValidator = body('role')
  .isIn(['admin', 'user', 'store_owner'])
  .withMessage('Role must be one of admin, user, store_owner');

const ratingValidator = body('rating')
  .isInt({ min: 1, max: 5 })
  .withMessage('Rating must be an integer between 1 and 5');

module.exports = {
  nameValidator,
  addressValidator,
  emailValidator,
  passwordValidator,
  roleValidator,
  ratingValidator,
};
