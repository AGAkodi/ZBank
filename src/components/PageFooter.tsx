import React from 'react';

interface PageFooterProps {
  onNavClick?: (tab: string) => void;
}

export const PageFooter: React.FC<PageFooterProps> = ({ onNavClick }) => {
  const handleNavClick = (tab: string) => {
    if (onNavClick) {
      onNavClick(tab);
    }
  };

  return (
    <footer 
      className="landing-page-footer"
      style={{
        borderTop: '1px solid var(--border-color)',
        backgroundColor: 'rgba(8, 9, 10, 0.5)',
        padding: '4rem 4rem 2rem 4rem',
        marginTop: '6rem',
        width: '100%',
        zIndex: 5,
        boxSizing: 'border-box'
      }}
    >
      <div 
        style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr 1fr',
          gap: '4rem',
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto 3rem auto'
        }}
        className="footer-columns-grid"
      >
        {/* Col 1: Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' }}>
          <div className="logo-section" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src="/logo.png" alt="ΛRCΛNUM Logo" style={{ height: '22px', width: 'auto' }} />
            <span className="logo-text" style={{ fontStyle: 'normal', letterSpacing: '0.15em', fontSize: '1.1rem' }}>ΛRCΛNUM</span>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5, maxWidth: '280px' }}>
            Confidential institutional payments on Stellar.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-success)', display: 'inline-block', boxShadow: '0 0 6px var(--color-success)' }} />
            <span>Stellar Testnet</span>
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.75rem' }}>
          <h4 style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Platform Portal
          </h4>
          <button onClick={() => handleNavClick('overview')} style={{ background: 'transparent', border: 'none', padding: 0, fontSize: '0.825rem', color: 'var(--color-text-secondary)', cursor: 'pointer', textAlign: 'left' }} className="footer-nav-link">
            Overview
          </button>
          <button onClick={() => handleNavClick('send')} style={{ background: 'transparent', border: 'none', padding: 0, fontSize: '0.825rem', color: 'var(--color-text-secondary)', cursor: 'pointer', textAlign: 'left' }} className="footer-nav-link">
            Confidential Send
          </button>
          <button onClick={() => handleNavClick('explorer')} style={{ background: 'transparent', border: 'none', padding: 0, fontSize: '0.825rem', color: 'var(--color-text-secondary)', cursor: 'pointer', textAlign: 'left' }} className="footer-nav-link">
            ZK Explorer
          </button>
          <button onClick={() => handleNavClick('compliance')} style={{ background: 'transparent', border: 'none', padding: 0, fontSize: '0.825rem', color: 'var(--color-text-secondary)', cursor: 'pointer', textAlign: 'left' }} className="footer-nav-link">
            Compliance Panel
          </button>
          <button onClick={() => handleNavClick('treasury')} style={{ background: 'transparent', border: 'none', padding: 0, fontSize: '0.825rem', color: 'var(--color-text-secondary)', cursor: 'pointer', textAlign: 'left' }} className="footer-nav-link">
            Treasury Solvency
          </button>
        </div>

        {/* Col 3: Built With */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.75rem' }}>
          <h4 style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-primary)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Built With
          </h4>
          <a href="https://stellar.org" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.825rem', color: 'var(--color-text-secondary)', textDecoration: 'none' }} className="footer-nav-link">
            Stellar Network
          </a>
          <span style={{ fontSize: '0.825rem', color: 'var(--color-text-secondary)' }}>
            Soroban Smart Contracts
          </span>
          <a href="https://noir-lang.org" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.825rem', color: 'var(--color-text-secondary)', textDecoration: 'none' }} className="footer-nav-link">
            Noir Language
          </a>
          <a href="https://dev.risczero.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.825rem', color: 'var(--color-text-secondary)', textDecoration: 'none' }} className="footer-nav-link">
            RISC Zero VM
          </a>
          <p style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
            Zero-knowledge proofs verified on-chain
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div 
        style={{
          borderTop: '1px solid var(--border-color)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          width: '100%',
          margin: '0 auto',
          fontSize: '0.75rem',
          color: 'var(--color-text-muted)'
        }}
        className="footer-bottom-flex"
      >
        <span>© 2025 ΛRCΛNUM. Built for the Real-World ZK on Stellar Hackathon.</span>
        <a 
          href="https://github.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ color: 'var(--color-text-muted)', textDecoration: 'none' }}
          className="footer-nav-link"
        >
          Open source — View on GitHub
        </a>
      </div>
    </footer>
  );
};
export default PageFooter;
