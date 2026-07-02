'use client';

import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: 'var(--color-bg-primary)',
      color: 'var(--color-text-primary)',
      textAlign: 'center',
      padding: '2rem',
    }}>
      <h1 style={{
        fontSize: '4rem',
        fontWeight: 900,
        color: 'var(--color-accent)',
        marginBottom: '1rem',
        letterSpacing: '0.1em'
      }}>
        404
      </h1>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: 600,
        marginBottom: '1.5rem',
      }}>
        Page Not Found
      </h2>
      <p style={{
        color: 'var(--color-text-secondary)',
        maxWidth: '400px',
        marginBottom: '2rem',
        lineHeight: 1.6
      }}>
        The requested module or private transaction pipeline does not exist or has been archived.
      </p>
      <Link href="/" className="btn-primary" style={{ textDecoration: 'none' }}>
        Return to Dashboard
      </Link>
    </div>
  );
}
