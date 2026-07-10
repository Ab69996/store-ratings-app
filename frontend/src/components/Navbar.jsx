import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Store Ratings</Link>
      </div>
      <div className="navbar-links">
        {!user && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
        {user && user.role === 'admin' && (
          <>
            <Link to="/admin/dashboard">Dashboard</Link>
            <Link to="/admin/users">Users</Link>
            <Link to="/admin/stores">Stores</Link>
          </>
        )}
        {user && user.role === 'user' && (
          <>
            <Link to="/stores">Stores</Link>
            <Link to="/update-password">Update Password</Link>
          </>
        )}
        {user && user.role === 'store_owner' && (
          <>
            <Link to="/store-owner/dashboard">My Store</Link>
            <Link to="/update-password">Update Password</Link>
          </>
        )}
        {user && (
          <>
            <span className="navbar-user">{user.name} ({user.role})</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}
