'use client';

import React from 'react';
import type { ComplianceProof, SelectiveDisclosureViewer } from '../mocks/compliance';

interface ComplianceSummaryStatsProps {
  proofs: ComplianceProof[];
  viewers: SelectiveDisclosureViewer[];
}

export const ComplianceSummaryStats: React.FC<ComplianceSummaryStatsProps> = ({ proofs, viewers }) => {
  const totalProofs = proofs.length;
  const passedProofs = proofs.filter(p => p.status === 'Passed').length;
  const complianceRate = totalProofs > 0 ? ((passedProofs / totalProofs) * 100).toFixed(1) : '100';
  const activeViewers = viewers.filter(v => v.accessGranted).length;
  const policyViolations = proofs.filter(p => p.status === 'Failed').length;

  return (
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1.5rem',
        marginBottom: '2rem',
        width: '100%'
      }}
      className="dashboard-grid"
    >
      {/* Proofs Generated */}
      <div className="card-premium">
        <div className="card-header-flex">
          <span className="card-label">Proofs Generated</span>
        </div>
        <div className="card-val">{totalProofs}</div>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
          Cryptographic zero-knowledge proofs compiled on-chain.
        </p>
      </div>

      {/* Compliance Rate */}
      <div className="card-premium accented">
        <div className="card-header-flex">
          <span className="card-label">Compliance Rate</span>
        </div>
        <div className="card-val" style={{ color: 'var(--color-success)' }}>
          {complianceRate}%
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
          On-chain checks passing policy check assertions.
        </p>
      </div>

      {/* Authorized Viewers */}
      <div className="card-premium">
        <div className="card-header-flex">
          <span className="card-label">Authorized Viewers</span>
        </div>
        <div className="card-val">{activeViewers}</div>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
          Auditors holding active decryption keys.
        </p>
      </div>

      {/* Policy Violations */}
      <div className="card-premium">
        <div className="card-header-flex">
          <span className="card-label">Policy Violations</span>
        </div>
        <div 
          className="card-val" 
          style={{ 
            color: policyViolations > 0 ? 'var(--color-error)' : 'var(--color-text-primary)' 
          }}
        >
          {policyViolations}
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
          Compliance failures caught off-chain.
        </p>
      </div>
    </div>
  );
};
export default ComplianceSummaryStats;