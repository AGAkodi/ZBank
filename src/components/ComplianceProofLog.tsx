import React, { useState } from 'react';
import type { ComplianceProof } from '../mocks/compliance';

interface ComplianceProofLogProps {
  proofs: ComplianceProof[];
}

type FilterType = 'All' | 'Passed' | 'Failed';

export const ComplianceProofLog: React.FC<ComplianceProofLogProps> = ({ proofs }) => {
  const [filter, setFilter] = useState<FilterType>('All');

  // Stub function for viewing proof
  const viewProof = (transactionId: string) => {
    console.log(`View proof triggered for transaction: ${transactionId}`);
    alert(`Decrypted ZK Verification Credential\nTransaction Ref: ${transactionId}\nStatus: Verified On-Chain via Soroban Contract`);
  };

  const filteredProofs = proofs.filter(p => {
    if (filter === 'Passed') return p.status === 'Passed';
    if (filter === 'Failed') return p.status === 'Failed';
    return true;
  });

  // Color mappings for proof type badges
  const getProofTypeStyle = (type: string) => {
    switch (type) {
      case 'KYC':
        return {
          backgroundColor: 'rgba(33, 150, 243, 0.08)',
          color: '#2196f3',
          border: '1px solid rgba(33, 150, 243, 0.2)'
        };
      case 'Sanctions':
        return {
          backgroundColor: 'rgba(244, 67, 54, 0.08)',
          color: '#f44336',
          border: '1px solid rgba(244, 67, 54, 0.2)'
        };
      case 'KYC + Sanctions':
      default:
        return {
          backgroundColor: 'rgba(243, 183, 36, 0.08)',
          color: 'var(--color-accent)',
          border: '1px solid rgba(243, 183, 36, 0.2)'
        };
    }
  };

  return (
    <div className="table-container" style={{ width: '100%', marginBottom: '2rem' }}>
      
      {/* Table Header Bar & Filter Controls */}
      <div 
        className="table-header-bar" 
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem' 
        }}
      >
        <h3 className="table-title">Compliance Proof Log</h3>
        
        {/* All / Passed / Failed Filter Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem' }} className="network-selector">
          {(['All', 'Passed', 'Failed'] as FilterType[]).map((f) => (
            <button
              key={f}
              className={`network-btn ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
              style={{ fontSize: '0.65rem', padding: '4px 12px' }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Proof Type</th>
              <th>Result</th>
              <th>Timestamp</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProofs.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: '2rem' }}>
                  No matching compliance logs found.
                </td>
              </tr>
            ) : (
              filteredProofs.map((proof) => {
                const isFailed = proof.status === 'Failed';
                
                return (
                  <tr 
                    key={proof.id} 
                    style={{
                      borderLeft: isFailed ? '3px solid var(--color-error)' : '3px solid transparent',
                      backgroundColor: isFailed ? 'rgba(255, 23, 68, 0.015)' : 'transparent'
                    }}
                  >
                    {/* Transaction ID */}
                    <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                      {proof.associatedEntity}
                    </td>

                    {/* Proof Type Badge */}
                    <td>
                      <span 
                        style={{
                          display: 'inline-block',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '4px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          ...getProofTypeStyle(proof.proofType)
                        }}
                      >
                        {proof.proofType}
                      </span>
                    </td>

                    {/* Result Status */}
                    <td>
                      <span 
                        className={`badge-status ${proof.status === 'Passed' ? 'compliant' : 'failed'}`}
                        style={{ display: 'inline-flex', padding: '2px 8px' }}
                      >
                        {proof.status === 'Passed' ? 'Passed' : 'Failed'}
                      </span>
                    </td>

                    {/* Timestamp */}
                    <td style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                      {new Date(proof.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                    </td>

                    {/* View Proof Action button */}
                    <td style={{ textAlign: 'right' }}>
                      <button
                        className="btn-secondary"
                        onClick={() => viewProof(proof.id)}
                        style={{ fontSize: '0.65rem', padding: '4px 10px', borderRadius: '4px' }}
                      >
                        View Proof
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};
export default ComplianceProofLog;
