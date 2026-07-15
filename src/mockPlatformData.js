// Simulating large-scale demo data

// Global Platform Stats
export const platformStats = {
  totalTenders: 300,
  totalVendors: 500,
  totalDocumentsProcessed: 10452,
  activeCartelAlerts: 3,
  systemAccuracy: '98.7%',
  automatedSavings: '₹4.2 Cr'
};

// Simulated 500 Vendors (returning top 10 for UI)
export const mockVendors = Array.from({ length: 15 }, (_, i) => ({
  id: `VND-00${i + 1}`,
  name: i % 2 === 0 ? `Heavy Mining Equipments ${i}` : `Reliable Logistics ${i}`,
  status: i % 3 === 0 ? 'High Risk' : i % 5 === 0 ? 'Medium Risk' : 'Low Risk',
  winRate: `${Math.floor(Math.random() * 60) + 10}%`,
  totalBids: Math.floor(Math.random() * 50) + 5,
  complianceScore: Math.floor(Math.random() * 20) + 80, // 80-100
  associatedDirectors: [`Director A${i}`, `Director B${i}`]
}));

// Mock Knowledge Graph Nodes and Edges for Cartel Detection
export const mockKnowledgeGraph = {
  nodes: [
    { id: 'Vendor-A', type: 'Vendor', label: 'Alpha Mining', attributes: { Registration: '2015', Status: 'Active', Risk: 'High' } },
    { id: 'Vendor-B', type: 'Vendor', label: 'Beta Logistics', attributes: { Registration: '2018', Status: 'Active', Risk: 'High' } },
    
    { id: 'Dir-John', type: 'Director', label: 'John Doe', attributes: { DIN: '09876543', Nationality: 'Indian', Appointed: '2016-04-12' } },
    { id: 'Dir-Jane', type: 'Director', label: 'Jane Smith', attributes: { DIN: '01234567', Nationality: 'Indian', Appointed: '2019-01-05' } },
    
    { id: 'PAN-1234', type: 'PAN', label: 'PAN: ABCDE1234F', attributes: { TaxStatus: 'Compliant', IssueDate: '2010', Type: 'Company' } },
    { id: 'GST-9988', type: 'GST', label: 'GSTIN: 22ABCDE1234F1Z5', attributes: { State: 'Chhattisgarh', FilingStatus: 'Regular', RiskFlag: 'Shared Premise' } },
    
    { id: 'Proj-X', type: 'Project', label: 'Gevra Expansion', attributes: { Budget: '₹150 Cr', Completion: '85%', Client: 'SECL' } },
    { id: 'Cert-ISO', type: 'Certificate', label: 'ISO 9001:2015', attributes: { Issuer: 'TUV', ValidUntil: '2027', Scope: 'Heavy Machinery' } },
    { id: 'OEM-CAT', type: 'OEM', label: 'Caterpillar Inc.', attributes: { AuthType: 'Tier 1 Dealer', Region: 'India', ValidUntil: '2028' } },
    { id: 'Bank-SBI', type: 'Bank', label: 'SBI (Acct: 3344)', attributes: { Branch: 'Korba', IFSC: 'SBIN0001234', Rating: 'AAA' } },
    
    { id: 'Tender-101', type: 'Tender', label: 'NIT: Conveyor Belts', attributes: { Budget: '₹60 Cr', Deadline: '2026-08-01', Status: 'Under Evaluation' } },
    { id: 'Bid-A', type: 'Bid', label: 'Bid: ₹55Cr', attributes: { Submitted: '2026-07-10', Rank: 'L1', TechScore: '92/100' } },
    { id: 'Bid-B', type: 'Bid', label: 'Bid: ₹56Cr', attributes: { Submitted: '2026-07-11', Rank: 'L2', TechScore: '89/100' } },
    
    { id: 'PO-7788', type: 'Purchase Order', label: 'PO-2025-01', attributes: { Value: '₹45 Cr', Status: 'Fulfilled', Delay: '12 Days' } }
  ],
  links: [
    { source: 'Dir-John', target: 'Vendor-A', label: 'IS_DIRECTOR', attributes: { shareholding: '45%' } },
    { source: 'Dir-John', target: 'Vendor-B', label: 'IS_DIRECTOR (Cartel Alert)', attributes: { shareholding: '55%' } },
    { source: 'Dir-Jane', target: 'Vendor-B', label: 'IS_DIRECTOR', attributes: { shareholding: '20%' } },
    
    { source: 'Vendor-A', target: 'PAN-1234', label: 'REGISTERED_PAN', attributes: { verifiedOn: '2025-01-10' } },
    { source: 'PAN-1234', target: 'GST-9988', label: 'LINKED_GST', attributes: { autoLinked: 'Yes' } },
    { source: 'Vendor-B', target: 'GST-9988', label: 'SHARED_GST (Fraud Alert)', attributes: { similarityScore: '100%' } },
    
    { source: 'Vendor-A', target: 'Proj-X', label: 'EXECUTED_PROJECT', attributes: { role: 'Lead Contractor' } },
    { source: 'Vendor-A', target: 'Cert-ISO', label: 'HOLDS_CERTIFICATE', attributes: { verified: 'True' } },
    { source: 'Vendor-A', target: 'OEM-CAT', label: 'AUTHORIZED_DEALER', attributes: { level: 'Platinum' } },
    
    { source: 'Vendor-A', target: 'Bank-SBI', label: 'BANK_ACCOUNT', attributes: { mandate: 'Active' } },
    
    { source: 'Vendor-A', target: 'Bid-A', label: 'SUBMITTED_BID', attributes: { ipAddress: '192.168.1.5' } },
    { source: 'Vendor-B', target: 'Bid-B', label: 'SUBMITTED_BID', attributes: { ipAddress: '192.168.1.5 (Match)' } },
    
    { source: 'Bid-A', target: 'Tender-101', label: 'BID_FOR_TENDER', attributes: { status: 'Evaluated' } },
    { source: 'Bid-B', target: 'Tender-101', label: 'BID_FOR_TENDER', attributes: { status: 'Evaluated' } },
    
    { source: 'Bid-A', target: 'PO-7788', label: 'AWARDED_PO', attributes: { date: '2025-02-15' } }
  ]
};

// 300 Tenders (returning top 5 for UI)
export const mockTenders = [
  { id: 'NIT/2026/001', name: 'Procurement of Conveyor Belts', budget: '₹60 Cr', bids: 12, aiEvalStatus: '100% Complete' },
  { id: 'NIT/2026/002', name: 'Annual Maintenance of Heavy Machinery', budget: '₹12 Cr', bids: 8, aiEvalStatus: '80% Complete' },
  { id: 'NIT/2026/003', name: 'Construction of Staff Quarters', budget: '₹120 Cr', bids: 15, aiEvalStatus: 'Pending' },
  { id: 'NIT/2026/004', name: 'Supply of Safety Equipment', budget: '₹5 Cr', bids: 22, aiEvalStatus: '100% Complete' },
  { id: 'NIT/2026/005', name: 'IT Infrastructure Upgrade', budget: '₹15 Cr', bids: 5, aiEvalStatus: 'Evaluation Failed (Anomaly)' }
];
