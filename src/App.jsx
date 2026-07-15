import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, BrainCircuit, Users, ShieldCheck, 
  Settings, LogOut, Bell, Briefcase, MessageSquare
} from 'lucide-react';

import ExecutiveDashboard from './components/ExecutiveDashboard';
import ProcurementAnalytics from './components/ProcurementAnalytics';
import VendorIntelligence from './components/VendorIntelligence';
import EvaluationView from './components/EvaluationView'; 
import FinanceModule from './components/FinanceModule';
import { 
  TenderManagement, DocumentIntelligence, OcrMetadata, ClauseIntelligence,
  RuleEngine, CommitteeWorkspace, AuditWorkspace, AiCopilot, KnowledgeGraph,
  WorkflowEngine, ReportsAnalytics, Administration
} from './components/RemainingModules';
import './index.css';

// --- TOAST NOTIFICATION SYSTEM --- //
import { createContext, useContext } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type, hiding: false }]);
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, hiding: true } : t));
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== id));
      }, 300); // match css transition out
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="toast-container">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type} ${t.hiding ? 'hiding' : ''}`}>
            {t.type === 'success' && <CheckCircle size={20} color="var(--success)" />}
            {t.type === 'warning' && <AlertCircle size={20} color="var(--warning)" />}
            {t.type === 'info' && <Info size={20} color="var(--accent-primary)" />}
            <span style={{ fontWeight: '500' }}>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

// --- GLOBAL MODAL SYSTEM --- //
export const ModalContext = createContext();
export const useModal = () => useContext(ModalContext);

const ModalProvider = ({ children }) => {
  const [modalContent, setModalContent] = useState(null);

  const showModal = (title, body, actions = null, width = '500px') => {
    setModalContent({ title, body, actions, width });
  };

  const closeModal = () => setModalContent(null);

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      {modalContent && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <div className="glass-card animate-fade-in" style={{ width: modalContent.width, maxWidth: '90vw', maxHeight: '90vh', overflowY: 'auto', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600' }}>{modalContent.title}</h3>
              <X size={24} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} onClick={closeModal} />
            </div>
            <div style={{ padding: '1.5rem', flex: 1 }}>
              {modalContent.body}
            </div>
            {modalContent.actions && (
              <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'flex-end', gap: '1rem', background: 'var(--bg-primary)' }}>
                {modalContent.actions}
              </div>
            )}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};


// --- HUB COMPONENTS FOR CONSOLIDATED VIEWS --- //

const SubNav = ({ tabs, activeTab, setActiveTab }) => (
  <div style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid var(--glass-border)', marginBottom: '2rem' }}>
    {tabs.map(tab => (
      <button 
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        style={{
          background: 'transparent', border: 'none', color: activeTab === tab.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
          padding: '0.5rem 1rem', cursor: 'pointer', borderBottom: activeTab === tab.id ? '2px solid var(--accent-primary)' : '2px solid transparent',
          fontWeight: activeTab === tab.id ? '600' : '400', fontSize: '1rem'
        }}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

const DashboardHub = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const tabs = [{ id: 'overview', label: 'Executive Overview' }, { id: 'analytics', label: 'Procurement Analytics' }];
  return (
    <div>
      <SubNav tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'overview' && <div style={{ paddingTop: '1rem' }}><ExecutiveDashboard /></div>}
      {activeTab === 'analytics' && <div style={{ paddingTop: '1rem' }}><ProcurementAnalytics /></div>}
    </div>
  );
};

const TenderHub = () => {
  const [activeTab, setActiveTab] = useState('tenders');
  const tabs = [{ id: 'tenders', label: 'Tender Console' }, { id: 'finance', label: 'Commercial Eval (PCS)' }, { id: 'committee', label: 'Committee Workspace' }, { id: 'workflow', label: 'Workflow Engine' }];
  return <div><SubNav tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
    {activeTab === 'tenders' && <TenderManagement />}
    {activeTab === 'finance' && <FinanceModule />}
    {activeTab === 'committee' && <CommitteeWorkspace />}
    {activeTab === 'workflow' && <WorkflowEngine />}
  </div>;
};

const AiEngineHub = () => {
  const [activeTab, setActiveTab] = useState('techeval');
  const tabs = [{ id: 'techeval', label: 'Tech Evaluation (NIT/2026/001)' }, { id: 'docs', label: 'Document Intel' }, { id: 'ocr', label: 'OCR Pipeline' }, { id: 'clauses', label: 'Clause Intel' }, { id: 'rules', label: 'Rule Engine' }];
  return <div><SubNav tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
    {activeTab === 'techeval' && <EvaluationView />}
    {activeTab === 'docs' && <DocumentIntelligence />}
    {activeTab === 'ocr' && <OcrMetadata />}
    {activeTab === 'clauses' && <ClauseIntelligence />}
    {activeTab === 'rules' && <RuleEngine />}
  </div>;
};

const VendorHub = () => {
  return <VendorIntelligence />;
};

const AdminHub = () => {
  const [activeTab, setActiveTab] = useState('audit');
  const tabs = [{ id: 'audit', label: 'Audit & Vigilance' }, { id: 'admin', label: 'System Settings' }];
  return <div><SubNav tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
    {activeTab === 'audit' && <AuditWorkspace />}
    {activeTab === 'admin' && <Administration />}
  </div>;
};


// --- MAIN APP --- //

const Sidebar = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard & Reports', path: '/', icon: LayoutDashboard },
    { name: 'Tender Operations', path: '/tenders', icon: Briefcase },
    { name: 'AI Evaluation Hub', path: '/ai-engine', icon: BrainCircuit },
    { name: 'Vendor Ecosystem', path: '/vendors', icon: Users },
    { name: 'Security & Admin', path: '/admin', icon: ShieldCheck },
  ];

  return (
    <div className="sidebar" style={{ width: '280px', overflowY: 'auto' }}>
      <div className="brand animate-fade-in" style={{ paddingBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
          <div style={{ background: 'var(--accent-primary)', color: 'white', padding: '0.5rem', borderRadius: '8px', display: 'flex', boxShadow: '0 2px 10px rgba(37, 99, 235, 0.3)' }}>
            <Briefcase size={20} />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: '700', letterSpacing: '-0.5px', color: 'var(--text-primary)' }}>SECL Enterprise</span>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '600', paddingLeft: '3rem' }}>Intelligent Procurement</div>
      </div>
      
      <nav className="nav-menu">
        <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', marginTop: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Platform Hubs</div>
        {navItems.map((item, idx) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (location.pathname.includes(item.path) && item.path !== '/');
          return (
            <Link key={idx} to={item.path} className={`nav-item animate-fade-in ${isActive ? 'active' : ''}`} style={{ padding: '0.85rem 1rem', animationDelay: `${idx * 0.05}s`, borderRadius: '12px' }}>
              <Icon size={20} />
              <span style={{ fontSize: '0.95rem', fontWeight: isActive ? '600' : '400' }}>{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div style={{ marginTop: 'auto', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }} className="nav-menu">
        <Link to="/copilot" className={`nav-item animate-fade-in ${location.pathname === '/copilot' ? 'active' : ''}`} style={{ background: 'var(--accent-primary)', color: 'white', justifyContent: 'center' }}>
          <MessageSquare size={18} />
          <span style={{ fontWeight: '600' }}>Ask AI Copilot</span>
        </Link>
        <button className="nav-item" style={{ background: 'transparent', border: 'none', cursor: 'pointer', width: '100%', marginTop: '0.5rem' }}>
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

const Header = () => (
  <header className="header animate-fade-in" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: 'none' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'var(--glass-bg)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)', boxShadow: '0 0 10px var(--success)', animation: 'pulse 2s infinite' }}></div>
        <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-secondary)' }}>AI Engine: <span style={{ color: 'var(--success)' }}>Online & Learning</span></span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', paddingLeft: '1.5rem', borderLeft: '1px solid var(--glass-border)' }}>
        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.2rem' }}>Documents Scanned (Today)</div>
          <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)' }}>14,592 <span style={{ color: 'var(--success)', fontSize: '0.8rem', marginLeft: '0.25rem' }}>↑ 12%</span></div>
        </div>
        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.2rem' }}>Total Savings Recognized</div>
          <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--accent-primary)' }}>₹ 4.2 Cr</div>
        </div>
      </div>
    </div>

    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <button style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}>
        <Bell size={24} />
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--accent-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1rem', boxShadow: '0 2px 8px rgba(37, 99, 235, 0.4)' }}>
          AD
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: '600', lineHeight: '1.2' }}>System Admin</span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>SECL Head Office</span>
        </div>
      </div>
    </div>
  </header>
);

function App() {
  return (
    <ToastProvider>
      <ModalProvider>
        <Router>
          <div className="app-container">
            <Sidebar />
            <main className="main-content">
              <Header />
              <Routes>
                <Route path="/" element={<DashboardHub />} />
                <Route path="/tenders" element={<TenderHub />} />
                <Route path="/ai-engine" element={<AiEngineHub />} />
                <Route path="/vendors" element={<VendorHub />} />
                <Route path="/admin" element={<AdminHub />} />
                <Route path="/copilot" element={<AiCopilot />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ModalProvider>
    </ToastProvider>
  );
}

export default App;
