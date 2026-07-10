import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../api.js';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({ name: '', email: '', address: '', role: '' });
  const [sortBy, setSortBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [error, setError] = useState('');

  const loadUsers = useCallback(async () => {
    setError('');
    try {
      const { data } = await api.get('/admin/users', { params: { ...filters, sortBy, order } });
      setUsers(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load users');
    }
  }, [filters, sortBy, order]);

  useEffect(() => { loadUsers(); }, [loadUsers]);

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
        <h2>Users</h2>
        <Link to="/admin/add-user"><button>+ Add User</button></Link>
      </div>

      <div className="filters">
        <input placeholder="Filter by name" value={filters.name} onChange={(e) => updateFilter('name', e.target.value)} />
        <input placeholder="Filter by email" value={filters.email} onChange={(e) => updateFilter('email', e.target.value)} />
        <input placeholder="Filter by address" value={filters.address} onChange={(e) => updateFilter('address', e.target.value)} />
        <select value={filters.role} onChange={(e) => updateFilter('role', e.target.value)}>
          <option value="">All roles</option>
          <option value="admin">Admin</option>
          <option value="user">Normal User</option>
          <option value="store_owner">Store Owner</option>
        </select>
      </div>

      {error && <p className="error">{error}</p>}

      <table className="data-table">
        <thead>
          <tr>
            <th onClick={() => toggleSort('name')}>Name</th>
            <th onClick={() => toggleSort('email')}>Email</th>
            <th onClick={() => toggleSort('address')}>Address</th>
            <th onClick={() => toggleSort('role')}>Role</th>
            <th>Rating (Store Owners)</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.address}</td>
              <td>{u.role}</td>
              <td>{u.rating ?? '-'}</td>
              <td><Link to={`/admin/users/${u.id}`}>View</Link></td>
            </tr>
          ))}
          {users.length === 0 && (
            <tr><td colSpan="6">No users found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
