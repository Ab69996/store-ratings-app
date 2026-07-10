import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api.js';

export default function AdminUserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const { data } = await api.get(`/admin/users/${id}`);
        setUser(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load user');
      }
    }
    load();
  }, [id]);

  if (error) return <p className="error">{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="page">
      <h2>User Details</h2>
      <table className="detail-table">
        <tbody>
          <tr><th>Name</th><td>{user.name}</td></tr>
          <tr><th>Email</th><td>{user.email}</td></tr>
          <tr><th>Address</th><td>{user.address}</td></tr>
          <tr><th>Role</th><td>{user.role}</td></tr>
          {user.role === 'store_owner' && (
            <tr><th>Rating</th><td>{user.rating ?? 'No ratings yet'}</td></tr>
          )}
        </tbody>
      </table>
      <p><Link to="/admin/users">Back to users list</Link></p>
    </div>
  );
}
