import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  ComposedChart, Scatter, PieChart as RechartsPieChart, Pie, Cell
} from 'recharts';
import { LineChart as LineChartIcon, PieChart, TrendingUp, AlertTriangle, ShieldCheck, Map } from 'lucide-react';

const mockRejectionReasons = [
  { name: 'Financial Non-compliance', count: 45 },
  { name: 'Fake Certifications', count: 28 },
  { name: 'Invalid EMD', count: 35 },
  { name: 'Past Default History', count: 18 },
  { name: 'Technical Shortfall', count: 62 },
];

const mockMissingDocs = [
  { name: 'Audited Balance Sheets', value: 85 },
  { name: 'EPF/ESIC Certificates', value: 65 },
  { name: 'ISO Certification', value: 40 },
  { name: 'OEM Authorization', value: 55 },
  { name: 'GST Returns', value: 25 },
];

const mockVendorTrends = [
  { month: 'Jan', compliance: 75, delivery: 80, quality: 85 },
  { month: 'Feb', compliance: 78, delivery: 82, quality: 86 },
  { month: 'Mar', compliance: 82, delivery: 81, quality: 84 },
  { month: 'Apr', compliance: 85, delivery: 85, quality: 88 },
  { month: 'May', compliance: 84, delivery: 87, quality: 90 },
  { month: 'Jun', compliance: 88, delivery: 89, quality: 92 },
  { month: 'Jul', compliance: 92, delivery: 91, quality: 94 },
];

const mockEvalTime = [
  { month: 'Jan', preAI: 45, postAI: 45 },
  { month: 'Feb', preAI: 42, postAI: 42 },
  { month: 'Mar', preAI: 46, postAI: 12 },
  { month: 'Apr', preAI: 44, postAI: 8 },
  { month: 'May', preAI: 48, postAI: 5 },
  { month: 'Jun', preAI: 45, postAI: 4 },
  { month: 'Jul', preAI: 47, postAI: 2 },
];

const mockCostAvoidance = [
  { quarter: 'Q1 2025', cartelBidsRejected: 1.2, inflatedBidsCorrected: 2.5 },
  { quarter: 'Q2 2025', cartelBidsRejected: 2.1, inflatedBidsCorrected: 3.8 },
  { quarter: 'Q3 2025', cartelBidsRejected: 3.5, inflatedBidsCorrected: 4.2 },
  { quarter: 'Q4 2025', cartelBidsRejected: 4.8, inflatedBidsCorrected: 5.9 },
];

const mockClauseFailures = [
  { clause: 'Clause 4.1 (Financial)', failures: 120 },
  { clause: 'Clause 5.2 (Experience)', failures: 98 },
  { clause: 'Clause 7.1 (Safety)', failures: 45 },
  { clause: 'Clause 8.4 (Equipment)', failures: 85 },
  { clause: 'Clause 2.1 (EMD)', failures: 60 },
  { clause: 'Clause 9.3 (OEM)', failures: 75 },
];

const mockRegionalData = [
  { region: 'Gevra', volume: 450, riskIndex: 65, averageValue: 8.5 },
  { region: 'Kusmunda', volume: 380, riskIndex: 45, averageValue: 6.2 },
  { region: 'Dipka', volume: 520, riskIndex: 82, averageValue: 12.4 },
  { region: 'Korba', volume: 290, riskIndex: 30, averageValue: 4.1 },
  { region: 'Raigarh', volume: 150, riskIndex: 55, averageValue: 3.5 },
];

