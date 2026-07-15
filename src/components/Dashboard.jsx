import React from 'react';
import { useNavigate } from 'react-router-dom';
import { mockDashboardStats, mockRecentTenders } from '../mockData';
import { TrendingUp, Clock, FileCheck, AlertCircle, ShieldAlert } from 'lucide-react';

const StatCard = ({ label, value, icon, trend, delay }) => (
  <div className={`glass-card stat-item animate-fade-in ${delay}`}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <div className="stat-label">{label}</div>
        <div className="stat-value">{value}</div>
      </div>
      <div style={{ color: 'var(--accent-primary)', padding: '0.5rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '12px' }}>
        {icon}
      </div>
    </div>
    <div className={`stat-change ${trend > 0 ? 'positive' : trend < 0 ? 'negative' : ''}`}>
      {trend > 0 ? '+' : ''}{trend}% from last month
    </div>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Evaluation Complete': return 'badge success';
      case 'Evaluation in Progress': return 'badge primary';
      case 'Pending Evaluation': return 'badge warning';
      case 'Shortfall Requested': return 'badge danger';
      default: return 'badge';
    }
  };

  const getRiskBadge = (risk) => {
    switch(risk) {
      case 'Low': return <span className="risk-badge risk-low"><ShieldAlert size={12}/> Low Risk</span>;
      case 'Medium': return <span className="risk-badge risk-medium"><ShieldAlert size={12}/> Med Risk</span>;
      case 'High': return <span className="risk-badge risk-high"><ShieldAlert size={12}/> High Risk</span>;
      default: return null;
    }
  }

  // Adding mock risk scores dynamically to recent tenders for demonstration
  const tendersWithRisk = mockRecentTenders.map((tender, i) => {
    let risk = 'Low';
    if (i === 1) risk = 'Medium';
    if (i === 2) risk = 'High';
    return { ...tender, risk };
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="stats-grid">
        <StatCard 
          label="Total Tenders Processed" 
          value={mockDashboardStats.totalTenders} 
          icon={<FileCheck size={24} />} 
          trend={12} 
          delay="delay-1" 
        />
        <StatCard 
          label="Total Bids Evaluated" 
          value={mockDashboardStats.bidsProcessed} 
          icon={<TrendingUp size={24} />} 
          trend={18} 
          delay="delay-1" 
        />
        <StatCard 
          label="Avg Processing Time" 
          value={mockDashboardStats.avgProcessingTime} 
          icon={<Clock size={24} />} 
          trend={-15} 
          delay="delay-2" 
        />
        <StatCard 
          label="System Accuracy" 
          value={mockDashboardStats.accuracyRate} 
          icon={<AlertCircle size={24} />} 
          trend={2} 
          delay="delay-2" 
        />
      </div>

      <div className="glass-card animate-fade-in delay-3" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Recent Tenders (AI Risk Monitored)</h2>
          <button className="btn btn-outline" onClick={() => alert("Loading all tenders...")}>View All</button>
        </div>
        
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Tender Reference</th>
                <th>Name of Work</th>
                <th>Category</th>
                <th>Bids Received</th>
                <th>AI Risk Score</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tendersWithRisk.map((tender) => (
                <tr key={tender.id}>
                  <td style={{ fontWeight: '500' }}>{tender.id}</td>
                  <td>{tender.name}</td>
                  <td>
                    <span style={{ color: 'var(--text-secondary)' }}>{tender.category}</span>
                  </td>
                  <td>{tender.bids} Bids</td>
                  <td>{getRiskBadge(tender.risk)}</td>
                  <td>
                    <span className={getStatusBadge(tender.status)}>{tender.status}</span>
                  </td>
                  <td>
                    <button 
                      className="btn btn-primary" 
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}
                      onClick={() => navigate(`/eval/${tender.id.replace(/\//g, '-')}`)}
                    >
                      Evaluate
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

export default Dashboard;
