import Post from '../models/Post.js';
import { ApiError, asyncHandler } from '../utils/helpers.js';

// @desc    Get all posts with pagination, search, and filtering
// @route   GET /api/posts
// @access  Public
export const getPosts = asyncHandler(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Build query
  const query = {};

  // Search by title or content
  if (req.query.search) {
    query.$or = [
      { title: { $regex: req.query.search, $options: 'i' } },
      { content: { $regex: req.query.search, $options: 'i' } }
    ];
  }

  // Filter by category
  if (req.query.category) {
    query.category = req.query.category;
  }

  // Filter by author
  if (req.query.author) {
    query.author = req.query.author;
  }

  // Filter by status
  if (req.query.status) {
    query.status = req.query.status;
  }

  // Filter by tags
  if (req.query.tag) {
    query.tags = req.query.tag;
  }

  const total = await Post.countDocuments(query);
  const posts = await Post.find(query)
    .populate('author', 'name email')
    .populate('category', 'name slug')
    .populate('comments.author', 'name')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.json({
    success: true,
    count: posts.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    data: posts
  });
});

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
export const getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id)
    .populate('author', 'name email avatar')
    .populate('category', 'name slug')
    .populate('comments.author', 'name avatar');

  if (!post) {
    throw new ApiError('Post not found', 404);
  }

  // Increment view count
  post.viewCount += 1;
  await post.save();

  res.json({
    success: true,
    data: post
  });
});

// @desc    Create new post
// @route   POST /api/posts
// @access  Private
export const createPost = asyncHandler(async (req, res, next) => {
  // Add author to req.body
  req.body.author = req.user._id;

  const post = await Post.create(req.body);

  // Populate before sending response
  await post.populate('author', 'name email');
  await post.populate('category', 'name slug');

  res.status(201).json({
    success: true,
    data: post
  });
});

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private
export const updatePost = asyncHandler(async (req, res, next) => {
  let post = await Post.findById(req.params.id);

  if (!post) {
    throw new ApiError('Post not found', 404);
  }

  // Check if user is post owner or admin
  if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new ApiError('Not authorized to update this post', 403);
  }

  post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })
    .populate('author', 'name email')
    .populate('category', 'name slug');

  res.json({
    success: true,
    data: post
  });
});

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private
export const deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    throw new ApiError('Post not found', 404);
  }

  // Check if user is post owner or admin
  if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new ApiError('Not authorized to delete this post', 403);
  }

  await post.deleteOne();

  res.json({
    success: true,
    data: {}
  });
});

// @desc    Add comment to post
// @route   POST /api/posts/:id/comments
// @access  Private
export const addComment = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    throw new ApiError('Post not found', 404);
  }

  const comment = {
    content: req.body.content,
    author: req.user._id
  };

  post.comments.push(comment);
  await post.save();

  // Populate the post before sending response
  await post.populate('comments.author', 'name avatar');

  res.status(201).json({
    success: true,
    data: post.comments
  });
});

// @desc    Delete comment from post
// @route   DELETE /api/posts/:id/comments/:commentId
// @access  Private
export const deleteComment = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    throw new ApiError('Post not found', 404);
  }

  const comment = post.comments.id(req.params.commentId);

  if (!comment) {
    throw new ApiError('Comment not found', 404);
  }

  // Check if user is comment author or admin
  if (comment.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new ApiError('Not authorized to delete this comment', 403);
  }

  comment.deleteOne();
  await post.save();

  res.json({
    success: true,
    data: {}
  });
});
