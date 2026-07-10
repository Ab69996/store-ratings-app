import React from 'react';

export default function StarRating({ value = 0, onChange, readOnly = false }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <span style={{ display: 'inline-flex', gap: 2 }}>
      {stars.map((s) => (
        <span
          key={s}
          onClick={() => !readOnly && onChange && onChange(s)}
          style={{
            cursor: readOnly ? 'default' : 'pointer',
            color: s <= value ? '#f5a623' : '#ccc',
            fontSize: '1.2rem',
          }}
        >
          ★
        </span>
      ))}
    </span>
  );
}
