import React from 'react';

export const StatCard = ({ label, value, icon, trend, delay, color = 'primary', description, compact = false }) => {
  const getGradient = () => {
    switch(color) {
      case 'success': return 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.05))';
      case 'danger': return 'linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.05))';
      case 'warning': return 'linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.05))';
      default: return 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.05))';
    }
  };

  const getBorderColor = () => {
    switch(color) {
      case 'success': return 'rgba(16, 185, 129, 0.5)';
      case 'danger': return 'rgba(239, 68, 68, 0.5)';
      case 'warning': return 'rgba(245, 158, 11, 0.5)';
      default: return 'rgba(59, 130, 246, 0.5)';
    }
  };

  return (
    <div className={`glass-card stat-item animate-fade-in ${delay}`} style={{ 
      position: 'relative', 
      padding: compact ? '1.25rem' : '2rem', 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '1rem',
      background: getGradient(),
      boxShadow: `0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -2px 10px ${getBorderColor()}`,
      border: `1px solid ${getBorderColor()}`,
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      borderRadius: '12px',
      overflow: 'visible'
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', borderRadius: 'inherit', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', top: '-20px', right: '-20px', opacity: 0.1, transform: 'scale(2.5)' }}>
          {icon}
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', zIndex: 1 }}>
        <div>
          <div className="stat-label" style={{ color: 'var(--text-secondary)', fontSize: compact ? '0.9rem' : '1rem', letterSpacing: '1px', marginBottom: '0.5rem' }}>{label}</div>
          <div className="stat-value" style={{ fontSize: compact ? '2.25rem' : '3rem', fontWeight: '800', lineHeight: '1', color: 'var(--text-primary)' }}>{value}</div>
        </div>
        <div className="custom-tooltip-container" style={{ color: `var(--${color === 'primary' ? 'accent-primary' : color})`, padding: '0.75rem', background: `rgba(255,255,255,0.8)`, borderRadius: '12px', backdropFilter: 'blur(8px)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', cursor: description ? 'help' : 'default' }}>
          {icon}
          {description && <div className="custom-tooltip">{description}</div>}
        </div>
      </div>
      
      {(trend !== undefined && trend !== null) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', zIndex: 1, marginTop: 'auto' }}>
          <span className={`badge ${trend > 0 ? 'success' : trend < 0 ? 'danger' : 'primary'}`} style={{ fontSize: '0.85rem', padding: '0.25rem 0.5rem' }}>
            {trend > 0 ? '↑' : trend < 0 ? '↓' : ''} {Math.abs(trend)}%
          </span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>vs last month</span>
        </div>
      )}
    </div>
  );
};
