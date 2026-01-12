import React, { useState, useEffect } from 'react';

function App() {
  const [status, setStatus] = useState({ loading: true, connected: false, data: null });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setStatus({ loading: false, connected: true, data }))
      .catch(() => setStatus({ loading: false, connected: false, data: null }));

    fetch('/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(() => setUsers([]));
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      background: '#0a0a0a',
      color: '#fafafa',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '2rem',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      marginBottom: '2rem',
      paddingBottom: '1rem',
      borderBottom: '1px solid #262626',
    },
    title: {
      fontSize: '1.25rem',
      fontWeight: 500,
      margin: 0,
    },
    statusDot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: status.loading ? '#eab308' : status.connected ? '#22c55e' : '#ef4444',
      boxShadow: status.connected ? '0 0 8px #22c55e' : 'none',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1rem',
    },
    card: {
      background: '#141414',
      borderRadius: '8px',
      padding: '1.25rem',
    },
    cardTitle: {
      fontSize: '0.75rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      color: '#737373',
      marginBottom: '0.5rem',
    },
    cardValue: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    table: {
      width: '100%',
      marginTop: '2rem',
      borderCollapse: 'collapse',
    },
    th: {
      textAlign: 'left',
      padding: '0.75rem',
      borderBottom: '1px solid #262626',
      color: '#737373',
      fontSize: '0.75rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    },
    td: {
      padding: '0.75rem',
      borderBottom: '1px solid #1a1a1a',
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.statusDot} />
        <h1 style={styles.title}>Dashboard</h1>
        <span style={{ fontSize: '0.75rem', color: '#525252', marginLeft: 'auto' }}>
          React → Nginx → Node.js → PostgreSQL
        </span>
      </header>

      <div style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.cardTitle}>API Status</div>
          <div style={styles.cardValue}>
            {status.loading ? 'Connecting...' : status.connected ? 'Online' : 'Offline'}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#525252', marginTop: '0.5rem' }}>
            /api/health endpoint
          </div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Database</div>
          <div style={styles.cardValue}>
            {status.connected ? 'PostgreSQL' : '—'}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#525252', marginTop: '0.5rem' }}>
            {status.connected ? 'Port 5432' : 'Not connected'}
          </div>
        </div>
        <div style={styles.card}>
          <div style={styles.cardTitle}>Users</div>
          <div style={styles.cardValue}>{users.length}</div>
          <div style={{ fontSize: '0.75rem', color: '#525252', marginTop: '0.5rem' }}>
            Records in database
          </div>
        </div>
      </div>

      {users.length > 0 && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td style={styles.td}>{user.id}</td>
                <td style={styles.td}>{user.name}</td>
                <td style={styles.td}>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;