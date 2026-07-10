import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api.js';

export default function AdminAddStore() {
  const [form, setForm] = useState({ name: '', email: '', address: '', ownerEmail: '' });
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
      setError('Store name must be between 20 and 60 characters');
      return;
    }
    if (form.address.length > 400) {
      setError('Address must be at most 400 characters');
      return;
    }

    setLoading(true);
    try {
      await api.post('/admin/stores', form);
      setMessage('Store created successfully.');
      setTimeout(() => navigate('/admin/stores'), 800);
    } catch (err) {
      setError(err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || 'Failed to create store');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-page">
      <h2>Add New Store</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Store Name (20-60 characters)</label>
        <input value={form.name} onChange={(e) => update('name', e.target.value)} required />

        <label>Store Email (optional)</label>
        <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} />

        <label>Address (max 400 characters)</label>
        <textarea value={form.address} onChange={(e) => update('address', e.target.value)} required />

        <label>Owner Email (must belong to an existing Store Owner user, optional)</label>
        <input type="email" value={form.ownerEmail} onChange={(e) => update('ownerEmail', e.target.value)} />

        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create Store'}</button>
      </form>
      <p><Link to="/admin/stores">Back to stores list</Link></p>
    </div>
  );
}
