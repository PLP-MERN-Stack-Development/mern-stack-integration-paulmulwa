import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Comment content is required'],
      trim: true,
      maxlength: [500, 'Comment cannot exceed 500 characters']
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Post title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters']
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      sparse: true
    },
    content: {
      type: String,
      required: [true, 'Post content is required']
    },
    excerpt: {
      type: String,
      maxlength: [300, 'Excerpt cannot exceed 300 characters']
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Post category is required']
    },
    featuredImage: {
      type: String,
      default: ''
    },
    tags: [{
      type: String,
      trim: true
    }],
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'published'
    },
    comments: [commentSchema],
    viewCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Generate slug from title before saving
postSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
  }
  next();
});

// Create excerpt from content if not provided
postSchema.pre('save', function (next) {
  if (this.isModified('content') && !this.excerpt) {
    this.excerpt = this.content.substring(0, 150) + '...';
  }
  next();
});

const Post = mongoose.model('Post', postSchema);

export default Post;
