import React, { useState } from 'react';
import type { SelectiveDisclosureViewer } from '../mocks/compliance';
import { Shield, UserPlus, X } from 'lucide-react';

interface SelectiveDisclosureProps {
  viewers: SelectiveDisclosureViewer[];
  onToggleViewer: (viewerId: string, status: boolean) => void;
}

export const SelectiveDisclosure: React.FC<SelectiveDisclosureProps> = ({ viewers: initialViewers, onToggleViewer }) => {
  const [viewersList, setViewersList] = useState<SelectiveDisclosureViewer[]>(initialViewers);
  const [expandedViewerId, setExpandedViewerId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  
  // New viewer form state
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState('External Auditor');
  const [newOrg, setNewOrg] = useState('');
  const [newAccessLevel, setNewAccessLevel] = useState<'Full Ledger Access' | 'Selected Transactions' | 'Read Only'>('Selected Transactions');

  // Stub function to toggle viewer access
  const toggleViewerAccess = (viewerId: string, currentStatus: boolean) => {
    console.log(`toggleViewerAccess triggered for: ${viewerId}, target state: ${!currentStatus}`);
    const updated = viewersList.map(v => {
      if (v.id === viewerId) {
        return { ...v, accessGranted: !currentStatus };
      }
      return v;
    });
    setViewersList(updated);
    onToggleViewer(viewerId, !currentStatus);
  };

  // Stub function to add a viewer
  const addViewer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newOrg) {
      alert('Please fill out all fields.');
      return;
    }

    const newViewer: SelectiveDisclosureViewer = {
      id: `auditor_${Date.now()}`,
      name: `${newName} — ${newOrg}`,
      role: newRole,
      organization: newOrg,
      accessGranted: true,
      lastAccessed: 'Never'
    };

    console.log('addViewer triggered with data:', newViewer);
    setViewersList([...viewersList, newViewer]);
    
    // Reset Form
    setNewName('');
    setNewOrg('');
    setNewRole('External Auditor');
    setNewAccessLevel('Selected Transactions');
    setShowAddForm(false);
  };

  // Get style badges for Access Level
  const getAccessBadgeStyle = (level: string) => {
    switch (level) {
      case 'Full Ledger Access':
        return {
          backgroundColor: 'rgba(0, 230, 118, 0.08)',
          color: 'var(--color-success)',
          border: '1px solid rgba(0, 230, 118, 0.2)'
        };
      case 'Selected Transactions':
        return {
          backgroundColor: 'rgba(243, 183, 36, 0.08)',
          color: 'var(--color-accent)',
          border: '1px solid rgba(243, 183, 36, 0.2)'
        };
      case 'Read Only':
      default:
        return {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          color: 'var(--color-text-secondary)',
          border: '1px solid var(--border-color)'
        };
    }
  };

  return (
    <div className="card-premium" style={{ width: '100%', marginBottom: '2rem', padding: '2rem' }}>
      
      {/* Title & Explainer Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-primary)', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Shield size={18} style={{ color: 'var(--color-accent)' }} />
            Selective Disclosure & Authorized Viewers
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', maxWidth: '750px', lineHeight: 1.5 }}>
            Grant specific parties the ability to decrypt and view transaction details. All other observers see only verified proof hashes.
          </p>
        </div>
        
        <button 
          className="btn-primary"
          style={{ padding: '6px 14px', borderRadius: '6px' }}
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <UserPlus size={13} />
          <span>Add Viewer</span>
        </button>
      </div>

      {/* Add Viewer Form Modal / Inline Wrapper */}
      {showAddForm && (
        <form 
          onSubmit={addViewer}
          style={{
            backgroundColor: 'var(--bg-input)',
            border: '1px solid rgba(243, 183, 36, 0.25)',
            borderRadius: '8px',
            padding: '1.5rem',
            marginBottom: '1.5rem',
            animation: 'fadeIn 0.3s ease-in-out'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-accent)', textTransform: 'uppercase' }}>Add New Authorized Viewer</h4>
            <button type="button" onClick={() => setShowAddForm(false)} style={{ background: 'transparent', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
              <X size={16} />
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1rem' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ fontSize: '0.65rem' }}>Viewer Name</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Deloitte Audit Desk" 
                value={newName} 
                onChange={(e) => setNewName(e.target.value)}
                style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                required 
              />
            </div>
            
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ fontSize: '0.65rem' }}>Organization</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. SEC FinHub Division" 
                value={newOrg} 
                onChange={(e) => setNewOrg(e.target.value)}
                style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                required 
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label" style={{ fontSize: '0.65rem' }}>Access Level</label>
              <select 
                className="form-input" 
                value={newAccessLevel} 
                onChange={(e) => setNewAccessLevel(e.target.value as any)}
                style={{ padding: '8px 12px', fontSize: '0.85rem', color: 'var(--color-text-primary)', backgroundColor: 'var(--bg-input)' }}
              >
                <option value="Selected Transactions">Selected Transactions</option>
                <option value="Full Ledger Access">Full Ledger Access</option>
                <option value="Read Only">Read Only</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.25rem' }}>
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={() => setShowAddForm(false)}
              style={{ padding: '6px 14px', borderRadius: '6px' }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-primary"
              style={{ padding: '6px 14px', borderRadius: '6px' }}
            >
              Authorize Access
            </button>
          </div>
        </form>
      )}

      {/* Viewer Entries List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {viewersList.map((viewer) => {
          const isExpanded = expandedViewerId === viewer.id;
          
          return (
            <div 
              key={viewer.id}
              className="disclosure-row"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                backgroundColor: 'rgba(255,255,255,0.01)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '1.25rem'
              }}
            >
              {/* Row Top Header bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>
                      {viewer.name}
                    </span>
                    {/* Access level badge */}
                    <span 
                      style={{
                        fontSize: '0.6rem',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        ...getAccessBadgeStyle(viewer.id === 'auditor_01' ? 'Selected Transactions' : viewer.id === 'auditor_04' ? 'Read Only' : 'Full Ledger Access')
                      }}
                    >
                      {viewer.id === 'auditor_01' ? 'Selected Transactions' : viewer.id === 'auditor_04' ? 'Read Only' : 'Full Ledger Access'}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                    Role: <strong style={{ color: 'var(--color-text-primary)' }}>{viewer.role}</strong> • Organization: <strong style={{ color: 'var(--color-text-primary)' }}>{viewer.organization}</strong>
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
                    Last Decryption Pull: {viewer.lastAccessed === 'Never' ? 'Never' : new Date(viewer.lastAccessed).toLocaleString()}
                  </span>
                </div>

                {/* Toggle Controls & Manage Button */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <button 
                    className="btn-secondary"
                    onClick={() => setExpandedViewerId(isExpanded ? null : viewer.id)}
                    style={{ fontSize: '0.65rem', padding: '4px 10px', borderRadius: '4px' }}
                  >
                    {isExpanded ? 'Hide Scope' : 'Manage Access'}
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 600, color: viewer.accessGranted ? 'var(--color-success)' : 'var(--color-text-muted)' }}>
                      {viewer.accessGranted ? 'Active' : 'Revoked'}
                    </span>
                    <label className="switch-control">
                      <input
                        type="checkbox"
                        checked={viewer.accessGranted}
                        onChange={() => toggleViewerAccess(viewer.id, viewer.accessGranted)}
                      />
                      <span className="switch-slider"></span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Expanded scope details panel */}
              {isExpanded && (
                <div 
                  style={{
                    marginTop: '0.5rem',
                    paddingTop: '1rem',
                    borderTop: '1px dashed var(--border-color)',
                    fontSize: '0.75rem',
                    color: 'var(--color-text-secondary)',
                    animation: 'fadeIn 0.25s ease-out'
                  }}
                >
                  <span style={{ fontWeight: 600, color: 'var(--color-text-primary)', display: 'block', marginBottom: '0.5rem' }}>
                    AUTHORIZED DECRYPTION SCOPE:
                  </span>
                  
                  {viewer.accessGranted ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '8px', backgroundColor: 'var(--bg-input)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                      {viewer.id === 'auditor_01' ? (
                        <>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)' }}>
                            <span>● tx_90823412 (Supplier invoice #4928)</span>
                            <span style={{ color: 'var(--color-success)' }}>Granted</span>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)' }}>
                            <span>● tx_90823416 (Treasury deployment refund)</span>
                            <span style={{ color: 'var(--color-success)' }}>Granted</span>
                          </div>
                        </>
                      ) : (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>● All records in institutional ledger book (GA_ARCANUM_SYSTEM...)</span>
                          <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>Unconditional Access</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p style={{ color: 'var(--color-error)', fontStyle: 'italic' }}>
                      Access has been revoked. Decryption keys are invalidated on-chain.
                    </p>
                  )}
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};
export default SelectiveDisclosure;
