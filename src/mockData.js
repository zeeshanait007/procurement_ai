export const mockDashboardStats = {
  totalTenders: 210,
  bidsProcessed: 1395,
  pendingEvaluations: 45,
  avgProcessingTime: "1.2 hrs",
  accuracyRate: "98.5%",
};

export const mockRecentTenders = [
  { id: "NIT/2026/001", name: "Procurement of Conveyor Belts", category: "Goods", bids: 12, status: "Evaluation in Progress" },
  { id: "NIT/2026/002", name: "Annual Maintenance of Heavy Machinery", category: "Services", bids: 8, status: "Pending Evaluation" },
  { id: "NIT/2026/003", name: "Construction of Staff Quarters", category: "Works", bids: 15, status: "Shortfall Requested" },
  { id: "NIT/2026/004", name: "Supply of Safety Equipment", category: "Goods", bids: 22, status: "Evaluation Complete" },
];

export const mockDocumentText = `
SOUTH EASTERN COALFIELDS LIMITED
BIDDER SUBMISSION DOCUMENT

Tender Ref: NIT/2026/001 - Procurement of Conveyor Belts
Bidder Name: XYZ Mining Equipments Pvt. Ltd.
Date of Submission: 12-07-2026

1. FINANCIAL DETAILS
Annual Turnover for the last 3 financial years:
- FY 2023-24: ₹52.5 Crores
- FY 2024-25: ₹55.0 Crores
- FY 2025-26: ₹58.2 Crores
Average Annual Turnover: ₹55.23 Crores

2. EXPERIENCE
Prior experience in supplying similar conveyor belts to PSU/Govt:
- Client: Northern Coalfields Ltd.
- Order Value: ₹12.5 Crores
- Date of Completion: 15-05-2025

3. STATUTORY REGISTRATIONS
- GSTIN: 22AAAAA0000A1Z5
- MSME Udyam Registration: UDYAM-CG-00-0012345 (Valid)
- ISO 9001:2015 Certification (Valid till Dec 2027)

AUTHORIZED SIGNATORY
Rajesh Kumar, Director
`;

export const mockEvaluationCriteria = [
  {
    id: "c1",
    title: "Minimum Average Annual Turnover",
    required: "₹50.0 Crores",
    extracted: "₹55.23 Crores",
    status: "Met",
    confidence: "99%",
    source: "Financial Details - Line 8"
  },
  {
    id: "c2",
    title: "Prior Experience in Similar Supply",
    required: "1 order >= ₹10 Crores",
    extracted: "NCL Order, Value ₹12.5 Crores",
    status: "Met",
    confidence: "95%",
    source: "Experience - Line 14"
  },
  {
    id: "c3",
    title: "Valid GST Registration",
    required: "Required",
    extracted: "22AAAAA0000A1Z5",
    status: "Met",
    confidence: "98%",
    source: "Statutory Registrations - Line 18"
  },
  {
    id: "c4",
    title: "Make in India / MSME Certificate",
    required: "Required",
    extracted: "UDYAM-CG-00-0012345",
    status: "Met",
    confidence: "96%",
    source: "Statutory Registrations - Line 19"
  },
  {
    id: "c5",
    title: "Non-Debarment Undertaking",
    required: "Required on Company Letterhead",
    extracted: "Not Found",
    status: "Not Met",
    confidence: "90%",
    source: "N/A"
  }
];
