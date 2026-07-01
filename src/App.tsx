'use client';

import React, { useState, useEffect, useRef } from 'react';
import { SessionProvider, useSession } from './context/SessionContext';
import { LandingPage } from './components/LandingPage';
import { DashboardOverview } from './views/DashboardOverview';
import { SendPaymentFlow } from './views/SendPaymentFlow';
import { ExplorerComparison } from './views/ExplorerComparison';
import { CompliancePanel } from './views/CompliancePanel';
import { TreasuryOverview } from './views/TreasuryOverview';
import { PageFooter } from './components/PageFooter';
import {
  ChevronDown,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Send,
  Search,
  ShieldCheck,
  Vault,
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'overview',    label: 'Overview',          Icon: LayoutDashboard },
  { id: 'send',        label: 'Confidential Send',  Icon: Send },
  { id: 'explorer',    label: 'ZK Explorer',        Icon: Search },
  { id: 'compliance',  label: 'Compliance Panel',   Icon: ShieldCheck },
  { id: 'treasury',    label: 'Treasury Solvency',  Icon: Vault },
] as const;

const DashboardApp: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    walletConnected,
    walletAddress,
    disconnectWallet,
  } = useSession();

  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const handleNavClick = (tab: typeof activeTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDisconnect = () => {
    disconnectWallet();
    setShowDropdown(false);
    setMobileMenuOpen(false);
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'overview':    return <DashboardOverview />;
      case 'send':        return <SendPaymentFlow />;
      case 'explorer':    return <ExplorerComparison />;
      case 'compliance':  return <CompliancePanel />;
      case 'treasury':    return <TreasuryOverview />;
      default:            return <DashboardOverview />;
    }
  };

  if (!walletConnected) {
    return <LandingPage />;
  }

  return (
    <div className="app-container animate-fade-in">
      {/* Top Header */}
      <header className="header">
        {/* Logo */}
        <div className="logo-section">
          <img src="/logo.png" alt="ΛRCΛNUM Logo" style={{ height: '24px', width: 'auto', filter: 'drop-shadow(0 0 8px rgba(243, 183, 36, 0.35))' }} />
          <span className="logo-text" style={{ fontStyle: 'normal', letterSpacing: '0.15em' }}>ΛRCΛNUM</span>
        </div>

        {/* Desktop Nav */}
        <nav className="header-nav">
          {NAV_ITEMS.map(({ id, label }) => (
            <button
              key={id}
              className={`header-nav-btn ${activeTab === id ? 'active' : ''}`}
              onClick={() => handleNavClick(id)}
            >
              <span>{label}</span>
            </button>
          ))}
        </nav>

        {/* Wallet + Hamburger */}
        <div className="header-actions">
          {/* Wallet pill */}
          <div style={{ position: 'relative' }} ref={dropdownRef}>
            <button
              className="btn-secondary wallet-pill"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="wallet-dot" />
              <span className="wallet-address">
                {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : ''}
              </span>
              <ChevronDown size={14} style={{ color: 'var(--color-text-secondary)' }} />
            </button>

            {showDropdown && (
              <div className="wallet-dropdown card-premium animate-fade-in">
                <div className="wallet-dropdown-address">
                  <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Connected Address</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-primary)', wordBreak: 'break-all' }}>
                    {walletAddress}
                  </span>
                </div>
                <button className="wallet-disconnect-btn" onClick={handleDisconnect}>
                  <LogOut size={14} />
                  <span>Disconnect Wallet</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="mobile-menu-btn"
            aria-label="Toggle navigation"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay animate-fade-in" onClick={() => setMobileMenuOpen(false)}>
          <nav className="mobile-nav-drawer" onClick={e => e.stopPropagation()}>
            <div className="mobile-nav-header">
              <img src="/logo.png" alt="ΛRCΛNUM" style={{ height: '20px' }} />
              <span className="logo-text" style={{ fontSize: '1rem' }}>ΛRCΛNUM</span>
            </div>

            <div className="mobile-nav-links">
              {NAV_ITEMS.map(({ id, label, Icon }) => (
                <button
                  key={id}
                  className={`mobile-nav-item ${activeTab === id ? 'active' : ''}`}
                  onClick={() => handleNavClick(id)}
                >
                  <Icon size={16} />
                  <span>{label}</span>
                </button>
              ))}
            </div>

            <div className="mobile-nav-footer">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 16px', background: 'var(--bg-input)', borderRadius: '8px', marginBottom: '12px' }}>
                <div className="wallet-dot" />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--color-text-primary)' }}>
                  {walletAddress ? `${walletAddress.slice(0, 8)}...${walletAddress.slice(-6)}` : ''}
                </span>
              </div>
              <button className="wallet-disconnect-btn" style={{ width: '100%', justifyContent: 'center' }} onClick={handleDisconnect}>
                <LogOut size={14} />
                <span>Disconnect Wallet</span>
              </button>
            </div>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="content-area">
        {renderActiveView()}
      </main>

      {/* Footer */}
      <PageFooter onNavClick={(tab) => { setActiveTab(tab as typeof activeTab); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <SessionProvider>
      <DashboardApp />
    </SessionProvider>
  );
};

export default App;
