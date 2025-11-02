import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FiHome, FiPlusCircle, FiUser, FiLogOut, FiLogIn } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            MERN Blog
          </Link>

          <div className="navbar-menu">
            <Link to="/" className="nav-link">
              <FiHome /> Home
            </Link>

            {isAuthenticated() ? (
              <>
                <Link to="/posts/create" className="nav-link">
                  <FiPlusCircle /> Create Post
                </Link>
                <div className="nav-user">
                  <FiUser />
                  <span>{user?.name}</span>
                </div>
                <button onClick={handleLogout} className="nav-link nav-button">
                  <FiLogOut /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  <FiLogIn /> Login
                </Link>
                <Link to="/register" className="btn btn-primary btn-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
