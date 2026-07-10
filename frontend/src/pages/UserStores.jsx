import React, { useEffect, useState, useCallback } from 'react';
import api from '../api.js';
import StarRating from '../components/StarRating.jsx';

export default function UserStores() {
  const [stores, setStores] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [error, setError] = useState('');
  const [savingId, setSavingId] = useState(null);

  const loadStores = useCallback(async () => {
    setError('');
    try {
      const { data } = await api.get('/stores', { params: { name, address, sortBy, order } });
      setStores(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load stores');
    }
  }, [name, address, sortBy, order]);

  useEffect(() => { loadStores(); }, [loadStores]);

  function toggleSort(field) {
    if (sortBy === field) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setOrder('asc');
    }
  }

  async function submitRating(storeId, rating) {
    setSavingId(storeId);
    try {
      await api.post(`/stores/${storeId}/rating`, { rating });
      await loadStores();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit rating');
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div className="page">
      <h2>Stores</h2>
      <div className="filters">
        <input placeholder="Search by name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Search by address" value={address} onChange={(e) => setAddress(e.target.value)} />
      </div>
      {error && <p className="error">{error}</p>}
      <table className="data-table">
        <thead>
          <tr>
            <th onClick={() => toggleSort('name')}>Store Name</th>
            <th onClick={() => toggleSort('address')}>Address</th>
            <th onClick={() => toggleSort('rating')}>Overall Rating</th>
            <th>Your Rating</th>
            <th>Submit / Modify Rating</th>
          </tr>
        </thead>
        <tbody>
          {stores.map((s) => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.address}</td>
              <td>{s.overall_rating} ★</td>
              <td>{s.my_rating ? `${s.my_rating} ★` : 'Not rated yet'}</td>
              <td>
                <StarRating
                  value={s.my_rating || 0}
                  onChange={(val) => submitRating(s.id, val)}
                  readOnly={savingId === s.id}
                />
              </td>
            </tr>
          ))}
          {stores.length === 0 && (
            <tr><td colSpan="5">No stores found.</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
