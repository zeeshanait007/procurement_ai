import React, { useState } from 'react';
import { mockTenders } from '../mockPlatformData';
import { FileSpreadsheet, TrendingDown, TrendingUp, AlertCircle, Download, CheckCircle, LineChart as LineChartIcon, Stamp } from 'lucide-react';
import { useToast, useModal } from '../App';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Dynamic mock data generator based on tender
const getMockDataForTender = (tenderId) => {
  if (tenderId === 'NIT/2026/002') {
    return {
      priceData: [
        { vendor: 'Global Tech Services', quotedPrice: 11500000, estimatedCost: 12000000, status: 'L1 (Lowest)' },
        { vendor: 'NexGen Maintenance', quotedPrice: 12100000, estimatedCost: 12000000, status: 'L2' },
      ],
      marketTrend: [
        { month: 'Jan', l1Price: 11500000, steelIndex: 11000000, gemAvg: 11800000 },
        { month: 'Feb', l1Price: 11500000, steelIndex: 11200000, gemAvg: 11900000 },
        { month: 'Mar', l1Price: 11500000, steelIndex: 11500000, gemAvg: 12100000 },
      ],
      l1Vendor: 'Global Tech Services',
      variance: -4.17
    };
  }
  
  // Default data (NIT/2026/001)
  return {
    priceData: [
      { vendor: 'XYZ Mining Equipments', quotedPrice: 55000000, estimatedCost: 60000000, status: 'L1 (Lowest)' },
      { vendor: 'Alpha Heavy Industries', quotedPrice: 58500000, estimatedCost: 60000000, status: 'L2' },
      { vendor: 'Beta Contractors', quotedPrice: 62000000, estimatedCost: 60000000, status: 'L3' }
    ],
    marketTrend: [
      { month: 'Jan', l1Price: 55000000, steelIndex: 52000000, gemAvg: 54000000 },
      { month: 'Feb', l1Price: 55000000, steelIndex: 52500000, gemAvg: 54200000 },
      { month: 'Mar', l1Price: 55000000, steelIndex: 54000000, gemAvg: 54800000 },
      { month: 'Apr', l1Price: 55000000, steelIndex: 55500000, gemAvg: 55200000 },
      { month: 'May', l1Price: 55000000, steelIndex: 56800000, gemAvg: 56000000 },
      { month: 'Jun', l1Price: 55000000, steelIndex: 58000000, gemAvg: 57500000 }
    ],
    l1Vendor: 'XYZ Mining Equipments',
    variance: -8.33
  };
};