const mockRiskDistribution = [
  { name: 'Low Risk (Verified)', value: 350, fill: '#10b981' },
  { name: 'Medium Risk (Minor Flags)', value: 120, fill: '#f59e0b' },
  { name: 'High Risk (Shortfalls)', value: 25, fill: '#ef4444' },
  { name: 'Cartel Network (Auto-blocked)', value: 5, fill: '#7f1d1d' },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'rgba(15, 23, 42, 0.95)', border: '1px solid var(--glass-border)', padding: '1rem', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.3)', backdropFilter: 'blur(8px)' }}>
        <p style={{ margin: '0 0 0.5rem 0', fontWeight: '600', color: 'var(--text-primary)' }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ margin: 0, color: entry.color, fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', gap: '1rem' }}>
            <span>{entry.name}:</span>
            <span style={{ fontWeight: 'bold' }}>{entry.value}</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ChartCard = ({ title, icon: Icon, children }) => (
  <div className="glass-card animate-fade-in" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', height: '400px' }}>
    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
      <Icon className="text-accent-primary" size={20} /> {title}
    </h3>
    <div style={{ flex: 1, width: '100%', minHeight: 0, position: 'relative' }}>
      {children}
    </div>
  </div>
);

const ProcurementAnalytics = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', paddingBottom: '2rem' }}>
      <div style={{ marginBottom: '0.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', margin: 0 }}>Executive Intelligence</h1>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Predictive analytics, bottleneck identification, and historical procurement trends.</p>
      </div>

      {/* Top Level - High Impact Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '1.5rem' }}>
        
        {/* Cost Avoidance */}
        <ChartCard title="Automated Cost Avoidance (Cr)" icon={TrendingUp}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockCostAvoidance} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis dataKey="quarter" stroke="var(--text-secondary)" fontSize={12} tickLine={false} />
              <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} />
              <RechartsTooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="cartelBidsRejected" name="Cartel Rings Blocked" stackId="a" fill="#f59e0b" radius={[0, 0, 4, 4]} />
              <Bar dataKey="inflatedBidsCorrected" name="Inflated Bids Corrected" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Turnaround Time Drop */}
        <ChartCard title="Evaluation Time (Days) - AI Impact" icon={LineChartIcon}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockEvalTime} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPreAI" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPostAI" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis dataKey="month" stroke="var(--text-secondary)" fontSize={12} tickLine={false} />
              <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} />
              <RechartsTooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Area type="monotone" dataKey="preAI" name="Manual Evaluation (Pre-AI)" stroke="#ef4444" fillOpacity={1} fill="url(#colorPreAI)" />
              <Area type="monotone" dataKey="postAI" name="AI-Assisted Evaluation" stroke="#2563eb" fillOpacity={1} fill="url(#colorPostAI)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Middle Level - Process Failures */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
        
        {/* Rejection Reasons */}
        <ChartCard title="Most Common Rejection Reasons" icon={AlertTriangle}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockRejectionReasons} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={true} vertical={false} />
              <XAxis type="number" stroke="var(--text-secondary)" fontSize={12} tickLine={false} />
              <YAxis dataKey="name" type="category" stroke="var(--text-secondary)" fontSize={11} tickLine={false} width={130} />
              <RechartsTooltip content={<CustomTooltip />} />
              <Bar dataKey="count" name="Incidents" fill="#ef4444" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Missing Documents */}
        <ChartCard title="Frequently Missing Documents" icon={PieChart}>
           <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockMissingDocs} layout="vertical" margin={{ top: 10, right: 30, left: 20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={true} vertical={false} />
              <XAxis type="number" stroke="var(--text-secondary)" fontSize={12} tickLine={false} />
              <YAxis dataKey="name" type="category" stroke="var(--text-secondary)" fontSize={11} tickLine={false} width={130} />
              <RechartsTooltip content={<CustomTooltip />} />
              <Bar dataKey="value" name="Missing Frequency" fill="#8b5cf6" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Clause-wise Failures */}
        <ChartCard title="Clause-wise Failure Distribution" icon={ShieldCheck}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={mockClauseFailures}>
              <PolarGrid stroke="rgba(255,255,255,0.2)" />
              <PolarAngleAxis dataKey="clause" tick={{ fill: 'var(--text-secondary)', fontSize: 10 }} />
              <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
              <Radar name="Failures" dataKey="failures" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.5} />
              <RechartsTooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Vendor Risk Distribution */}
        <ChartCard title="Vendor Risk Tier Distribution" icon={PieChart}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie data={mockRiskDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                {mockRiskDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <RechartsTooltip content={<CustomTooltip />} />
            </RechartsPieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Bottom Level - Regional & Vendor Insights */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '1.5rem' }}>
        
        {/* Vendor Trends */}
        <ChartCard title="Vendor Performance Trends (Rolling Avg)" icon={LineChartIcon}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockVendorTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis dataKey="month" stroke="var(--text-secondary)" fontSize={12} tickLine={false} />
              <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} domain={[60, 100]} />
              <RechartsTooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Line type="monotone" dataKey="compliance" name="Compliance Score" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="delivery" name="Delivery Reliability" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="quality" name="Quality Score" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Regional Insights */}
        <ChartCard title="Regional Procurement Insights (Volume vs Risk)" icon={Map}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={mockRegionalData} margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
              <XAxis dataKey="region" stroke="var(--text-secondary)" fontSize={12} tickLine={false} />
              <YAxis yAxisId="left" stroke="var(--text-secondary)" fontSize={12} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="var(--text-secondary)" fontSize={12} tickLine={false} />
              <RechartsTooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar yAxisId="left" dataKey="volume" name="Tender Volume" fill="#3b82f6" barSize={30} radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="riskIndex" name="Risk Index (0-100)" stroke="#ef4444" strokeWidth={3} dot={{ r: 6, fill: '#ef4444' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>
    </div>
  );
};

export default ProcurementAnalytics;
