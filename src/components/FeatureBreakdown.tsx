'use client';

import React from 'react';
import { VerifiedBadge } from './VerifiedBadge';
import { Lock, CheckCircle2, ShieldCheck, Database, Cpu } from 'lucide-react';

export interface FeatureDetail {
  id: string;
  name: string;
  subtext: string;
  body: string;
  visualType: 'payments' | 'compliance' | 'disclosure' | 'solvency';
}

interface FeatureBreakdownProps {
  features: FeatureDetail[];
}

export const FeatureBreakdown: React.FC<FeatureBreakdownProps> = ({ features }) => {
  
  // Render visual mock components based on type
  const renderVisual = (type: FeatureDetail['visualType']) => {
    switch (type) {
      case 'payments':
        return (
          <div className="card-premium accented" style={{ width: '100%', maxWidth: '400px', margin: '0 auto', padding: '1.5rem', transform: 'rotate(2deg)', boxShadow: '0 15px 30px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.65rem', color: 'var(--color-text-secondary)', letterSpacing: '0.05em' }}>LEDGER TRANSACTION</span>
              <VerifiedBadge type="shielded" text="Verified" glow={true} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>DESTINATION</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <span className="redacted-dot-bar" style={{ width: '100px' }} />
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>GB...4ZK9</span>
                </div>
              </div>
              
              <div>
                <span style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>AMOUNT</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <span className="redacted-blur" style={{ filter: 'blur(4px)', fontSize: '0.9rem' }}>$245,000.00</span>
                  <VerifiedBadge type="verified" text="Amount Hidden" glow={false} />
                </div>
              </div>
            </div>
          </div>
        );

      case 'compliance':
        return (
          <div className="card-premium" style={{ width: '100%', maxWidth: '400px', margin: '0 auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', justifyItems: 'center', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-secondary)', letterSpacing: '0.05em', alignSelf: 'flex-start' }}>OFF-CHAIN COMPLIANCE FLOW</span>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', justifyContent: 'space-between', padding: '8px 0' }}>
              {/* KYC Step */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)', backgroundColor: 'var(--bg-input)' }}>
                  <Database size={16} />
                </div>
                <span style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)' }}>KYC DATA</span>
              </div>

              {/* Arrow */}
              <span style={{ color: 'var(--border-color)', fontSize: '0.8rem' }}>→</span>

              {/* Local Check */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)', backgroundColor: 'var(--bg-input)' }}>
                  <Cpu size={16} />
                </div>
                <span style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)' }}>LOCAL RUN</span>
              </div>

              {/* Arrow */}
              <span style={{ color: 'var(--border-color)', fontSize: '0.8rem' }}>→</span>

              {/* ZK Proof */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid rgba(243,183,36,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-accent)', backgroundColor: 'rgba(243,183,36,0.06)', animation: 'pulseGlow 2.5s infinite' }}>
                  <Lock size={16} />
                </div>
                <span style={{ fontSize: '0.6rem', color: 'var(--color-accent)', fontWeight: 600 }}>ZK PROOF</span>
              </div>

              {/* Arrow */}
              <span style={{ color: 'var(--color-success)', fontSize: '0.8rem' }}>→</span>

              {/* On Chain */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', border: '1px solid var(--color-success)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-success)', backgroundColor: 'rgba(0,230,118,0.05)' }}>
                  <CheckCircle2 size={16} />
                </div>
                <span style={{ fontSize: '0.6rem', color: 'var(--color-success)', fontWeight: 600 }}>COMPLIANT</span>
              </div>
            </div>
          </div>
        );

      case 'disclosure':
        return (
          <div className="card-premium" style={{ width: '100%', maxWidth: '400px', margin: '0 auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--color-text-secondary)', letterSpacing: '0.05em' }}>AUDIT VIEW KEY CONTROLS</span>
              <span className="badge-proof" style={{ fontSize: '0.6rem' }}>Compliance Panel</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', backgroundColor: 'var(--bg-input)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block' }}>Federal Audits Desk</span>
                  <span style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)' }}>Regulator viewing access</span>
                </div>
                <div style={{ width: '32px', height: '18px', backgroundColor: 'var(--color-accent)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '2px', cursor: 'pointer' }}>
                  <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: '#000' }} />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', backgroundColor: 'var(--bg-input)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, display: 'block' }}>External Auditor (IRS)</span>
                  <span style={{ fontSize: '0.6rem', color: 'var(--color-text-muted)' }}>Tax evaluation access</span>
                </div>
                <div style={{ width: '32px', height: '18px', backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start', padding: '2px', cursor: 'pointer', border: '1px solid var(--border-color)' }}>
                  <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: 'var(--color-text-muted)' }} />
                </div>
              </div>
            </div>
          </div>
        );

      case 'solvency':
        return (
          <div className="card-premium accented" style={{ width: '100%', maxWidth: '400px', margin: '0 auto', padding: '1.5rem', transform: 'rotate(-2deg)', boxShadow: '0 15px 30px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-text-secondary)', letterSpacing: '0.05em' }}>SOLVENCY VERIFICATION</span>
              <VerifiedBadge type="solvency" text="Verified" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '4px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Treasury Assets</span>
                <span style={{ fontSize: '0.75rem', filter: 'blur(3px)', userSelect: 'none' }}>$982,510,000.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.03)', paddingBottom: '4px' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>System Liabilities</span>
                <span style={{ fontSize: '0.75rem', filter: 'blur(3px)', userSelect: 'none' }}>$741,200,000.00</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '4px', fontWeight: 600 }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-accent)' }}>Assets &gt; Liabilities</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={14} /> PROVEN TRUE
                </span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="features-breakdown-container" style={{ display: 'flex', flexDirection: 'column', gap: '6rem', width: '100%', margin: '4rem 0' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '-2rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)', marginBottom: '0.5rem' }}>
          How It Works
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', maxWidth: '540px', margin: '0 auto' }}>
          Cryptographic privacy built on top of Stellar, meeting the demands of strict corporate verification.
        </p>
      </div>

      {features.map((feat, idx) => {
        const isEven = idx % 2 === 0;
        
        return (
          <div 
            key={feat.id} 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '4rem', 
              alignItems: 'center',
              maxWidth: '1200px',
              width: '100%',
              margin: '0 auto'
            }}
            className="feature-alternating-row"
          >
            {/* Text Side (if even, rendering left; if odd, rendering right) */}
            <div 
              style={{ 
                order: isEven ? 1 : 2, 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '1rem',
                textAlign: 'left'
              }}
            >
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                0{idx + 1} — FEATURE DETAILS
              </span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-text-primary)', lineHeight: 1.15 }}>
                {feat.name}
              </h3>
              <p style={{ fontSize: '0.95rem', fontWeight: 400, color: 'rgba(255, 255, 255, 0.65)', marginTop: '0.25rem', marginBottom: '0.85rem' }}>
                {feat.subtext}
              </p>
              <p style={{ fontSize: '0.925rem', lineHeight: 1.6, color: 'var(--color-text-secondary)' }}>
                {feat.body}
              </p>
            </div>

            {/* Visual Side (if even, rendering right; if odd, rendering left) */}
            <div 
              style={{ 
                order: isEven ? 2 : 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1.5rem',
                backgroundColor: 'rgba(255,255,255,0.01)',
                border: '1px dashed rgba(255,255,255,0.03)',
                borderRadius: '16px',
                minHeight: '220px'
              }}
            >
              {renderVisual(feat.visualType)}
            </div>

          </div>
        );
      })}
    </div>
  );
};
export default FeatureBreakdown;