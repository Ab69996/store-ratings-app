import React, { useState } from 'react';
import api from '../api.js';

export default function UpdatePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setMessage('');

    const pwOk = password.length >= 8 && password.length <= 16
      && /[A-Z]/.test(password) && /[^A-Za-z0-9]/.test(password);
    if (!pwOk) {
      setError('New password must be 8-16 characters with at least one uppercase letter and one special character');
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.put('/auth/password', { oldPassword, password });
      setMessage(data.message);
      setOldPassword('');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.errors?.[0]?.msg || err.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-page">
      <h2>Update Password</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>Current Password</label>
        <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} required />

        <label>New Password (8-16 chars, 1 uppercase, 1 special char)</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
        <button type="submit" disabled={loading}>{loading ? 'Updating...' : 'Update Password'}</button>
      </form>
    </div>
  );
}