const FinanceModule = () => {
  const [selectedTender, setSelectedTender] = useState(mockTenders[0].id);
  const [approved, setApproved] = useState(false);
  const { showToast } = useToast();
  const { showModal, closeModal } = useModal();

  const data = getMockDataForTender(selectedTender);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  const handleExport = () => {
    showToast(`Generating Excel export for ${selectedTender}...`, 'info');
    setTimeout(() => {
      showToast('PCS Report Downloaded Successfully!', 'success');
    }, 1500);
  };

  const handleApprove = () => {
    const modalBody = (
      <div style={{ textAlign: 'center' }}>
        <Stamp size={48} color="var(--success)" style={{ marginBottom: '1rem' }} />
        <h4 style={{ marginBottom: '1rem' }}>Confirm L1 Approval</h4>
        <p style={{ color: 'var(--text-secondary)' }}>
          You are about to officially approve <strong>{data.l1Vendor}</strong> as the L1 vendor for {selectedTender}. This action will be logged in the Audit Workspace and the file will move to the Committee Workspace.
        </p>
      </div>
    );
    const modalActions = (
      <>
        <button className="btn btn-outline" onClick={closeModal}>Cancel</button>
        <button className="btn btn-primary" onClick={() => { 
          setApproved(true); 
          closeModal(); 
          showToast(`L1 Approved for ${selectedTender}. File moved to Committee.`, 'success'); 
        }}>Confirm & Approve</button>
      </>
    );
    showModal('Approve Commercial Recommendation', modalBody, modalActions);
  };

  return (
    <div className="finance-module animate-fade-in delay-1" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', height: '100%', overflowY: 'auto', paddingBottom: '2rem' }}>
      
      <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileSpreadsheet className="text-accent-primary" /> Finance & Pricing Intelligence
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
              <p style={{ color: 'var(--text-secondary)' }}>Select Tender:</p>
              <select 
                value={selectedTender} 
                onChange={(e) => { setSelectedTender(e.target.value); setApproved(false); }}
                style={{ padding: '0.25rem 0.5rem', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', borderRadius: '4px' }}
              >
                {mockTenders.map(t => (
                  <option key={t.id} value={t.id}>{t.id} - {t.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button className="btn btn-outline" onClick={handleExport}>
          <Download size={18} /> Export PCS Report
        </button>
      </div>

      <div className="animate-fade-in" style={{ display: 'flex', gap: '2rem' }}>
        <div className="glass-card" style={{ flex: 2, padding: '0', overflow: 'hidden' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Comparative Statement (Auto-Generated)</h3>
            <div className="badge primary" style={{ fontSize: '0.8rem' }}>AI Audited</div>
          </div>
          <div className="table-container" style={{ padding: '1rem' }}>
            <table style={{ borderCollapse: 'separate', borderSpacing: '0 8px' }}>
              <thead>
                <tr style={{ background: 'transparent' }}>
                  <th style={{ padding: '0.5rem 1rem', color: 'var(--text-secondary)' }}>Vendor Name</th>
                  <th style={{ padding: '0.5rem 1rem', color: 'var(--text-secondary)' }}>Estimated Cost</th>
                  <th style={{ padding: '0.5rem 1rem', color: 'var(--text-secondary)' }}>Quoted Price</th>
                  <th style={{ padding: '0.5rem 1rem', color: 'var(--text-secondary)' }}>Variance</th>
                  <th style={{ padding: '0.5rem 1rem', color: 'var(--text-secondary)' }}>Rank</th>
                </tr>
              </thead>
              <tbody>
                {data.priceData.map((d, i) => {
                  const varianceVal = ((d.quotedPrice - d.estimatedCost) / d.estimatedCost) * 100;
                  const isL1 = d.status.includes('L1');
                  return (
                    <tr key={i} style={{ 
                      backgroundColor: isL1 ? 'rgba(34, 197, 94, 0.05)' : 'var(--bg-primary)',
                      boxShadow: isL1 ? '0 0 0 1px var(--success) inset' : '0 0 0 1px var(--glass-border) inset',
                      transition: 'transform 0.2s ease',
                    }}>
                      <td style={{ padding: '1rem', borderRadius: '8px 0 0 8px', fontWeight: isL1 ? '600' : '500', color: isL1 ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: isL1 ? 'var(--success)' : 'var(--text-secondary)' }}></div>
                          {d.vendor}
                        </div>
                      </td>
                      <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{formatCurrency(d.estimatedCost)}</td>
                      <td style={{ padding: '1rem', fontSize: '1.1rem', fontWeight: isL1 ? '700' : '600', color: isL1 ? 'var(--success)' : 'var(--text-primary)' }}>
                        {formatCurrency(d.quotedPrice)}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span className={`badge ${varianceVal < 0 ? 'success' : 'danger'}`} style={{ padding: '0.4rem 0.75rem', fontWeight: 'bold' }}>
                          {varianceVal < 0 ? <TrendingDown size={14} style={{display:'inline'}}/> : <TrendingUp size={14} style={{display:'inline'}}/>}
                          {Math.abs(varianceVal).toFixed(2)}%
                        </span>
                      </td>
                      <td style={{ padding: '1rem', borderRadius: '0 8px 8px 0' }}>
                        {isL1 ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', fontWeight: 'bold', background: 'rgba(34, 197, 94, 0.1)', padding: '0.4rem 0.75rem', borderRadius: '4px', width: 'fit-content' }}>
                            🏆 L1 Rank
                          </div>
                        ) : (
                          <span style={{ color: 'var(--text-secondary)', fontWeight: '500', padding: '0.4rem 0.75rem' }}>{d.status}</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-card" style={{ padding: '1.5rem', borderLeft: '4px solid var(--success)', background: 'linear-gradient(145deg, rgba(34, 197, 94, 0.05), transparent)' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--success)', fontSize: '1.2rem' }}>
              <CheckCircle size={24} /> AI Recommendation
            </h3>
            <p style={{ lineHeight: '1.6', fontSize: '1.05rem', color: 'var(--text-primary)' }}>
              <strong>{data.l1Vendor}</strong> is technically qualified and officially holds the <strong style={{ color: 'var(--success)' }}>L1 position</strong>. 
              <br/><br/>
              Their quote is <strong>{Math.abs(data.variance)}% below</strong> the estimated cost.
            </p>
            <div style={{ marginTop: '1.25rem', padding: '1rem', background: 'var(--bg-primary)', borderRadius: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)', borderLeft: '2px solid var(--accent-primary)' }}>
              <strong>Policy Note:</strong> Section 2.5 of EOI confirms that bids within -10% variance do not require additional performance security checks.
            </div>
            
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'center' }}>
              {approved ? (
                <div className="badge success" style={{ padding: '0.75rem 2rem', fontSize: '1rem', width: '100%', justifyContent: 'center' }}>
                  <CheckCircle size={18} style={{ display: 'inline', marginRight: '8px' }} /> L1 Recommendation Approved
                </div>
              ) : (
                <button className="btn btn-primary" style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', fontWeight: 'bold' }} onClick={handleApprove}>
                  <Stamp size={20} /> Approve L1 Recommendation
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card animate-fade-in" style={{ padding: '0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-primary)' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <LineChartIcon className="text-accent-primary" /> L1 Price vs Macro-Economic Indicators
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Real-time benchmarking against GeM Historical Avg and Global Steel Index.</p>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div style={{ background: 'var(--bg-primary)', padding: '0.75rem 1.5rem', borderRadius: '8px', border: '1px solid var(--glass-border)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Trend Match</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--accent-primary)' }}>92% Correlation</div>
            </div>
            <div style={{ background: 'var(--success)', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 12px rgba(34, 197, 94, 0.2)' }}>
              <TrendingDown size={20} />
              <div>
                <div style={{ fontSize: '0.8rem', opacity: 0.9 }}>Verdict</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Price Justified</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ width: '100%', height: '450px', padding: '2rem' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.marketTrend} margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSteel" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorGem" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" vertical={false} />
              
              <XAxis 
                dataKey="month" 
                stroke="var(--text-secondary)" 
                tick={{ fill: 'var(--text-secondary)' }}
                axisLine={{ stroke: 'rgba(0,0,0,0.1)' }}
                tickLine={false}
                dy={10}
              />
              <YAxis 
                tickFormatter={(val) => `₹${(val/100000).toFixed(0)}L`} 
                stroke="var(--text-secondary)"
                tick={{ fill: 'var(--text-secondary)' }}
                axisLine={false}
                tickLine={false}
                domain={['dataMin - 100000', 'dataMax + 100000']}
                dx={-10}
              />
              
              <Tooltip 
                formatter={(value, name) => [formatCurrency(value), name === 'l1Price' ? 'L1 Quoted Price' : name]}
                contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', padding: '1rem', color: 'var(--text-primary)' }}
                itemStyle={{ padding: '4px 0' }}
                labelStyle={{ color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 'bold' }}
              />
              
              <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ paddingBottom: '20px' }} />
              
              <Area type="monotone" name="Global Steel Index (Benchmark)" dataKey="steelIndex" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorSteel)" />
              <Area type="monotone" name="GeM Historical Avg" dataKey="gemAvg" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#colorGem)" />
              <Line type="monotone" name="L1 Quoted Price" dataKey="l1Price" stroke="#ef4444" strokeWidth={4} dot={{ r: 6, fill: '#ef4444', strokeWidth: 2, stroke: 'white' }} activeDot={{ r: 8, fill: '#ef4444', strokeWidth: 0 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default FinanceModule;
