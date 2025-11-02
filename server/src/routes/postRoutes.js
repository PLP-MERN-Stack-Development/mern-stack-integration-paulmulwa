import express from 'express';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment,
  deleteComment
} from '../controllers/postController.js';
import { protect } from '../middleware/auth.js';
import { postValidation, commentValidation } from '../middleware/validation.js';

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(protect, postValidation, createPost);

router.route('/:id')
  .get(getPost)
  .put(protect, postValidation, updatePost)
  .delete(protect, deletePost);

router.route('/:id/comments')
  .post(protect, commentValidation, addComment);

router.route('/:id/comments/:commentId')
  .delete(protect, deleteComment);

export default router;
