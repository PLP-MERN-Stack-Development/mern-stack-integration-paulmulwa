import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { FiUser, FiCalendar, FiTag, FiEye, FiEdit, FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { useAuth } from '../hooks/useAuth';
import { getPost, deletePost, addComment, deleteComment } from '../services/postService';
import './PostDetail.css';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [commentContent, setCommentContent] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getPost(id);
      setPost(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch post');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await deletePost(id);
      toast.success('Post deleted successfully');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to delete post');
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentContent.trim()) return;

    try {
      setSubmittingComment(true);
      await addComment(id, commentContent);
      setCommentContent('');
      await fetchPost(); // Refresh post to get new comment
      toast.success('Comment added successfully');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add comment');
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    try {
      await deleteComment(id, commentId);
      await fetchPost();
      toast.success('Comment deleted successfully');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to delete comment');
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!post) return <ErrorMessage message="Post not found" />;

  const canEdit = user && (user._id === post.author?._id || user.role === 'admin');

  return (
    <div className="post-detail-page">
      <div className="container">
        <article className="post-detail">
          {post.featuredImage && (
            <div className="post-detail-image">
              <img src={post.featuredImage} alt={post.title} />
            </div>
          )}

          <div className="post-detail-header">
            <h1>{post.title}</h1>

            <div className="post-meta">
              <div className="meta-item">
                <FiUser />
                <span>{post.author?.name || 'Anonymous'}</span>
              </div>
              <div className="meta-item">
                <FiCalendar />
                <span>{format(new Date(post.createdAt), 'MMMM d, yyyy')}</span>
              </div>
              {post.category && (
                <div className="meta-item">
                  <FiTag />
                  <span>{post.category.name}</span>
                </div>
              )}
              <div className="meta-item">
                <FiEye />
                <span>{post.viewCount} views</span>
              </div>
            </div>

            {post.tags && post.tags.length > 0 && (
              <div className="post-tags">
                {post.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            )}

            {canEdit && (
              <div className="post-actions">
                <button
                  onClick={() => navigate(`/posts/edit/${post._id}`)}
                  className="btn btn-primary btn-sm"
                >
                  <FiEdit /> Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="btn btn-danger btn-sm"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            )}
          </div>

          <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        <section className="comments-section">
          <h2>Comments ({post.comments?.length || 0})</h2>

          {isAuthenticated() ? (
            <form onSubmit={handleAddComment} className="comment-form">
              <textarea
                className="form-control"
                placeholder="Add a comment..."
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                rows="4"
                required
              />
              <button
                type="submit"
                className="btn btn-primary"
                disabled={submittingComment}
              >
                {submittingComment ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          ) : (
            <p className="text-muted">Please login to add a comment.</p>
          )}

          <div className="comments-list">
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <div key={comment._id} className="comment">
                  <div className="comment-header">
                    <div className="comment-author">
                      <strong>{comment.author?.name || 'Anonymous'}</strong>
                      <span className="text-muted text-sm">
                        {format(new Date(comment.createdAt), 'MMM d, yyyy')}
                      </span>
                    </div>
                    {user && (user._id === comment.author?._id || user.role === 'admin') && (
                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="btn-delete-comment"
                      >
                        <FiTrash2 />
                      </button>
                    )}
                  </div>
                  <p className="comment-content">{comment.content}</p>
                </div>
              ))
            ) : (
              <p className="text-muted">No comments yet. Be the first to comment!</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PostDetail;
