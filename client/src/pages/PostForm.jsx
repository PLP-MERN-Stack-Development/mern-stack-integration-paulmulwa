import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Loading from '../components/Loading';
import { getCategories } from '../services/categoryService';
import { createPost, updatePost, getPost } from '../services/postService';
import { uploadImage } from '../services/uploadService';
import './PostForm.css';

const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    status: 'published',
    featuredImage: ''
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCategories();
    if (isEditMode) {
      fetchPost();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (err) {
      toast.error('Failed to fetch categories');
    }
  };

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await getPost(id);
      const post = response.data;
      setFormData({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt || '',
        category: post.category._id,
        tags: post.tags?.join(', ') || '',
        status: post.status,
        featuredImage: post.featuredImage || ''
      });
    } catch (err) {
      toast.error('Failed to fetch post');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleContentChange = (value) => {
    setFormData(prev => ({
      ...prev,
      content: value
    }));
    if (errors.content) {
      setErrors(prev => ({ ...prev, content: '' }));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    // Validate file type
    if (!file.type.match(/image\/(jpg|jpeg|png|gif|webp)/)) {
      toast.error('Only image files are allowed');
      return;
    }

    try {
      setUploading(true);
      const response = await uploadImage(file);
      setFormData(prev => ({
        ...prev,
        featuredImage: response.data.path
      }));
      toast.success('Image uploaded successfully');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.content.trim() || formData.content === '<p><br></p>') {
      newErrors.content = 'Content is required';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }

    try {
      setLoading(true);

      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };

      if (isEditMode) {
        await updatePost(id, postData);
        toast.success('Post updated successfully');
      } else {
        await createPost(postData);
        toast.success('Post created successfully');
      }

      navigate('/');
    } catch (err) {
      const errorMessage = err.response?.data?.details?.[0] || err.response?.data?.error || 'Failed to save post';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) return <Loading />;

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['link', 'image'],
      [{ 'align': [] }],
      ['clean']
    ]
  };

  return (
    <div className="post-form-page">
      <div className="container">
        <div className="post-form-container">
          <h1>{isEditMode ? 'Edit Post' : 'Create New Post'}</h1>

          <form onSubmit={handleSubmit} className="post-form">
            <div className="form-group">
              <label className="form-label">Title *</label>
              <input
                type="text"
                name="title"
                className={`form-control ${errors.title ? 'error' : ''}`}
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter post title"
              />
              {errors.title && <span className="form-error">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Content *</label>
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={handleContentChange}
                modules={modules}
                className={errors.content ? 'error' : ''}
              />
              {errors.content && <span className="form-error">{errors.content}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Excerpt</label>
              <textarea
                name="excerpt"
                className="form-control"
                value={formData.excerpt}
                onChange={handleChange}
                rows="3"
                placeholder="Brief summary of the post (optional)"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select
                  name="category"
                  className={`form-control ${errors.category ? 'error' : ''}`}
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && <span className="form-error">{errors.category}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  className="form-control"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Tags</label>
              <input
                type="text"
                name="tags"
                className="form-control"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Enter tags separated by commas"
              />
              <small className="text-muted">Separate tags with commas (e.g., technology, javascript, web development)</small>
            </div>

            <div className="form-group">
              <label className="form-label">Featured Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="form-control"
                disabled={uploading}
              />
              {uploading && <span className="text-muted">Uploading...</span>}
              {formData.featuredImage && (
                <div className="image-preview">
                  <img src={formData.featuredImage} alt="Preview" />
                </div>
              )}
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary btn-lg"
                disabled={loading || uploading}
              >
                {loading ? 'Saving...' : isEditMode ? 'Update Post' : 'Create Post'}
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-lg"
                onClick={() => navigate(-1)}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
