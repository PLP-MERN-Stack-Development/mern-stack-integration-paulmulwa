import express from 'express';
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController.js';
import { protect, admin } from '../middleware/auth.js';
import { categoryValidation } from '../middleware/validation.js';

const router = express.Router();

router.route('/')
  .get(getCategories)
  .post(protect, admin, categoryValidation, createCategory);

router.route('/:id')
  .get(getCategory)
  .put(protect, admin, categoryValidation, updateCategory)
  .delete(protect, admin, deleteCategory);

export default router;
