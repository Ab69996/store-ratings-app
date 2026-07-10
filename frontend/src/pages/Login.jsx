import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', { email, password });
      login(data.token, data.user);
      if (data.user.role === 'admin') navigate('/admin/dashboard');
      else if (data.user.role === 'store_owner') navigate('/store-owner/dashboard');
      else navigate('/stores');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-page">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
}
