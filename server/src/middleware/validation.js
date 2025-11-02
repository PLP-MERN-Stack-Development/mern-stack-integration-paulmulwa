import { body, validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Validation Error',
      details: errors.array().map(err => err.msg)
    });
  }
  next();
};

export const postValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title cannot exceed 200 characters'),
  body('content')
    .trim()
    .notEmpty().withMessage('Content is required'),
  body('category')
    .notEmpty().withMessage('Category is required')
    .isMongoId().withMessage('Invalid category ID'),
  body('excerpt')
    .optional()
    .isLength({ max: 300 }).withMessage('Excerpt cannot exceed 300 characters'),
  body('tags')
    .optional()
    .isArray().withMessage('Tags must be an array'),
  body('status')
    .optional()
    .isIn(['draft', 'published']).withMessage('Status must be either draft or published'),
  validate
];

export const categoryValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Category name is required')
    .isLength({ max: 50 }).withMessage('Category name cannot exceed 50 characters'),
  body('description')
    .optional()
    .isLength({ max: 200 }).withMessage('Description cannot exceed 200 characters'),
  validate
];

export const registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 50 }).withMessage('Name cannot exceed 50 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  validate
];

export const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),
  body('password')
    .notEmpty().withMessage('Password is required'),
  validate
];

export const commentValidation = [
  body('content')
    .trim()
    .notEmpty().withMessage('Comment content is required')
    .isLength({ max: 500 }).withMessage('Comment cannot exceed 500 characters'),
  validate
];
