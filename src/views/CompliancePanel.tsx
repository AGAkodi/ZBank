'use client';

import React from 'react';
import { useSession } from '../context/SessionContext';
import { ComplianceSummaryStats } from '../components/ComplianceSummaryStats';
import { ComplianceProofLog } from '../components/ComplianceProofLog';
import { SelectiveDisclosure } from '../components/SelectiveDisclosure';
import { PolicyComplianceTable } from '../components/PolicyComplianceTable';

export const CompliancePanel: React.FC = () => {
  const { complianceProofs, auditors, toggleAuditorAccess, payments } = useSession();

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: '100%' }}>
      <div className="view-title-block">
        <h1 className="view-title">Compliance & Auditing Control</h1>
        <p className="view-desc">
          Institutional control center for managing cryptographic compliance, zero-knowledge viewing keys, and policy assertions.
        </p>
      </div>

      {/* Compliance Summary Stats */}
      <ComplianceSummaryStats proofs={complianceProofs} viewers={auditors} />

      {/* Compliance Proof Log */}
      <ComplianceProofLog proofs={complianceProofs} />

      {/* Selective Disclosure / Authorized Viewers */}
      <SelectiveDisclosure 
        viewers={auditors} 
        onToggleViewer={(id) => {
          toggleAuditorAccess(id);
        }} 
      />

      {/* Transaction Policy Compliance */}
      <PolicyComplianceTable payments={payments} />
    </div>
  );
};

export default CompliancePanel;