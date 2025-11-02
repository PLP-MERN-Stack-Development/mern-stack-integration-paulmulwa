import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { getPosts } from '../services/postService';
import { getCategories } from '../services/categoryService';
import { FiChevronLeft, FiChevronRight, FiTrendingUp } from 'react-icons/fi';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchCategories();
    fetchFeaturedPosts();
  }, []);

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, selectedCategory]);

  // Auto-slide effect
  useEffect(() => {
    if (featuredPosts.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [featuredPosts.length]);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const fetchFeaturedPosts = async () => {
    try {
      const response = await getPosts({ limit: 5, sort: '-viewCount' });
      setFeaturedPosts(response.data.slice(0, 3));
    } catch (err) {
      console.error('Failed to fetch featured posts:', err);
    }
  };

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page: currentPage,
        limit: 9
      };

      if (searchTerm) params.search = searchTerm;
      if (selectedCategory) params.category = selectedCategory;

      const response = await getPosts(params);
      setPosts(response.data);
      setTotalPages(response.pages);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
    updateSearchParams();
    fetchPosts();
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
    updateSearchParams(categoryId);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    updateSearchParams(selectedCategory, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateSearchParams = (category = selectedCategory, page = currentPage) => {
    const params = {};
    if (searchTerm) params.search = searchTerm;
    if (category) params.category = category;
    if (page > 1) params.page = page;
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setCurrentPage(1);
    setSearchParams({});
    fetchPosts();
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredPosts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredPosts.length) % featuredPosts.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="home-page">
      <div className="container">
        {/* Featured Posts Slider */}
        {featuredPosts.length > 0 && (
          <div className="featured-slider">
            <div className="slider-header">
              <FiTrendingUp size={24} />
              <h2>Featured Posts</h2>
            </div>
            <div className="slider-container">
              <button className="slider-btn prev" onClick={prevSlide}>
                <FiChevronLeft size={28} />
              </button>
              
              <div className="slider-content">
                {featuredPosts.map((post, index) => (
                  <div
                    key={post._id}
                    className={`slide ${index === currentSlide ? 'active' : ''}`}
                    style={{ transform: `translateX(${(index - currentSlide) * 100}%)` }}
                  >
                    <div className="slide-image">
                      <img src={post.featuredImage} alt={post.title} />
                      <div className="slide-overlay"></div>
                    </div>
                    <div className="slide-info">
                      <span className="slide-category">{post.category?.name}</span>
                      <h3>{post.title}</h3>
                      <p>{post.excerpt}</p>
                      <Link to={`/posts/${post._id}`} className="btn btn-primary">
                        Read More
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <button className="slider-btn next" onClick={nextSlide}>
                <FiChevronRight size={28} />
              </button>

              <div className="slider-dots">
                {featuredPosts.map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="home-header">
          <h1>Latest Blog Posts</h1>
          <p className="text-muted">Explore our collection of articles and insights</p>
        </div>

        <div className="home-filters">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            onSubmit={handleSearch}
          />

          <div className="category-filter">
            <label className="form-label">Filter by Category:</label>
            <select
              className="form-control"
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {(searchTerm || selectedCategory) && (
            <button onClick={clearFilters} className="btn btn-secondary btn-sm">
              Clear Filters
            </button>
          )}
        </div>

        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : posts.length === 0 ? (
          <div className="no-posts">
            <p>No posts found. Try adjusting your filters.</p>
          </div>
        ) : (
          <>
            <div className="posts-grid">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
