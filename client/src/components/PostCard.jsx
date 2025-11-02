import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { FiUser, FiCalendar, FiTag, FiEye } from 'react-icons/fi';
import './PostCard.css';

const PostCard = ({ post }) => {
  return (
    <div className="post-card">
      {post.featuredImage && (
        <div className="post-card-image">
          <img src={post.featuredImage} alt={post.title} />
        </div>
      )}
      <div className="post-card-content">
        <Link to={`/posts/${post._id}`} className="post-card-title">
          {post.title}
        </Link>
        <p className="post-card-excerpt">{post.excerpt}</p>
        
        <div className="post-card-meta">
          <div className="meta-item">
            <FiUser size={14} />
            <span>{post.author?.name || 'Anonymous'}</span>
          </div>
          <div className="meta-item">
            <FiCalendar size={14} />
            <span>{format(new Date(post.createdAt), 'MMM d, yyyy')}</span>
          </div>
          {post.category && (
            <div className="meta-item">
              <FiTag size={14} />
              <span>{post.category.name}</span>
            </div>
          )}
          <div className="meta-item">
            <FiEye size={14} />
            <span>{post.viewCount || 0} views</span>
          </div>
        </div>

        {post.tags && post.tags.length > 0 && (
          <div className="post-card-tags">
            {post.tags.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
