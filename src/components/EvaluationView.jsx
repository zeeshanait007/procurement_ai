import React, { useState } from 'react';
import { mockDocumentText, mockEvaluationCriteria } from '../mockData';
import { CheckCircle2, XCircle, FileSearch, Save, Send, FileWarning, Search, Info, Bot, Brain, Sparkles, Mail, CalendarClock, TrendingDown, ShieldAlert, FileMinus, List, Map, ChevronRight } from 'lucide-react';
import { useToast, useModal } from '../App';

const EvaluationView = () => {
  const [selectedVendorId, setSelectedVendorId] = useState('v1');
  
  const VENDORS = {
    "v1": {
      name: "XYZ Mining Equipments",
      text: mockDocumentText,
      criteria: mockEvaluationCriteria,
    },
    "v2": {
      name: "ABC Corp Ltd.",
      text: mockDocumentText.replace("XYZ Mining Equipments Pvt. Ltd.", "ABC Corp Ltd.").replace("₹55.23 Crores", "₹45.10 Crores").replace("Dec 2027", "Jan 2025 (Expired)"),
      criteria: mockEvaluationCriteria.map(c => {
        if(c.id === 'c1') return {...c, extracted: "₹45.10 Crores", status: "Failed", confidence: 99};
        if(c.id === 'c3') return {...c, extracted: "Expired Jan 2025", status: "Failed", shortfall: true};
        return c;
      })
    },
    "v3": {
      name: "Global Heavy Industries",
      text: mockDocumentText.replace("XYZ Mining Equipments Pvt. Ltd.", "Global Heavy Industries").replace("₹55.23 Crores", "₹120.5 Crores").replace("22AAAAA0000A1Z5", "[NOT FOUND]"),
      criteria: mockEvaluationCriteria.map(c => {
        if(c.id === 'c1') return {...c, extracted: "₹120.5 Crores", status: "Met"};
        if(c.id === 'c2') return {...c, extracted: "Missing from bid", status: "Failed", shortfall: true};
        return c;
      })
    }
  };

  const activeVendor = VENDORS[selectedVendorId];
  const [anomalyScannerActive, setAnomalyScannerActive] = useState(false);
  const [activeDocumentSection, setActiveDocumentSection] = useState('Financials (Q1-Q4)');
  const { showToast } = useToast();
  const { showModal, closeModal } = useModal();

  const openBrainTrace = (criteria) => {
    const modalBody = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem 0' }}>
        <h4 style={{ color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Brain size={20} /> AI Extraction Reasoning Trace
        </h4>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Trace for: {criteria.title}</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative' }}>
          <div style={{ position: 'absolute', top: '10px', bottom: '10px', left: '15px', width: '2px', background: 'var(--glass-border)' }}></div>
          
          <div className="trace-step animate-fade-in delay-1" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', zIndex: 1 }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '16px', background: 'var(--bg-secondary)', border: '2px solid var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>1</div>
            <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '8px', flex: 1, border: '1px solid var(--glass-border)' }}>
              <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Document Ingestion</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Parsed 42 pages. Detected 3 embedded images.</div>
            </div>
          </div>

          <div className="trace-step animate-fade-in delay-2" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', zIndex: 1 }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '16px', background: 'var(--bg-secondary)', border: '2px solid var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>2</div>
            <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '8px', flex: 1, border: '1px solid var(--glass-border)' }}>
              <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>OCR & Table Parsing</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Executed LayoutLMv3. Found financial table on Page {criteria.source.replace('Page ', '')}.</div>
            </div>
          </div>

          <div className="trace-step animate-fade-in delay-3" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', zIndex: 1 }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '16px', background: 'var(--bg-secondary)', border: '2px solid var(--warning)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>3</div>
            <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '8px', flex: 1, border: '1px solid var(--glass-border)' }}>
              <div style={{ fontWeight: '600', marginBottom: '0.25rem', color: 'var(--warning)' }}>Semantic Match</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Compared requirement "{criteria.required}" against text. Match Score: {criteria.confidence}.</div>
            </div>
          </div>

          <div className="trace-step animate-fade-in delay-4" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', zIndex: 1 }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '16px', background: 'var(--bg-secondary)', border: '2px solid var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>4</div>
            <div style={{ background: 'rgba(34, 197, 94, 0.1)', padding: '1rem', borderRadius: '8px', flex: 1, border: '1px solid var(--success)' }}>
              <div style={{ fontWeight: '600', marginBottom: '0.25rem', color: 'var(--success)' }}>Value Extracted</div>
              <div style={{ fontSize: '1rem', fontWeight: '500' }}>{criteria.extracted}</div>
            </div>
          </div>

        </div>
      </div>
    );
    showModal('Explainable AI (XAI) Trace', modalBody, <button className="btn btn-outline" onClick={closeModal}>Close Trace</button>, '650px');
  };

  const handleDraftEmail = () => {
    const modalBody = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p style={{ color: 'var(--text-secondary)' }}>AI has drafted the following clarification email based on the detected ambiguity.</p>
        <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)', fontFamily: 'monospace', fontSize: '0.9rem', color: 'var(--text-primary)' }}>
          <strong>To:</strong> compliance@xyzmining.com<br/>
          <strong>Subject:</strong> Clarification Required: NIT/2026/001 - Financial Turnover<br/><br/>
          Dear Vendor,<br/><br/>
          During the AI-assisted evaluation of your bid for NIT/2026/001, an ambiguity was detected in your submitted Balance Sheet for FY 2024-25.<br/><br/>
          Specifically, the stated turnover of ₹14.5 Cr does not reconcile with Schedule 4 of the attached auditor's report. Please provide a clarified schedule within 48 hours to proceed with the technical evaluation.<br/><br/>
          Regards,<br/>
          SECL Procurement AI
        </div>
      </div>
    );
    showModal('Draft Email: Financial Clarification', modalBody, <><button className="btn btn-outline" onClick={handleViewAllRecommendations}>Discard</button><button className="btn btn-primary" onClick={() => { handleViewAllRecommendations(); showToast('Email Sent!', 'success'); }}><Send size={16} style={{marginRight: '8px'}} />Send via Portal</button></>);
  };

  const handleFlagRenewal = () => {
    const modalBody = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Automated notification drafted for vendor certificate renewal.</p>
        <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontWeight: '600' }}>ISO 9001:2015 Quality Management</span>
            <span className="badge danger">Expires: 30-Jul-2026</span>
          </div>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>The AI will send a strict warning to the vendor portal alerting them that failure to renew this certificate within 15 days will result in automated disqualification of active NIT/2026/001 bids.</p>
        </div>
      </div>
    );
    showModal('Flag for Certificate Renewal', modalBody, <><button className="btn btn-outline" onClick={handleViewAllRecommendations}>Cancel</button><button className="btn btn-primary" onClick={() => { handleViewAllRecommendations(); showToast('Renewal Flag Sent', 'success'); }}>Send Warning</button></>);
  };

  const handleRequestUpload = () => {
    const modalBody = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid var(--accent-primary)', borderRadius: '8px' }}>
          <h4 style={{ color: 'var(--accent-primary)', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FileSearch size={18} /> Document Missing</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-primary)' }}>Clause 5.1 strictly mandates the upload of a notarized <strong>EPF/ESIC Compliance Affidavit</strong>. The AI Engine scanned all 42 uploaded files and could not detect any matching document.</p>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>The system will open a 48-hour document upload window for the vendor to submit this specific affidavit.</p>
      </div>
    );
    showModal('Request Missing Document', modalBody, <><button className="btn btn-outline" onClick={handleViewAllRecommendations}>Cancel</button><button className="btn btn-primary" onClick={() => { handleViewAllRecommendations(); showToast('Upload request sent.', 'success'); }}>Open Upload Window</button></>);
  };

  const handleViewMarketComp = () => {
    const modalBody = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Comparing XYZ Mining's quoted price for "Heavy Earth Moving Machinery (HEMM)" against historical awards.</p>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyItems: 'center', gap: '2rem', height: '150px', padding: '1rem', background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ height: '120px', width: '60px', background: 'var(--glass-border)', borderRadius: '4px' }}></div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Avg 2024 (₹42L)</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ height: '130px', width: '60px', background: 'var(--glass-border)', borderRadius: '4px' }}></div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Avg 2025 (₹45L)</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ height: '40px', width: '60px', background: 'var(--warning)', borderRadius: '4px' }}></div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 'bold' }}>XYZ Quote (₹14L)</span>
          </div>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--warning)', margin: 0 }}><strong>Risk Assessment:</strong> Price is suspiciously low (approx 68% below median). High probability of poor quality delivery or subsequent contract abandonment. Recommended action: Request detailed cost breakdown before proceeding.</p>
      </div>
    );
    showModal('Market Price Comparison', modalBody, <button className="btn btn-outline" onClick={handleViewAllRecommendations}>Back to Recommendations</button>);
  };

  const handleEscalateVigilance = () => {
    const modalBody = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--danger)', borderRadius: '8px' }}>
          <h4 style={{ color: 'var(--danger)', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ShieldAlert size={18} /> Cartel Network Match</h4>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-primary)' }}>The AI Knowledge Graph has identified a direct structural link between <strong>XYZ Mining Equipments</strong> and <strong>Alpha Logistics (Blacklisted 2023)</strong>.</p>
        </div>
        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <strong>Shared Attributes Detected:</strong>
          <ul style={{ paddingLeft: '1.2rem', marginTop: '0.25rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <li>Director <strong>'Jane Smith'</strong> is common to both entities.</li>
            <li>Registered business address matches perfectly.</li>
            <li>Bid submission IP address <strong>(192.168.1.104)</strong> is identical.</li>
          </ul>
        </div>
        <div>
          <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Escalation Notes</label>
          <textarea style={{ width: '100%', minHeight: '80px', padding: '0.75rem', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', borderRadius: '6px', marginTop: '0.25rem' }} defaultValue="System triggered auto-match for blacklisted entity. Suspected dummy corporation. Requesting immediate vigilance block on NIT/2026/001."></textarea>
        </div>
      </div>
    );
    showModal('Escalate to Vigilance', modalBody, <><button className="btn btn-outline" onClick={handleViewAllRecommendations}>Cancel</button><button className="btn btn-primary" style={{ background: 'var(--danger)', borderColor: 'var(--danger)' }} onClick={() => { handleViewAllRecommendations(); showToast('Case escalated to Chief Vigilance Officer.', 'success'); }}>Submit Escalation</button></>);
  };

  const handleViewAllRecommendations = () => {
    const modalBody = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        
        {/* Rec 1 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--glass-bg)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <Mail size={18} style={{ color: 'var(--warning)', marginTop: '2px' }} />
            <div>
              <div style={{ fontWeight: '600', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>Ask Vendor for Clarification</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Ambiguous Financial Turnover figures detected in the attached Balance Sheet.</div>
            </div>
          </div>
          <button className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }} onClick={handleDraftEmail}>Draft Email</button>
        </div>

        {/* Rec 2 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--glass-bg)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <CalendarClock size={18} style={{ color: 'var(--danger)', marginTop: '2px' }} />
            <div>
              <div style={{ fontWeight: '600', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>Certificate Expiry Alert</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>ISO 9001 Certificate expires in 15 days.</div>
            </div>
          </div>
          <button className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }} onClick={handleFlagRenewal}>Flag for Renewal</button>
        </div>

        {/* Rec 3 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--glass-bg)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <FileMinus size={18} style={{ color: 'var(--danger)', marginTop: '2px' }} />
            <div>
              <div style={{ fontWeight: '600', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>Missing Mandatory Document</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Missing mandatory EPF/ESIC affidavit required by Clause 5.1.</div>
            </div>
          </div>
          <button className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }} onClick={handleRequestUpload}>Request Upload</button>
        </div>

        {/* Rec 4 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--glass-bg)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <TrendingDown size={18} style={{ color: 'var(--warning)', marginTop: '2px' }} />
            <div>
              <div style={{ fontWeight: '600', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>Price Anomaly Detected</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Quoted price appears 28% below historical average. Potential underperformance risk.</div>
            </div>
          </div>
          <button className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }} onClick={handleViewMarketComp}>View Market Comp</button>
        </div>

        {/* Rec 5 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(239, 68, 68, 0.05)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--danger)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <ShieldAlert size={18} style={{ color: 'var(--danger)', marginTop: '2px' }} />
            <div>
              <div style={{ fontWeight: '600', marginBottom: '0.25rem', color: 'var(--danger)' }}>Vigilance Alert: Cartel Network</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Similar vendor structure (Overlapping Directors) was previously blacklisted in 2023.</div>
            </div>
          </div>
          <button className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', borderColor: 'var(--danger)', color: 'var(--danger)' }} onClick={handleEscalateVigilance}>Escalate to Vigilance</button>
        </div>

      </div>
    );
    showModal('AI Copilot: Recommended Actions', modalBody, <button className="btn btn-outline" onClick={closeModal}>Close</button>, '800px');
  };

  const handleOverride = (id, newStatus) => {
    setCriteria(criteria.map(c => 
      c.id === id ? { ...c, status: newStatus, overridden: true } : c
    ));
    showToast(`Criteria overridden to: ${newStatus}`, 'success');
  };

  const handleSaveEvaluation = () => {
    showToast("Evaluation saved. Immutable audit log updated.", "success");
  };

  const generateShortfallNotice = () => {
    const failed = criteria.filter(c => c.status === 'Not Met');
    if (failed.length === 0) {
      showToast("No shortfall found. All criteria are met.", "info");
      return;
    }

    let draft = `Subject: Shortfall Notice against Tender Ref: NIT/2026/001\nTo: XYZ Mining Equipments Pvt. Ltd.\n\nDear Bidder,\nDuring the evaluation of your submitted bid, the following deficiencies were observed:\n\n`;
    failed.forEach((c, idx) => { draft += `${idx + 1}. ${c.title}: ${c.required} was not found.\n`; });
    draft += `\nPlease submit these documents within 5 working days via the portal.\n\nRegards,\nTender Evaluation Committee`;

    const modalBody = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <p style={{ color: 'var(--text-secondary)' }}>The AI has drafted a shortfall notice based on the {failed.length} currently rejected criteria. You can edit it before sending.</p>
        <textarea defaultValue={draft} style={{ width: '100%', height: '250px', padding: '1rem', background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', borderRadius: '8px', fontFamily: 'monospace' }} />
      </div>
    );
    const modalActions = (
      <>
        <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
        <button className="btn btn-primary" onClick={() => { closeModal(); showToast('Shortfall Notice Sent to Vendor Portal', 'success'); }}><Send size={16} style={{marginRight: '6px'}}/> Send Notice</button>
      </>
    );
    showModal('Auto-Drafted Shortfall Notice', modalBody, modalActions, '700px');
  };

  const openVendor360Profile = () => {
    const modalBody = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', margin: '0 0 0.25rem 0', color: 'var(--text-primary)' }}>XYZ Mining Equipments</h3>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>GSTIN: 22AAAAA0000A1Z5 | Reg. Date: 12-05-2015</div>
          </div>
          <div className="badge success" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
            Compliance Score: 94/100
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={{ background: 'var(--bg-primary)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Total Bids Participated</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>42</div>
          </div>
          <div style={{ background: 'var(--bg-primary)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Win Rate</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--success)' }}>35%</div>
          </div>
          <div style={{ background: 'var(--bg-primary)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Active Tenders</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>4</div>
          </div>
          <div style={{ background: 'var(--bg-primary)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--danger)' }}>
            <div style={{ color: 'var(--danger)', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: '600' }}>Cartel Risk Alert</div>
            <div style={{ fontSize: '1rem', fontWeight: '600' }}>Overlapping Director (Jane Smith)</div>
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
          <h4 style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>Recent Performance</h4>
          <table style={{ width: '100%', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--text-secondary)' }}>
                <th style={{ paddingBottom: '0.5rem' }}>Tender</th>
                <th style={{ paddingBottom: '0.5rem' }}>Status</th>
                <th style={{ paddingBottom: '0.5rem' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '0.5rem 0' }}>NIT/2026/001</td>
                <td><span className="badge success">L1</span></td>
                <td>12-07-2026</td>
              </tr>
              <tr>
                <td style={{ padding: '0.5rem 0', borderTop: '1px solid var(--glass-border)' }}>NIT/2025/112</td>
                <td style={{ borderTop: '1px solid var(--glass-border)' }}><span className="badge warning">L3</span></td>
                <td style={{ borderTop: '1px solid var(--glass-border)' }}>05-02-2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
    showModal('Vendor 360 Profile', modalBody, <button className="btn btn-outline" onClick={closeModal}>Close Profile</button>, '750px');
  };

  return (
    <div style={{ display: 'flex', gap: '2rem', height: 'calc(100vh - 120px)' }}>
      
      {/* Left side: Source Document (Advanced Viewer) */}
      <div className="glass-card animate-fade-in" style={{ flex: '1.2', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* Header & Anomaly Scanner */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)', borderTopLeftRadius: '16px', borderTopRightRadius: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FileSearch size={22} className="text-accent-primary" />
            <h2 style={{ fontSize: '1.1rem', fontWeight: '600' }}>Source Document (AI Parsed)</h2>
          </div>
          <button 
            className="btn btn-outline" 
            style={{ padding: '0.4rem 1rem', fontSize: '0.85rem', borderColor: anomalyScannerActive ? 'var(--danger)' : 'var(--glass-border)', color: anomalyScannerActive ? 'var(--danger)' : 'var(--text-primary)' }}
            onClick={() => {
              setAnomalyScannerActive(!anomalyScannerActive);
              if (!anomalyScannerActive) showToast('Visual Anomaly Scanner Activated', 'warning');
            }}
          >
            <ShieldAlert size={14} style={{ marginRight: '6px' }} /> {anomalyScannerActive ? 'Scanning for Fraud...' : 'Anomaly Scanner'}
          </button>
        </div>

        {/* AI TL;DR Summary & Semantic Search */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--bg-primary)' }}>
          {/* AI Summary Box */}
          <div style={{ background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '8px', padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            <Sparkles size={20} className="text-accent-primary" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--accent-primary)', marginBottom: '0.25rem' }}>AI Executive Summary</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                <strong>340-page technical bid.</strong> All required signatures are digitally verified. <span style={{ color: 'var(--danger)', fontWeight: '600' }}>1 Anomaly Found:</span> Revenue mismatch between Q2 filing and Audit Report (page 112).
              </p>
            </div>
          </div>
          
          {/* Semantic Search Bar */}
          <div style={{ position: 'relative' }}>
            <input type="text" placeholder="Ask AI: 'Where is the warranty clause?' or search text..." style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.5rem', borderRadius: '8px', border: '1px solid var(--glass-border)', fontSize: '0.9rem', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
            <Bot size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <button style={{ position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)', background: 'var(--accent-primary)', border: 'none', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer', fontWeight: '600' }}>Find</button>
          </div>
        </div>
        
        {/* Split View: Mini-Map and Content */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          
          {/* Document Content View */}
          <div style={{ flex: 1, padding: '2rem 1.5rem', overflowY: 'auto', background: 'var(--bg-secondary)', fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: '1.8' }}>
            
            <div style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)', borderBottom: '1px dashed var(--glass-border)', paddingBottom: '0.5rem' }}>
              &gt; JUMPED TO SECTION: {activeDocumentSection.toUpperCase()}
            </div>

            {activeVendor.text.split('\n').map((line, i) => {
              // Create a slight visual difference based on section length by omitting some lines pseudo-randomly
              if ((activeDocumentSection.length + i) % 7 === 0) return null;
              
              let isAnomaly = anomalyScannerActive && (line.includes('Dec 2027') || line.includes('Jan 2025'));
              let highlight = line.includes('Crores') || line.includes('NCL Order') || line.includes('22AAAAA') || line.includes('NOT FOUND');
              
              return (
                <div key={i} className="animate-fade-in" style={{ 
                  minHeight: '1.5em', 
                  backgroundColor: highlight ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                  padding: highlight ? '0 8px' : '0',
                  borderLeft: highlight ? '3px solid var(--accent-primary)' : '3px solid transparent'
                }}>
                  {isAnomaly ? (
                    <span style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', border: '1px solid var(--danger)', padding: '2px 4px', borderRadius: '4px', position: 'relative' }} title="Warning: Font inconsistency detected. Possible document tampering.">
                      {line}
                    </span>
                  ) : line}
                </div>
              );
            })}
          </div>

          {/* Smart Mini-Map Sidebar */}
          <div style={{ width: '180px', borderLeft: '1px solid var(--glass-border)', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1rem', borderBottom: '1px solid var(--glass-border)', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Map size={14} /> Mini-Map
            </div>
            <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto' }}>
              {[
                { label: 'Cover Letter' },
                { label: 'Financials (Q1-Q4)' },
                { label: 'Audit Reports' },
                { label: 'ISO Certs' },
                { label: 'Tech Specs' },
                { label: 'Bank Guarantees' },
                { label: 'Signatures' }
              ].map((item, idx) => {
                const isActive = activeDocumentSection === item.label;
                return (
                  <div key={idx} onClick={() => setActiveDocumentSection(item.label)} style={{ 
                    fontSize: '0.85rem', 
                    color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)', 
                    fontWeight: isActive ? '600' : '400',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    borderLeft: isActive ? '2px solid var(--accent-primary)' : '2px solid transparent',
                    paddingLeft: '8px',
                    transition: 'all 0.2s',
                    marginLeft: '-1rem'
                  }}>
                    {item.label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Right side: AI Evaluation Matrix (Sleek & Simple) */}
      <div className="animate-fade-in delay-1" style={{ flex: '1.2', display: 'flex', flexDirection: 'column', gap: '1.5rem', overflowY: 'auto' }}>
        
        {/* Header Summary */}
        <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <select 
                value={selectedVendorId} 
                onChange={(e) => setSelectedVendorId(e.target.value)}
                style={{ 
                  fontSize: '1.5rem', fontWeight: '700', margin: 0, color: 'var(--text-primary)', 
                  background: 'transparent', border: '1px solid var(--glass-border)', borderRadius: '8px', 
                  padding: '0.25rem 0.5rem', cursor: 'pointer' 
                }}
              >
                <option value="v1">XYZ Mining Equipments</option>
                <option value="v2">ABC Corp Ltd.</option>
                <option value="v3">Global Heavy Industries</option>
              </select>
              <button className="btn btn-outline" style={{ padding: '0.3rem 0.75rem', fontSize: '0.8rem', borderRadius: '50px' }} onClick={openVendor360Profile}>
                <Info size={14} style={{marginRight: '6px'}} /> 360 Profile
              </button>
            </div>
            <div style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', fontWeight: '500' }}>
              <Bot size={18} className="text-accent-primary" /> AI Evaluation Complete (NIT/2026/001)
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'nowrap', alignItems: 'center' }}>
            <button className="btn btn-outline" onClick={handleViewAllRecommendations} style={{ color: 'var(--accent-primary)', borderColor: 'var(--accent-primary)', padding: '0.4rem 0.6rem', fontSize: '0.8rem', fontWeight: '600', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
              <Sparkles size={14} style={{ marginRight: '4px' }} /> AI Recommendations
            </button>
            <button className="btn btn-outline" onClick={generateShortfallNotice} style={{ color: 'var(--warning)', borderColor: 'var(--warning)', padding: '0.4rem 0.6rem', fontSize: '0.8rem', fontWeight: '600', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
              <FileWarning size={14} style={{ marginRight: '4px' }} /> Draft Shortfall
            </button>
            <button className="btn btn-primary" onClick={handleSaveEvaluation} style={{ padding: '0.4rem 0.6rem', fontSize: '0.8rem', fontWeight: '600', display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
              <Save size={14} style={{ marginRight: '4px' }} /> Save Review
            </button>
          </div>
        </div>

        {/* Criteria List (Grid Layout) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {activeVendor.criteria.map((c) => (
            <div key={c.id} className="glass-card" style={{ 
              padding: '1.5rem', 
              borderLeft: `4px solid ${c.status === 'Met' ? 'var(--success)' : 'var(--danger)'}`,
              display: 'flex', flexDirection: 'column', gap: '1.25rem'
            }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {c.title}
                    <button className="btn btn-outline" style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem', color: 'var(--accent-primary)', borderColor: 'var(--accent-primary)' }} onClick={() => openBrainTrace(c)}>
                      <Brain size={12} style={{marginRight: '4px'}} /> Trace
                    </button>
                  </h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>Requirement: {c.required}</div>
                </div>
                <div className={`badge ${c.status === 'Met' ? 'success' : 'danger'}`} style={{ fontSize: '0.9rem', padding: '0.4rem 1rem', whiteSpace: 'nowrap' }}>
                  {c.status === 'Met' ? <CheckCircle2 size={16} style={{display:'inline', marginRight:'6px'}}/> : <XCircle size={16} style={{display:'inline', marginRight:'6px'}}/>}
                  {c.status}
                </div>
              </div>

              <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--glass-border)', flex: 1 }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>AI Extracted Data</div>
                <div style={{ fontSize: '1rem', fontWeight: '500' }}>{c.extracted}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Source: {c.source}</span>
                  <span style={{ color: c.confidence === 'High' ? 'var(--success)' : 'var(--warning)', fontWeight: '500' }}>Confidence: {c.confidence}</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--warning)', fontWeight: '600' }}>
                  {c.overridden ? '⚠️ Overridden by Human' : ''}
                </span>
                
                <div style={{ display: 'flex', gap: '0.5rem', marginLeft: 'auto' }}>
                  <button className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }} onClick={() => handleOverride(c.id, 'Met')}>Accept</button>
                  <button className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }} onClick={() => handleOverride(c.id, 'Not Met')}>Reject</button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default EvaluationView;
