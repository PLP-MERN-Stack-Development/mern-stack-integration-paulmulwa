import api from './api';

// Get all posts with query params
export const getPosts = async (params = {}) => {
  const queryString = new URLSearchParams(params).toString();
  const response = await api.get(`/posts?${queryString}`);
  return response.data;
};

// Get single post
export const getPost = async (id) => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

// Create new post
export const createPost = async (postData) => {
  const response = await api.post('/posts', postData);
  return response.data;
};

// Update post
export const updatePost = async (id, postData) => {
  const response = await api.put(`/posts/${id}`, postData);
  return response.data;
};

// Delete post
export const deletePost = async (id) => {
  const response = await api.delete(`/posts/${id}`);
  return response.data;
};

// Add comment to post
export const addComment = async (postId, content) => {
  const response = await api.post(`/posts/${postId}/comments`, { content });
  return response.data;
};

// Delete comment
export const deleteComment = async (postId, commentId) => {
  const response = await api.delete(`/posts/${postId}/comments/${commentId}`);
  return response.data;
};
