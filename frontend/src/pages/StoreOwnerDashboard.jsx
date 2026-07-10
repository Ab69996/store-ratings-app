import React, { useEffect, useState } from 'react';
import api from '../api.js';

export default function StoreOwnerDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const res = await api.get('/store-owner/dashboard');
        setData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard');
      }
    }
    load();
  }, []);

  if (error) return <p className="error">{error}</p>;
  if (!data) return <p>Loading...</p>;

  if (!data.store) {
    return <p>No store is currently linked to your account. Please contact an administrator.</p>;
  }

  return (
    <div className="page">
      <h2>{data.store.name}</h2>
      <p>{data.store.address}</p>

      <div className="stats-cards">
        <div className="card">
          <h3>Average Rating</h3>
          <p className="stat">{data.averageRating} ★</p>
        </div>
        <div className="card">
          <h3>Total Ratings</h3>
          <p className="stat">{data.raters.length}</p>
        </div>
      </div>

      <h3>Users Who Rated Your Store</h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Rating</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {data.raters.map((r) => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.email}</td>
              <td>{r.rating} ★</td>
              <td>{new Date(r.updated_at).toLocaleString()}</td>
            </tr>
          ))}
          {data.raters.length === 0 && (
            <tr><td colSpan="4">No ratings submitted yet.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
