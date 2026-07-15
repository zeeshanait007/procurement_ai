import React, { useState, useEffect } from 'react';
import { mockTenders, mockVendors } from '../mockPlatformData';
import { 
  FileText, FileSignature, BrainCircuit, Scale, Users2, ShieldCheck, 
  Network, GitMerge, LineChart, Settings, Plus, Search, Filter, 
  Play, Pause, RefreshCw, Download, Edit3, Trash2, CheckCircle, AlertTriangle, FileSpreadsheet
} from 'lucide-react';
import { useToast, useModal } from '../App';

// Shared UI Components
const PageHeader = ({ title, icon: Icon, actionLabel, onAction }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
    <h2 style={{ fontSize: '1.25rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <Icon className="text-accent-primary" /> {title}
    </h2>
    {actionLabel && <button className="btn btn-primary" onClick={onAction}><Plus size={18} /> {actionLabel}</button>}
  </div>
);

const SmartNITWizard = ({ closeModal, showToast }) => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [cvcFixed, setCvcFixed] = useState(false);
  const [category, setCategory] = useState('Goods');

  const handleGenerate = () => {
    setIsLoading(true);
    setStep(2);
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 2000); // Simulate AI thinking
  };

  const handleFixCVC = () => {
    setCvcFixed(true);
  };

  const handlePublish = () => {
    closeModal();
    showToast('NIT Published Successfully to SECL Portal', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', minHeight: '300px' }}>
      {/* Progress Indicator */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        {[1, 2, 3, 4].map(s => (
          <div key={s} style={{ 
            flex: 1, height: '4px', background: step >= s ? 'var(--accent-primary)' : 'var(--glass-border)',
            marginRight: s < 4 ? '4px' : '0', borderRadius: '2px', transition: 'all 0.3s'
          }} />
        ))}
      </div>

      {/* Step 1: Input */}
      {step === 1 && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Define Tender Parameters</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>The AI will automatically draft the NIT based on SECL templates and past historical data.</p>
          <div>
            <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Tender Reference</label>
            <input type="text" defaultValue="NIT/2026/012" style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', borderRadius: '6px', marginTop: '0.25rem' }} />
          </div>
          <div>
            <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Material Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', borderRadius: '6px', marginTop: '0.25rem' }}>
              <option>Heavy Earth Moving Machinery (HEMM)</option>
              <option>IT Infrastructure</option>
              <option>Mining Explosives</option>
            </select>
          </div>
          <div>
            <label style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Estimated Value (₹)</label>
            <input type="text" defaultValue="25,00,00,000" style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', borderRadius: '6px', marginTop: '0.25rem' }} />
          </div>
          
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '2rem' }}>
            <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
            <button className="btn btn-primary" onClick={handleGenerate}><BrainCircuit size={18} /> Generate Smart NIT</button>
          </div>
        </div>
      )}

      {/* Step 2: Loading AI */}
      {step === 2 && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 0', gap: '1rem' }}>
          <RefreshCw className="animate-spin text-accent-primary" size={40} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>AI is drafting the Tender...</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Pulling SECL legal clauses, EMD rules, and CVC guidelines.</p>
        </div>
      )}

      {/* Step 3 & 4: Review Draft & CVC Warning */}
      {(step === 3 || step === 4) && (
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Review Generated Clauses</h3>
          
          <div style={{ padding: '1rem', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', borderRadius: '8px', fontSize: '0.9rem', maxHeight: '200px', overflowY: 'auto' }}>
            <strong>3.1 EMD Requirement:</strong> The bidder must submit an Earnest Money Deposit (EMD) of ₹50,00,000 via NEFT/RTGS.<br/><br/>
            <strong>4.1 Turnover Criteria:</strong> Average annual financial turnover during the last 3 years should be at least 30% of the estimated cost.<br/><br/>
            <span style={{ background: cvcFixed ? 'transparent' : 'rgba(220, 38, 38, 0.1)', padding: '0.25rem', borderRadius: '4px', transition: 'background 0.3s' }}>
              <strong>4.2 Local Vendor Preference:</strong> 
              {cvcFixed ? 
                " Bidding is open to all domestic vendors meeting Make in India standards." : 
                " Bidding is restricted to vendors with registered offices within a 50km radius of SECL headquarters."}
            </span>
          </div>

          {!cvcFixed && step === 3 && (
            <div className="animate-fade-in" style={{ padding: '1rem', background: 'rgba(220, 38, 38, 0.05)', borderLeft: '4px solid var(--danger)', borderRadius: '4px', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <ShieldCheck color="var(--danger)" size={24} style={{ flexShrink: 0 }} />
              <div>
                <h4 style={{ color: 'var(--danger)', fontWeight: '600', marginBottom: '0.25rem' }}>CVC Compliance Warning</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  Clause 4.2 restricts bidding based on geographical radius. This violates Central Vigilance Commission (CVC) guidelines on ensuring broad-based open competition.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button className="btn btn-primary" onClick={handleFixCVC} style={{ background: 'var(--danger)', fontSize: '0.8rem', padding: '0.5rem 1rem' }}>Accept AI Recommendation & Fix</button>
                  <button className="btn btn-outline" style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>Ignore (Risk)</button>
                </div>
              </div>
            </div>
          )}

          {cvcFixed && (
            <div className="animate-fade-in" style={{ padding: '0.75rem', background: 'rgba(5, 150, 105, 0.1)', color: 'var(--success)', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
              <CheckCircle size={18} /> Clause 4.2 updated successfully. Document is now CVC compliant.
            </div>
          )}

          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingTop: '1rem' }}>
            <button className="btn btn-outline" onClick={() => setStep(1)}>Back</button>
            <button className="btn btn-primary" onClick={handlePublish} disabled={!cvcFixed && step === 3}>
              <CheckCircle size={18} /> Send to Committee for Approval
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const TenderManagement = () => {
  const { showToast } = useToast();
  const { showModal, closeModal } = useModal();

  const handleCreateNIT = () => {
    showModal('Smart NIT Wizard', <SmartNITWizard closeModal={closeModal} showToast={showToast} />, null);
  };

  return (
    <div className="glass-card animate-fade-in" style={{ padding: '2rem' }}>
      <PageHeader title="Tender Management Console" icon={FileText} actionLabel="Create New NIT" onAction={handleCreateNIT} />
      <div className="table-container">
        <table>
          <thead><tr><th>NIT Ref</th><th>Category</th><th>Published Date</th><th>Deadline</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            {mockTenders.map(t => (
              <tr key={t.id}>
                <td><strong>{t.id}</strong></td>
                <td>{t.name.split(' ')[0]}</td>
                <td>12-06-2026</td>
                <td>15-07-2026</td>
                <td><span className="badge primary">Active</span></td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-outline" style={{ padding: '0.25rem' }} onClick={() => showToast(`Editing ${t.id}`, 'info')}><Edit3 size={16} /></button>
                    <button className="btn btn-outline" style={{ padding: '0.25rem', color: 'var(--danger)', borderColor: 'var(--danger)' }} onClick={() => showToast(`Deleted ${t.id}`, 'warning')}><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 2. Document Intelligence
export const DocumentIntelligence = () => {
  const { showToast } = useToast();
  return (
    <div className="glass-card animate-fade-in" style={{ padding: '2rem' }}>
      <PageHeader title="Document Intelligence Library" icon={FileText} actionLabel="Upload Batch" onAction={() => showToast('Opening File Uploader...', 'info')} />
      <div className="stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stat-item"><div className="stat-label">Total Indexed</div><div className="stat-value">10,452</div></div>
        <div className="stat-item"><div className="stat-label">Unrecognized Formats</div><div className="stat-value" style={{color: 'var(--warning)'}}>14</div></div>
        <div className="stat-item"><div className="stat-label">Storage Used</div><div className="stat-value">1.2 TB</div></div>
      </div>
      <div style={{ padding: '2rem', background: 'var(--glass-bg)', borderRadius: '8px', textAlign: 'center' }}>
        <Search size={48} color="var(--text-secondary)" style={{ margin: '0 auto 1rem auto' }} />
        <h3>Semantic Document Search</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Search across 10,000+ documents using natural language...</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1rem' }}>
          <input type="text" placeholder="e.g., 'ISO certificates from Alpha Mining expiring in 2026'" style={{ width: '60%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
          <button className="btn btn-primary" onClick={() => showToast('Searching Document AI Index...', 'info')}>Search</button>
        </div>
      </div>
    </div>
  );
};

// 3. OCR & Metadata
export const OcrMetadata = () => {
  return (
    <div className="glass-card animate-fade-in" style={{ padding: '2rem' }}>
      <PageHeader title="OCR & Extraction Pipeline" icon={FileSignature} />
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ marginBottom: '1rem' }}>Active Queues</h3>
          {['NIT/2026/001 - Bids (120 files)', 'Vendor Registrations (45 files)'].map((q, i) => (
            <div key={i} style={{ padding: '1rem', background: 'var(--glass-bg)', borderRadius: '8px', marginBottom: '1rem', display: 'flex', justifyContent: 'space-between' }}>
              <span>{q}</span>
              <span style={{ color: 'var(--accent-primary)' }}>Processing...</span>
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ marginBottom: '1rem' }}>Engine Health</h3>
          <div style={{ padding: '2rem', background: 'var(--glass-bg)', borderRadius: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}><span>Accuracy (English)</span> <span style={{ color: 'var(--success)' }}>99.2%</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}><span>Accuracy (Hindi)</span> <span style={{ color: 'var(--success)' }}>96.5%</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Handwriting ICR</span> <span style={{ color: 'var(--warning)' }}>92.1%</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. Clause Intelligence
export const ClauseIntelligence = () => {
  const { showToast } = useToast();
  return (
    <div className="glass-card animate-fade-in" style={{ padding: '2rem' }}>
      <PageHeader title="Clause Library & Templates" icon={BrainCircuit} actionLabel="Add Clause" onAction={() => showToast('Creating New Clause Template', 'info')} />
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        {['Force Majeure', 'Payment Terms', 'Delivery Liquidated Damages', 'Warranty Period'].map((c, i) => (
          <div key={i} style={{ padding: '1.5rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '8px', minWidth: '250px' }}>
            <h4>{c}</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Standard SECL Template v2.4</p>
            <div style={{ marginTop: '1rem' }}><span className="badge success">Active</span></div>
          </div>
        ))}
      </div>
    </div>
  );
};

// 5. Rule Engine
export const RuleEngine = () => {
  const { showToast } = useToast();
  return (
    <div className="glass-card animate-fade-in" style={{ padding: '2rem' }}>
      <PageHeader title="Evaluation Rule Engine" icon={Scale} actionLabel="New Rule Matrix" onAction={() => showToast('Opening Rule Builder...', 'info')} />
      <div className="table-container">
        <table>
          <thead><tr><th>Rule Matrix Name</th><th>Tender Category</th><th>Conditions Count</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>Heavy Machinery Standard Eval</td><td>Goods</td><td>12 Conditions</td><td><span className="badge primary">Active</span></td></tr>
            <tr><td>IT Infrastructure Pre-Qual</td><td>Services</td><td>8 Conditions</td><td><span className="badge primary">Active</span></td></tr>
            <tr><td>Civil Construction L1 Matrix</td><td>Works</td><td>15 Conditions</td><td><span className="badge warning">Draft</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 6. Committee Workspace
export const CommitteeWorkspace = () => {
  const { showToast } = useToast();
  const { showModal, closeModal } = useModal();

  const handleSign = () => {
    const modalBody = (
      <div style={{ textAlign: 'center' }}>
        <ShieldCheck size={48} color="var(--accent-primary)" style={{ marginBottom: '1rem' }} />
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>Please enter your Class-3 Digital Signature Certificate (DSC) PIN to authorize the Tender Committee Recommendation for NIT/2026/001.</p>
        <input type="password" placeholder="Enter DSC PIN..." style={{ width: '60%', padding: '0.75rem', textAlign: 'center', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', borderRadius: '6px', letterSpacing: '4px', fontSize: '1.2rem' }} />
      </div>
    );
    const modalActions = (
      <>
        <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
        <button className="btn btn-primary" onClick={() => { closeModal(); showToast('Document Digitally Signed & Time-stamped', 'success'); }}>Authenticate & Sign</button>
      </>
    );
    showModal('DSC Authentication Required', modalBody, modalActions);
  };

  return (
    <div className="glass-card animate-fade-in" style={{ padding: '2rem' }}>
      <PageHeader title="Tender Committee Workspace" icon={Users2} />
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ marginBottom: '1rem' }}>Pending Approvals</h3>
          <div style={{ padding: '1.5rem', background: 'var(--glass-bg)', borderRadius: '8px', borderLeft: '4px solid var(--warning)' }}>
            <h4>NIT/2026/001 - Comparative Statement</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0.5rem 0' }}>Awaiting signature from 3 committee members.</p>
            <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={handleSign}><CheckCircle size={16} style={{marginRight: '0.5rem'}}/> Sign Digitally</button>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ marginBottom: '1rem' }}>Committee Members</h3>
          {['Dir. Finance', 'Dir. Technical', 'Chief Vigilance Officer'].map((role, i) => (
            <div key={i} style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '20px', background: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{role[0]}</div>
              <div>{role}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 7. Audit Workspace
export const AuditWorkspace = () => {
  const { showToast } = useToast();
  return (
    <div className="glass-card animate-fade-in" style={{ padding: '2rem' }}>
      <PageHeader title="Audit & Vigilance Logs" icon={ShieldCheck} actionLabel="Export Audit Trail" onAction={() => showToast('Exporting immutable audit trail to PDF...', 'success')} />
      <div className="table-container">
        <table>
          <thead><tr><th>Timestamp</th><th>User</th><th>Action</th><th>Target Reference</th><th>IP Address</th></tr></thead>
          <tbody>
            <tr><td>2026-07-14 10:45:12</td><td>System Admin</td><td><span className="badge warning">Override AI Decision</span></td><td>Bid-XYZ-001 (Turnover)</td><td>192.168.1.45</td></tr>
            <tr><td>2026-07-14 10:42:01</td><td>Tender Officer</td><td><span className="badge primary">Generate Shortfall</span></td><td>Vendor-Beta</td><td>192.168.1.112</td></tr>
            <tr><td>2026-07-14 10:30:55</td><td>AI Engine</td><td><span className="badge success">Eval Complete</span></td><td>NIT/2026/001</td><td>internal-svc</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 8. AI Copilot
export const AiCopilot = () => {
  const { showToast } = useToast();
  return (
    <div className="glass-card animate-fade-in" style={{ padding: '0', display: 'flex', height: '600px' }}>
      <div style={{ flex: 1, padding: '2rem', display: 'flex', flexDirection: 'column' }}>
        <PageHeader title="Global Procurement Copilot" icon={BrainCircuit} />
        <div style={{ flex: 1, background: 'var(--bg-primary)', borderRadius: '8px', padding: '1rem', overflowY: 'auto', border: '1px solid var(--glass-border)', marginBottom: '1rem' }}>
          <div style={{ padding: '1rem', background: 'var(--glass-bg)', borderRadius: '8px', marginBottom: '1rem', width: 'fit-content' }}>
            Hello! I am your Procurement AI. I have access to all 300 tenders, 500 vendors, and 10,000+ documents. How can I assist you today?
          </div>
        </div>
        <div className="chat-input" style={{ padding: '0' }}>
          <input type="text" placeholder="e.g., 'Summarize the risk profile of Alpha Mining across all their bids'" style={{ width: '100%', padding: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }} />
          <button className="btn btn-primary" onClick={() => showToast('Generating AI Response...', 'info')}>Send</button>
        </div>
      </div>
    </div>
  );
};

// 9. Knowledge Graph
export const KnowledgeGraph = () => {
  return (
    <div className="glass-card animate-fade-in" style={{ padding: '2rem' }}>
      <PageHeader title="Vendor Intelligence Graph" icon={Network} />
      <div style={{ height: '400px', background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <Network size={200} color="rgba(59, 130, 246, 0.2)" style={{ position: 'absolute' }} />
        <div style={{ position: 'absolute', top: '20%', left: '20%', padding: '1rem', background: 'var(--danger)', borderRadius: '50px' }}>Director A</div>
        <div style={{ position: 'absolute', top: '50%', left: '40%', padding: '1rem', background: 'var(--accent-primary)', borderRadius: '50px' }}>Vendor 1</div>
        <div style={{ position: 'absolute', top: '20%', left: '60%', padding: '1rem', background: 'var(--accent-primary)', borderRadius: '50px' }}>Vendor 2</div>
        <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
          <line x1="25%" y1="25%" x2="45%" y2="50%" stroke="var(--danger)" strokeWidth="2" strokeDasharray="5,5" />
          <line x1="25%" y1="25%" x2="65%" y2="25%" stroke="var(--danger)" strokeWidth="2" strokeDasharray="5,5" />
        </svg>
        <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(0,0,0,0.5)', padding: '1rem', borderRadius: '8px' }}>
          <h4 style={{ color: 'var(--danger)' }}>Cartel Alert Active</h4>
          <p style={{ fontSize: '0.85rem' }}>Overlapping directorship detected between competing vendors.</p>
        </div>
      </div>
    </div>
  );
};

// 10. Workflow Engine
export const WorkflowEngine = () => {
  const { showToast } = useToast();
  return (
    <div className="glass-card animate-fade-in" style={{ padding: '2rem' }}>
      <PageHeader title="Workflow Orchestrator" icon={GitMerge} actionLabel="New Pipeline" onAction={() => showToast('Opening Orchestrator Canvas...', 'info')} />
      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 1, padding: '1.5rem', background: 'var(--glass-bg)', borderRadius: '8px' }}>
          <h4 style={{ marginBottom: '1rem' }}>Standard Evaluation Pipeline</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div className="badge success">1. Document Ingestion</div>
            <div style={{ alignSelf: 'center', color: 'var(--text-secondary)' }}>↓</div>
            <div className="badge success">2. OCR Extraction</div>
            <div style={{ alignSelf: 'center', color: 'var(--text-secondary)' }}>↓</div>
            <div className="badge primary">3. AI Technical Eval</div>
            <div style={{ alignSelf: 'center', color: 'var(--text-secondary)' }}>↓</div>
            <div className="badge">4. Committee Approval</div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ marginBottom: '1rem' }}>Engine Status</h3>
          <p style={{ color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={18} /> Orchestrator Healthy</p>
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Jobs Running: 45</p>
          <p style={{ color: 'var(--text-secondary)' }}>Jobs Queued: 12</p>
        </div>
      </div>
    </div>
  );
};

// 11. Reports & Analytics
export const ReportsAnalytics = () => {
  const { showToast } = useToast();
  return (
    <div className="glass-card animate-fade-in" style={{ padding: '2rem' }}>
      <PageHeader title="BI Reports & Analytics" icon={LineChart} actionLabel="Create Custom Report" onAction={() => showToast('Opening Report Builder...', 'info')} />
      <div className="stats-grid">
        <div style={{ padding: '2rem', background: 'var(--glass-bg)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
          <LineChart size={48} color="var(--accent-primary)" style={{ marginBottom: '1rem' }} />
          <h3>Turnaround Time Analysis</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Avg eval time reduced by 85% post-AI adoption.</p>
          <button className="btn btn-outline" style={{ marginTop: '1rem' }} onClick={() => showToast('Report Downloaded!', 'success')}><Download size={14} style={{marginRight:'0.5rem'}}/> PDF</button>
        </div>
        <div style={{ padding: '2rem', background: 'var(--glass-bg)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
          <FileSpreadsheet size={48} color="var(--success)" style={{ marginBottom: '1rem' }} />
          <h3>Savings & Budget Variance</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Historical tracking of L1 vs Estimated Cost.</p>
          <button className="btn btn-outline" style={{ marginTop: '1rem' }} onClick={() => showToast('Data Exported!', 'success')}><Download size={14} style={{marginRight:'0.5rem'}}/> Excel</button>
        </div>
      </div>
    </div>
  );
};

// 12. Administration
export const Administration = () => {
  const { showToast } = useToast();
  return (
    <div className="glass-card animate-fade-in" style={{ padding: '2rem' }}>
      <PageHeader title="System Administration" icon={Settings} />
      <div className="table-container">
        <table>
          <thead><tr><th>Setting Group</th><th>Description</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            <tr><td>Role-Based Access (RBAC)</td><td>Manage users, roles, and permissions</td><td><span className="badge success">Active</span></td><td><button className="btn btn-outline" style={{padding:'0.25rem 0.75rem'}} onClick={() => showToast('Opening RBAC Panel', 'info')}>Configure</button></td></tr>
            <tr><td>LLM Configuration</td><td>Manage OpenAI/Azure API keys and thresholds</td><td><span className="badge primary">Connected</span></td><td><button className="btn btn-outline" style={{padding:'0.25rem 0.75rem'}} onClick={() => showToast('Opening Provider Config', 'info')}>Configure</button></td></tr>
            <tr><td>e-Procurement Integration</td><td>API links to GeM and NIC portals</td><td><span className="badge warning">Sandboxed</span></td><td><button className="btn btn-outline" style={{padding:'0.25rem 0.75rem'}} onClick={() => showToast('Opening NIC Gateway', 'info')}>Configure</button></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
