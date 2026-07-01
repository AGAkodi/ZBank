'use client';

import React from 'react';
import type { PaymentTransaction } from '../mocks/payments';

interface PolicyComplianceTableProps {
  payments: PaymentTransaction[];
}

export const PolicyComplianceTable: React.FC<PolicyComplianceTableProps> = ({ payments }) => {
  return (
    <div className="table-container" style={{ width: '100%', marginBottom: '2rem' }}>
      
      <div className="table-header-bar">
        <h3 className="table-title">Transaction Policy Compliance</h3>
        <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
          Active institutional rules checked pre-flight
        </span>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Spending Limit Policy</th>
              <th>Multi-Signature Rule</th>
              <th>Business Hours Window</th>
              <th style={{ textAlign: 'right' }}>Overall Assessment</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => {
              const isOverallCompliant = p.complianceStatus === 'Compliant' && p.withinLimit && p.multiSigApproved && p.withinBusinessHours;
              
              return (
                <tr key={p.id}>
                  {/* Transaction ID */}
                  <td style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                    {p.id}
                  </td>

                  {/* Spending Limit Check */}
                  <td>
                    <span 
                      className={`badge-status ${p.withinLimit ? 'compliant' : 'failed'}`}
                      style={{ fontSize: '0.65rem', padding: '3px 8px' }}
                    >
                      {p.withinLimit ? 'Within Limit' : 'Limit Exceeded'}
                    </span>
                  </td>

                  {/* Multi-Signature Status */}
                  <td>
                    <span 
                      className={`badge-status ${p.multiSigApproved ? 'compliant' : 'pending'}`}
                      style={{ fontSize: '0.65rem', padding: '3px 8px' }}
                    >
                      {p.multiSigApproved ? 'Multi-sig Approved' : 'Pending Approval'}
                    </span>
                  </td>

                  {/* Business Hours Check */}
                  <td>
                    <span 
                      className={`badge-status ${p.withinBusinessHours ? 'compliant' : 'failed'}`}
                      style={{ fontSize: '0.65rem', padding: '3px 8px' }}
                    >
                      {p.withinBusinessHours ? 'Within Hours' : 'After Hours'}
                    </span>
                  </td>

                  {/* Overall Compliance Evaluation */}
                  <td style={{ textAlign: 'right' }}>
                    <span 
                      className={`badge-status ${isOverallCompliant ? 'compliant' : 'failed'}`}
                      style={{ 
                        display: 'inline-flex',
                        fontSize: '0.7rem', 
                        padding: '4px 10px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}
                    >
                      {isOverallCompliant ? 'Compliant' : 'Review Required'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};
export default PolicyComplianceTable;