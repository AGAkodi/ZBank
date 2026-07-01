export interface ComplianceProof {
  id: string;
  timestamp: string;
  proofType: 'Sanctions Check' | 'KYC Verification' | 'AML Flow Review' | 'Assets & Liabilities Matching' | 'KYC' | 'Sanctions' | 'KYC + Sanctions';
  associatedEntity: string;
  status: 'Passed' | 'Pending' | 'Failed';
  verificationHash: string;
  policyDetails: string;
}

export interface SelectiveDisclosureViewer {
  id: string;
  name: string;
  role: string;
  organization: string;
  accessGranted: boolean;
  lastAccessed: string;
}

export const mockComplianceProofs: ComplianceProof[] = [
  {
    id: 'proof_901',
    timestamp: '2026-06-30T14:10:00Z',
    proofType: 'Sanctions',
    associatedEntity: 'GB7Y4ZK9...2345',
    status: 'Passed',
    verificationHash: 'zk_p_sanctions_0x7b11c...4f2a',
    policyDetails: 'OFAC SDN screening check'
  },
  {
    id: 'proof_902',
    timestamp: '2026-06-30T14:09:59Z',
    proofType: 'KYC',
    associatedEntity: 'GB7Y4ZK9...2345',
    status: 'Passed',
    verificationHash: 'zk_p_kyc_0x9a32b...1e8f',
    policyDetails: 'Institutional KYC registry check'
  },
  {
    id: 'proof_903',
    timestamp: '2026-06-30T12:05:00Z',
    proofType: 'KYC + Sanctions',
    associatedEntity: 'GD23JSHW...4890',
    status: 'Passed',
    verificationHash: 'zk_p_kyc_sanctions_0x45ef1...33d2',
    policyDetails: 'On-chain KYC + AML proof bundle'
  },
  {
    id: 'proof_904',
    timestamp: '2026-06-30T09:30:00Z',
    proofType: 'Sanctions',
    associatedEntity: 'GACD87SD...8902',
    status: 'Passed',
    verificationHash: 'zk_p_sanctions_0x82ffc...d5a1',
    policyDetails: 'EU Sanctions List verification check'
  },
  {
    id: 'proof_905',
    timestamp: '2026-06-29T16:45:00Z',
    proofType: 'Sanctions',
    associatedEntity: 'GBOFAC_SA...7890',
    status: 'Failed',
    verificationHash: 'N/A - Screening rejected address',
    policyDetails: 'OFAC SDN Match - Specially Designated National'
  },
  {
    id: 'proof_906',
    timestamp: '2026-06-29T14:20:00Z',
    proofType: 'KYC',
    associatedEntity: 'GCAE71SD...1245',
    status: 'Passed',
    verificationHash: 'zk_p_kyc_0x23ab9...cd89',
    policyDetails: 'Institutional KYC registry check'
  },
  {
    id: 'proof_907',
    timestamp: '2026-06-29T10:15:00Z',
    proofType: 'KYC + Sanctions',
    associatedEntity: 'GB901LKS...8831',
    status: 'Failed',
    verificationHash: 'N/A - Local KYC expired',
    policyDetails: 'Expired corporate verification credentials'
  },
  {
    id: 'proof_908',
    timestamp: '2026-06-28T16:30:00Z',
    proofType: 'Sanctions',
    associatedEntity: 'GD391KLS...5512',
    status: 'Passed',
    verificationHash: 'zk_p_sanctions_0xcc99f...88a2',
    policyDetails: 'OFAC SDN screening check'
  },
  {
    id: 'proof_909',
    timestamp: '2026-06-28T11:00:00Z',
    proofType: 'KYC',
    associatedEntity: 'GC1823KL...9901',
    status: 'Passed',
    verificationHash: 'zk_p_kyc_0x77d12...ffee',
    policyDetails: 'FinCEN accredited onboarding proof'
  },
  {
    id: 'proof_910',
    timestamp: '2026-06-27T15:45:00Z',
    proofType: 'KYC + Sanctions',
    associatedEntity: 'GA9982LK...1122',
    status: 'Passed',
    verificationHash: 'zk_p_kyc_sanctions_0xbb23d...aa88',
    policyDetails: 'OFAC and FATF compliance matching proof'
  }
];

export const mockAuditors: SelectiveDisclosureViewer[] = [
  {
    id: 'auditor_01',
    name: 'External Auditor — Ernst & Young',
    role: 'Independent Auditor',
    organization: 'Ernst & Young Global',
    accessGranted: true,
    lastAccessed: '2026-06-30T10:14:00Z'
  },
  {
    id: 'auditor_02',
    name: 'Regulatory Body — Central Bank',
    role: 'Federal Regulator',
    organization: 'Central Banking Authority',
    accessGranted: true,
    lastAccessed: '2026-06-28T09:30:00Z'
  },
  {
    id: 'auditor_03',
    name: 'Internal Finance Team',
    role: 'Internal Compliance Desk',
    organization: 'ΛRCΛNUM Treasury Group',
    accessGranted: true,
    lastAccessed: '2026-06-29T15:20:00Z'
  },
  {
    id: 'auditor_04',
    name: 'Tax Authority',
    role: 'Revenue Service Inspector',
    organization: 'Federal Tax Service',
    accessGranted: false,
    lastAccessed: 'Never'
  }
];
