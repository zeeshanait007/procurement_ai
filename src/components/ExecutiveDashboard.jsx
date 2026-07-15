import React from 'react';
import { useNavigate } from 'react-router-dom';
import { platformStats, mockTenders } from '../mockPlatformData';
import { TrendingUp, FileCheck, AlertCircle, ShieldAlert, Banknote, Users } from 'lucide-react';

import { StatCard } from './StatCard';

const ExecutiveDashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <StatCard label="Total Tenders Monitored" value={platformStats.totalTenders} icon={<FileCheck size={28} />} trend={5} delay="delay-1" description="The total number of Notice Inviting Tenders (NITs) currently being tracked and evaluated by the system." />
        <StatCard label="Total Vendors Analyzed" value={platformStats.totalVendors} icon={<Users size={28} />} trend={12} delay="delay-1" color="success" description="Number of unique vendor profiles dynamically scanned and scored across all active bids." />
        <StatCard label="Documents Processed (OCR/AI)" value={(platformStats.totalDocumentsProcessed).toLocaleString()} icon={<TrendingUp size={28} />} trend={45} delay="delay-2" description="Total pages of technical bids, certifications, and compliance documents processed through OCR." />
        <StatCard label="Active Cartel / Risk Alerts" value={platformStats.activeCartelAlerts} icon={<ShieldAlert size={28} />} trend={-2} delay="delay-2" color="danger" description="High-priority warnings regarding potential collusion, overlapping directorships, or bidding anomalies." />
        <StatCard label="Overall System Accuracy" value={platformStats.systemAccuracy} icon={<AlertCircle size={28} />} trend={1.2} delay="delay-3" color="success" description="Confidence metric of the AI Engine across all recent extractions and semantic evaluations." />
        <StatCard label="Automated Cost Savings" value={platformStats.automatedSavings} icon={<Banknote size={28} />} trend={22} delay="delay-3" color="success" description="Estimated monetary savings achieved via automated market benchmarking and price justification." />
      </div>

      <div className="glass-card animate-fade-in delay-3" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Active Tender Workflows</h2>
          <button className="btn btn-outline" onClick={() => navigate('/tenders')}>View All (300)</button>
        </div>
        
        <div className="table-container">
          <table style={{ tableLayout: 'fixed', width: '100%' }}>
            <thead>
              <tr>
                <th style={{ width: '12%' }}>Tender Reference</th>
                <th style={{ width: '30%' }}>Name of Work</th>
                <th style={{ width: '12%' }}>Budget (Est.)</th>
                <th style={{ width: '8%', textAlign: 'center' }}>Bids</th>
                <th style={{ width: '23%', textAlign: 'center' }}>AI Evaluation Status</th>
                <th style={{ width: '15%', textAlign: 'right' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {mockTenders.map((tender, i) => (
                <tr key={tender.id}>
                  <td style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{tender.id}</td>
                  <td style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={tender.name}>{tender.name}</td>
                  <td style={{ color: 'var(--success)', fontWeight: '500' }}>{tender.budget}</td>
                  <td style={{ textAlign: 'center', fontWeight: '500' }}>{tender.bids}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span className={`badge ${tender.aiEvalStatus.includes('Complete') ? 'success' : tender.aiEvalStatus.includes('Pending') ? 'warning' : 'danger'}`} style={{ whiteSpace: 'nowrap' }}>
                      {tender.aiEvalStatus}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button 
                      className="btn btn-primary" 
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                      onClick={() => navigate(`/ai-engine`)}
                    >
                      View AI Audit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveDashboard;
