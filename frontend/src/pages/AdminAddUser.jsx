import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api.js';

export default function AdminAddUser() {
  const [form, setForm] = useState({ name: '', email: '', address: '', password: '', role: 'user' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setMessage('');

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
      await api.post('/admin/users', form);
      setMessage('User created successfully.');
      setTimeout(() => navigate('/admin/users'), 800);
    } catch (err) {
      setError(err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-page">
      <h2>Add New User</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Name (20-60 characters)</label>
        <input value={form.name} onChange={(e) => update('name', e.target.value)} required />

        <label>Email</label>
        <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required />

        <label>Address (max 400 characters)</label>
        <textarea value={form.address} onChange={(e) => update('address', e.target.value)} required />

        <label>Password (8-16 chars, 1 uppercase, 1 special char)</label>
        <input type="password" value={form.password} onChange={(e) => update('password', e.target.value)} required />

        <label>Role</label>
        <select value={form.role} onChange={(e) => update('role', e.target.value)}>
          <option value="user">Normal User</option>
          <option value="admin">System Administrator</option>
          <option value="store_owner">Store Owner</option>
        </select>

        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create User'}</button>
      </form>
      <p><Link to="/admin/users">Back to users list</Link></p>
    </div>
  );
}
