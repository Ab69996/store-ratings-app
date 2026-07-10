import React, { useEffect, useState } from 'react';
import api from '../api.js';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const { data } = await api.get('/admin/dashboard');
        setStats(data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard');
      }
    }
    load();
  }, []);

  if (error) return <p className="error">{error}</p>;
  if (!stats) return <p>Loading...</p>;

  return (
    <div className="page">
      <h2>Admin Dashboard</h2>
      <div className="stats-cards">
        <div className="card">
          <h3>Total Users</h3>
          <p className="stat">{stats.totalUsers}</p>
        </div>
        <div className="card">
          <h3>Total Stores</h3>
          <p className="stat">{stats.totalStores}</p>
        </div>
        <div className="card">
          <h3>Total Ratings</h3>
          <p className="stat">{stats.totalRatings}</p>
        </div>
      </div>
    </div>
  );
}
