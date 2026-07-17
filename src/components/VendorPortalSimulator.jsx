import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, FileText, Lock, ArrowRight, ShieldCheck, PlayCircle, Loader2 } from 'lucide-react';

const VendorPortalSimulator = () => {
  const [step, setStep] = useState(1); // 1: List, 2: Upload, 3: Sign, 4: Success

  // Theme overrides for public portal look (Light Theme)
  const portalStyles = {
    background: '#f8fafc',
    color: '#0f172a',
    minHeight: '100%',
    padding: '2rem',
    borderRadius: '12px',
    fontFamily: '"Plus Jakarta Sans", sans-serif'
  };

  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    padding: '2rem'
  };

  const handleUploadClick = () => {
    setStep(3);
  };

  const handleSignAndSubmit = () => {
    setStep(4);
    setTimeout(() => {
      setStep(5); // Success state
    }, 3000); // 3 second API simulation
  };

  return (
    <div style={portalStyles} className="animate-fade-in">
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <img src="/SECL_logo.svg" alt="SECL Logo" style={{ height: '50px' }} />
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', margin: 0 }}>Coal India e-Procurement Portal</h1>
            <p style={{ color: '#64748b', fontSize: '0.9rem', margin: 0 }}>Public Vendor Gateway</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ color: '#0f172a', fontWeight: '600' }}>XYZ Mining Equipments Ltd.</span>
          <div style={{ background: '#e2e8f0', padding: '0.5rem 1rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: '600' }}>Vendor ID: VEND-9921</div>
        </div>
      </div>

      {/* Step 1: Tender List */}
      {step === 1 && (
        <div style={cardStyle} className="animate-fade-in">
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#0f172a' }}>Active Tenders (NITs) Open for Bidding</h2>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
                <th style={{ padding: '1rem' }}>Tender Reference</th>
                <th style={{ padding: '1rem' }}>Work Description</th>
                <th style={{ padding: '1rem' }}>Closing Date</th>
                <th style={{ padding: '1rem' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '1rem', fontWeight: '600', color: '#2563eb' }}>NIT/2026/001</td>
                <td style={{ padding: '1rem' }}>Supply of Heavy Earth Moving Machinery Spares</td>
                <td style={{ padding: '1rem', color: '#dc2626', fontWeight: '500' }}>Today, 17:00 IST</td>
                <td style={{ padding: '1rem' }}>
                  <button onClick={() => setStep(2)} style={{ background: '#2563eb', color: 'white', border: 'none', padding: '0.5rem 1.25rem', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>Submit Bid</button>
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '1rem', fontWeight: '600', color: '#2563eb' }}>NIT/2026/012</td>
                <td style={{ padding: '1rem' }}>IT Infrastructure Upgrade Phase IV</td>
                <td style={{ padding: '1rem' }}>24-08-2026</td>
                <td style={{ padding: '1rem' }}>
                  <button style={{ background: '#e2e8f0', color: '#64748b', border: 'none', padding: '0.5rem 1.25rem', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}>Drafting...</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Step 2: Upload Documents */}
      {step === 2 && (
        <div style={cardStyle} className="animate-fade-in">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: '#64748b', cursor: 'pointer' }} onClick={() => setStep(1)}>
            <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} /> Back to Tenders
          </div>
          
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', color: '#0f172a' }}>Submit Bid: NIT/2026/001</h2>
          <p style={{ color: '#64748b', marginBottom: '2rem' }}>Please upload all required technical and commercial documents in PDF format.</p>

          <div style={{ border: '2px dashed #cbd5e1', borderRadius: '12px', padding: '3rem', textAlign: 'center', background: '#f8fafc', cursor: 'pointer' }} onClick={handleUploadClick}>
            <UploadCloud size={48} color="#2563eb" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ fontSize: '1.1rem', color: '#0f172a', fontWeight: '600', marginBottom: '0.5rem' }}>Click to Upload Bid Documents (.ZIP / .PDF)</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Includes Technical Spec Sheets, ISO Certs, Audit Reports, and EMD Details</p>
          </div>
        </div>
      )}

      {/* Step 3: Digitally Sign */}
      {step === 3 && (
        <div style={cardStyle} className="animate-fade-in">
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#0f172a' }}>Authenticate & Sign Submission</h2>
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', padding: '1rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', color: '#166534', marginBottom: '2rem' }}>
            <FileText size={24} />
            <div>
              <strong>Bid_Submission_XYZ_Mining.zip (45.2 MB)</strong>
              <div style={{ fontSize: '0.85rem' }}>340 pages successfully uploaded and ready for signature.</div>
            </div>
          </div>

          <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Lock size={18} /> Class 3 Digital Signature Certificate (DSC) Required</h3>
            <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '1rem' }}>Please insert your USB crypto token to digitally sign the bid packets securely.</p>
            <button onClick={handleSignAndSubmit} style={{ background: '#2563eb', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '6px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldCheck size={18} /> Digitally Sign & Submit to SECL
            </button>
          </div>
        </div>
      )}

      {/* Step 4: API Handoff Simulation */}
      {step === 4 && (
        <div style={{ ...cardStyle, textAlign: 'center', padding: '4rem 2rem' }} className="animate-fade-in">
          <Loader2 size={48} className="animate-spin" color="#2563eb" style={{ margin: '0 auto 1.5rem auto' }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#0f172a', marginBottom: '1rem' }}>Transmitting to SECL AI Evaluator...</h2>
          <p style={{ color: '#64748b', fontSize: '1rem', maxWidth: '500px', margin: '0 auto' }}>
            Your encrypted bid is being securely pushed via API to the internal SECL Procurement platform. 
            The Document Intelligence Engine is automatically unzipping and indexing your 340 pages...
          </p>
        </div>
      )}

      {/* Step 5: Success */}
      {step === 5 && (
        <div style={{ ...cardStyle, textAlign: 'center', padding: '4rem 2rem' }} className="animate-fade-in">
          <CheckCircle2 size={64} color="#16a34a" style={{ margin: '0 auto 1.5rem auto' }} />
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: '#16a34a', marginBottom: '1rem' }}>Bid Successfully Submitted!</h2>
          <p style={{ color: '#475569', fontSize: '1rem', maxWidth: '500px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
            Your bid for NIT/2026/001 has been securely received by SECL. 
            The internal AI engine has already parsed your documents and generated an automated pre-qualification report for the procurement officers.
          </p>
          <button onClick={() => setStep(1)} style={{ background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', padding: '0.75rem 1.5rem', borderRadius: '6px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}>
            Return to Dashboard
          </button>
        </div>
      )}

    </div>
  );
};

export default VendorPortalSimulator;
