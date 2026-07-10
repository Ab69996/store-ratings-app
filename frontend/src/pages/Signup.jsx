import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', address: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (form.name.length < 20 || form.name.length > 60) {
      setError('Name must be between 20 and 60 characters');
      return;
    }
    if (form.address.length > 400) {
      setError('Address must be at most 400 characters');
      return;
    }
    const pwOk = form.password.length >= 8 && form.password.length <= 16
      && /[A-Z]/.test(form.password) && /[^A-Za-z0-9]/.test(form.password);
    if (!pwOk) {
      setError('Password must be 8-16 characters with at least one uppercase letter and one special character');
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.post('/auth/signup', form);
      login(data.token, data.user);
      navigate('/stores');
    } catch (err) {
      setError(err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-page">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Name (20-60 characters)</label>
        <input value={form.name} onChange={(e) => update('name', e.target.value)} required />

        <label>Email</label>
        <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required />

        <label>Address (max 400 characters)</label>
        <textarea value={form.address} onChange={(e) => update('address', e.target.value)} required />

        <label>Password (8-16 chars, 1 uppercase, 1 special char)</label>
        <input type="password" value={form.password} onChange={(e) => update('password', e.target.value)} required />

        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>{loading ? 'Creating account...' : 'Sign Up'}</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
