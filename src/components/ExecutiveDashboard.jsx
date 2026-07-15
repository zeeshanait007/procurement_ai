import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { platformStats, mockTenders } from '../mockPlatformData';
import { TrendingUp, FileCheck, AlertCircle, ShieldAlert, Banknote, Users } from 'lucide-react';

import { StatCard } from './StatCard';

const ExecutiveDashboard = () => {
  const navigate = useNavigate();
  const [timeFilter, setTimeFilter] = useState('Month');
  
  const getMultiplier = () => {
    switch(timeFilter) {
      case 'Day': return 0.03;
      case 'Week': return 0.25;
      case 'Month': return 1;
      case 'Year': return 12;
      default: return 1;
    }
  };
  const m = getMultiplier();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Dashboard Header with Time Filter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>Executive Overview</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Real-time procurement metrics and AI insights</p>
        </div>
        
        {/* Segmented Control */}
        <div style={{ display: 'flex', background: 'var(--glass-border)', padding: '0.25rem', borderRadius: '8px' }}>
          {['Day', 'Week', 'Month', 'Year'].map(tf => (
            <button
              key={tf}
              onClick={() => setTimeFilter(tf)}
              style={{
                background: timeFilter === tf ? 'var(--bg-secondary)' : 'transparent',
                color: timeFilter === tf ? 'var(--accent-primary)' : 'var(--text-secondary)',
                fontWeight: timeFilter === tf ? '600' : '500',
                boxShadow: timeFilter === tf ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                border: 'none',
                padding: '0.4rem 1rem',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '0.85rem'
              }}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        <StatCard label="Tenders Monitored" value={Math.round(platformStats.totalTenders * m)} icon={<FileCheck size={28} />} trend={5} delay="delay-1" description={`Notice Inviting Tenders tracked this ${timeFilter.toLowerCase()}.`} />
        <StatCard label="Vendors Analyzed" value={Math.round(platformStats.totalVendors * m)} icon={<Users size={28} />} trend={12} delay="delay-1" color="success" description={`Vendor profiles dynamically scanned this ${timeFilter.toLowerCase()}.`} />
        <StatCard label="Documents Processed" value={Math.round(platformStats.totalDocumentsProcessed * m).toLocaleString()} icon={<TrendingUp size={28} />} trend={45} delay="delay-2" description={`Total pages processed through OCR this ${timeFilter.toLowerCase()}.`} />
        <StatCard label="Cartel Alerts" value={Math.max(1, Math.round(platformStats.activeCartelAlerts * m))} icon={<ShieldAlert size={28} />} trend={-2} delay="delay-2" color="danger" description={`High-priority collusion warnings this ${timeFilter.toLowerCase()}.`} />
        <StatCard label="System Accuracy" value={platformStats.systemAccuracy} icon={<AlertCircle size={28} />} trend={1.2} delay="delay-3" color="success" description="Confidence metric of the AI Engine across all semantic evaluations." />
        <StatCard label="Cost Savings (Est.)" value={`₹${Math.round(parseFloat(platformStats.automatedSavings.replace(/[^0-9.]/g, '')) * m)} Cr`} icon={<Banknote size={28} />} trend={22} delay="delay-3" color="success" description={`Estimated monetary savings achieved this ${timeFilter.toLowerCase()}.`} />
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
