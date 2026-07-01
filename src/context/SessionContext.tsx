'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  isConnected as freighterIsConnected,
  isAllowed,
  requestAccess,
  getAddress,
  getNetwork,
  WatchWalletChanges,
} from '@stellar/freighter-api';
import type { PaymentTransaction } from '../mocks/payments';
import { mockPayments } from '../mocks/payments';
import type { SelectiveDisclosureViewer, ComplianceProof } from '../mocks/compliance';
import { mockAuditors, mockComplianceProofs } from '../mocks/compliance';

export type ActiveTab = 'overview' | 'send' | 'explorer' | 'compliance' | 'treasury';
export type NetworkType = 'mainnet' | 'testnet';

interface SessionContextType {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  network: NetworkType;
  payments: PaymentTransaction[];
  addPayment: (payment: PaymentTransaction) => void;
  auditors: SelectiveDisclosureViewer[];
  toggleAuditorAccess: (auditorId: string) => void;
  complianceProofs: ComplianceProof[];
  addComplianceProof: (proof: ComplianceProof) => void;
  selectedTx: PaymentTransaction | null;
  setSelectedTx: (tx: PaymentTransaction | null) => void;
  walletConnected: boolean;
  walletAddress: string | null;
  freighterInstalled: boolean | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  connectError: string | null;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [network, setNetwork] = useState<NetworkType>('testnet');
  const [payments, setPayments] = useState<PaymentTransaction[]>([]);
  const [auditors, setAuditors] = useState<SelectiveDisclosureViewer[]>([]);
  const [complianceProofs, setComplianceProofs] = useState<ComplianceProof[]>([]);
  const [selectedTx, setSelectedTx] = useState<PaymentTransaction | null>(null);

  // Wallet Connection States
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [freighterInstalled, setFreighterInstalled] = useState<boolean | null>(null);
  const [connectError, setConnectError] = useState<string | null>(null);

  // Initialize state from mock files
  useEffect(() => {
    setPayments(mockPayments);
    setAuditors(mockAuditors);
    setComplianceProofs(mockComplianceProofs);
    if (mockPayments.length > 0) {
      setSelectedTx(mockPayments[0]);
    }
  }, []);

  // Resolve detected network string to our NetworkType
  const resolveNetwork = (net: string): NetworkType =>
    net?.toUpperCase().includes('TEST') ? 'testnet' : 'mainnet';

  // Auto-reconnect if the user already granted access in a previous session
  useEffect(() => {
    let watcher: InstanceType<typeof WatchWalletChanges> | null = null;

    const initWallet = async () => {
      try {
        const { isConnected } = await freighterIsConnected();
        setFreighterInstalled(isConnected);
        if (!isConnected) return;

        const { isAllowed: allowed } = await isAllowed();
        if (!allowed) return;

        const { address, error } = await getAddress();
        if (error || !address) return;

        setWalletAddress(address);
        setWalletConnected(true);
        setActiveTab('overview');

        const { network: net } = await getNetwork();
        setNetwork(resolveNetwork(net));

        // Watch for account/network changes while session is live
        watcher = new WatchWalletChanges(3000);
        watcher.watch(({ address: newAddr, network: newNet, error }) => {
          if (error) return;
          if (!newAddr) {
            setWalletConnected(false);
            setWalletAddress(null);
          } else {
            setWalletAddress(newAddr);
            setWalletConnected(true);
          }
          setNetwork(resolveNetwork(newNet));
        });
      } catch {
        // Freighter not available in this environment
        setFreighterInstalled(false);
      }
    };

    initWallet();
    return () => { watcher?.stop(); };
  }, []);

  const connectWallet = useCallback(async () => {
    setConnectError(null);
    try {
      const { isConnected } = await freighterIsConnected();
      if (!isConnected) {
        throw new Error('Freighter wallet is not installed. Please install the browser extension to continue.');
      }

      const { address, error } = await requestAccess();
      if (error) {
        throw new Error((error as { message?: string }).message ?? 'Wallet connection was rejected.');
      }

      setWalletAddress(address);
      setWalletConnected(true);
      setActiveTab('overview');

      const { network: net } = await getNetwork();
      setNetwork(resolveNetwork(net));
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to connect wallet.';
      setConnectError(msg);
      throw err;
    }
  }, []);

  const disconnectWallet = () => {
    setWalletConnected(false);
    setWalletAddress(null);
    setConnectError(null);
  };

  const addPayment = (payment: PaymentTransaction) => {
    setPayments((prev) => [payment, ...prev]);
    
    // Auto-select for Explorer view
    setSelectedTx(payment);

    // Also auto-add a compliance proof
    if (payment.complianceStatus === 'Compliant') {
      const newCompliance: ComplianceProof = {
        id: 'proof_' + Math.floor(Math.random() * 1000),
        timestamp: payment.timestamp,
        proofType: 'Sanctions Check',
        associatedEntity: payment.counterpartyMasked,
        status: 'Passed',
        verificationHash: payment.zkProofHash,
        policyDetails: 'OFAC SDN screening check'
      };
      addComplianceProof(newCompliance);
    }
  };

  const toggleAuditorAccess = (auditorId: string) => {
    setAuditors((prev) =>
      prev.map((auditor) =>
        auditor.id === auditorId
          ? {
              ...auditor,
              accessGranted: !auditor.accessGranted,
              lastAccessed: !auditor.accessGranted ? new Date().toISOString() : auditor.lastAccessed
            }
          : auditor
      )
    );
  };

  const addComplianceProof = (proof: ComplianceProof) => {
    setComplianceProofs((prev) => [proof, ...prev]);
  };

  return (
    <SessionContext.Provider
      value={{
        activeTab,
        setActiveTab,
        network,
        payments,
        addPayment,
        auditors,
        toggleAuditorAccess,
        complianceProofs,
        addComplianceProof,
        selectedTx,
        setSelectedTx,
        walletConnected,
        walletAddress,
        freighterInstalled,
        connectWallet,
        disconnectWallet,
        connectError
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
