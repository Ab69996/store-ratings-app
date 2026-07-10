import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../api.js';

export default function AdminStores() {
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({ name: '', email: '', address: '' });
  const [sortBy, setSortBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [error, setError] = useState('');

  const loadStores = useCallback(async () => {
    setError('');
    try {
      const { data } = await api.get('/admin/stores', { params: { ...filters, sortBy, order } });
      setStores(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load stores');
    }
  }, [filters, sortBy, order]);

  useEffect(() => { loadStores(); }, [loadStores]);

  function toggleSort(field) {
    if (sortBy === field) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setOrder('asc');
    }
  }

  function updateFilter(field, value) {
    setFilters((f) => ({ ...f, [field]: value }));
  }

  return (
    <div className="page">
      <div className="page-header">
        <h2>Stores</h2>
        <Link to="/admin/add-store"><button>+ Add Store</button></Link>
      </div>

      <div className="filters">
        <input placeholder="Filter by name" value={filters.name} onChange={(e) => updateFilter('name', e.target.value)} />
        <input placeholder="Filter by email" value={filters.email} onChange={(e) => updateFilter('email', e.target.value)} />
        <input placeholder="Filter by address" value={filters.address} onChange={(e) => updateFilter('address', e.target.value)} />
      </div>

      {error && <p className="error">{error}</p>}

      <table className="data-table">
        <thead>
          <tr>
            <th onClick={() => toggleSort('name')}>Name</th>
            <th onClick={() => toggleSort('email')}>Email</th>
            <th onClick={() => toggleSort('address')}>Address</th>
            <th onClick={() => toggleSort('rating')}>Rating</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.email || '-'}</td>
              <td>{s.address}</td>
              <td>{s.rating} ★ ({s.rating_count})</td>
            </tr>
          ))}
          {stores.length === 0 && (
            <tr><td colSpan="4">No stores found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
