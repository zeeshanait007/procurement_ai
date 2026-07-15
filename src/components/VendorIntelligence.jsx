import React, { useState, useRef, useEffect, useCallback } from 'react';
import { mockVendors, mockKnowledgeGraph } from '../mockPlatformData';
import { Search, Filter, AlertTriangle, ShieldCheck, Network, Info, TrendingDown, Clock, Maximize2, Users, X } from 'lucide-react';
import { useToast, useModal } from '../App';
import ForceGraph2D from 'react-force-graph-2d';

import { StatCard } from './StatCard';

const VendorIntelligence = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);
  const { showToast } = useToast();
  const { showModal, closeModal } = useModal();
  
  const fgRef = useRef();

  // Resize graph based on container
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef();

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Auto-center graph when maximizing/minimizing or resizing window
  useEffect(() => {
    if (fgRef.current) {
      const timer = setTimeout(() => {
        fgRef.current.zoomToFit(400);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isMaximized, dimensions]);


  const openVendor360 = (vendor) => {
    const modalBody = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <h3 style={{ fontSize: '1.5rem', color: 'var(--accent-primary)', marginBottom: '0.25rem' }}>{vendor.name}</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Vendor ID: {vendor.id} | Registered since 2018</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1, padding: '1.5rem', background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Overall Compliance</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: vendor.complianceScore > 90 ? 'var(--success)' : 'var(--warning)' }}>{vendor.complianceScore}%</div>
          </div>
          <div style={{ flex: 1, padding: '1.5rem', background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--glass-border)' }}>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Win Rate (AI Estimated)</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>{vendor.winRate}</div>
          </div>
        </div>

        <div style={{ background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--glass-border)', padding: '1.5rem' }}>
          <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertTriangle size={18} color={vendor.status === 'Low Risk' ? 'var(--success)' : 'var(--danger)'} /> Risk Profile: {vendor.status}
          </h4>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Total Bids Submitted</span>
            <span style={{ fontWeight: '600' }}>{vendor.totalBids}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.75rem', marginBottom: '0.75rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Associated Directors</span>
            <span style={{ fontWeight: '600' }}>{vendor.associatedDirectors.join(', ')}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Delivery Delay History</span>
            <span style={{ fontWeight: '600', color: vendor.status === 'High Risk' ? 'var(--danger)' : 'var(--success)' }}>
              {vendor.status === 'High Risk' ? 'Severe' : 'Nominal'}
            </span>
          </div>
        </div>
      </div>
    );
    showModal('Vendor 360 Profile', modalBody, null, '600px');
  };

  const [selectedNode, setSelectedNode] = useState(null);

  const handleNodeClick = useCallback(node => {
    setSelectedNode(node);
  }, []);
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: 'calc(100vh - 100px)' }}>
      
      {/* Top Stats */}
      <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
        <StatCard label="Vendors Monitored" value="500+" icon={<Users size={24} />} delay="delay-1" color="primary" compact={true} description="Total registered vendors continuously monitored by the AI network for compliance and performance." />
        <StatCard label="Blacklisted (Auto-flagged)" value="12" icon={<AlertTriangle size={24} />} delay="delay-1" color="danger" compact={true} description="Vendors automatically flagged for critical non-compliance, severe delivery delays, or fraud." />
        <StatCard label="Cartel Risks Detected" value="3 Rings" icon={<ShieldCheck size={24} />} delay="delay-1" color="warning" compact={true} description="Potential collusion networks identified via shared directorships or coordinated bidding patterns." />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '1rem', flex: 1, minHeight: 0 }}>
        {/* Left: Vendor List */}
        <div className="glass-card animate-fade-in" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>Vendor Directory</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '0 0.5rem', width: '220px', transition: 'border-color 0.2s' }}>
                <Search size={16} color="var(--text-secondary)" />
                <input 
                  type="text" 
                  placeholder="Search vendors..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', padding: '0.4rem 0.5rem', width: '100%', fontSize: '0.85rem' }}
                />
              </div>
              <button className="btn btn-outline" style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }} onClick={() => showToast('Opening Advanced Filters', 'info')}><Filter size={14} style={{ marginRight: '6px' }} /> Filters</button>
            </div>
          </div>
          
          <div className="table-container" style={{ flex: 1, overflowY: 'auto' }}>
            <table style={{ width: '100%', fontSize: '0.9rem' }}>
              <thead style={{ position: 'sticky', top: 0, background: 'var(--bg-primary)', zIndex: 1 }}>
                <tr>
                  <th style={{ padding: '0.75rem' }}>Vendor ID</th>
                  <th style={{ padding: '0.75rem' }}>Name</th>
                  <th style={{ padding: '0.75rem' }}>Risk Profile</th>
                  <th style={{ padding: '0.75rem' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {mockVendors
                  .filter(v => v.name.toLowerCase().includes(searchTerm.toLowerCase()) || v.id.toLowerCase().includes(searchTerm.toLowerCase()))
                  .slice(0, 10)
                  .map(vendor => (
                  <tr key={vendor.id}>
                    <td style={{ padding: '0.75rem' }}><strong>{vendor.id}</strong></td>
                    <td style={{ padding: '0.75rem' }}>{vendor.name}</td>
                    <td style={{ padding: '0.75rem' }}>
                      <span className={`badge ${vendor.status === 'Low Risk' ? 'success' : vendor.status === 'Medium Risk' ? 'warning' : 'danger'}`} style={{ padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}>
                        {vendor.status === 'High Risk' ? <AlertTriangle size={12} style={{ marginRight: '4px', display: 'inline' }} /> : <ShieldCheck size={12} style={{ marginRight: '4px', display: 'inline' }} />}
                        {vendor.status}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => openVendor360(vendor)}>
                        <Info size={12} style={{ marginRight: '4px' }}/> View 360
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Knowledge Graph (Cartel Detection) */}
        <div className={isMaximized ? "" : "glass-card animate-fade-in delay-1"} style={isMaximized ? { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', padding: '2rem', display: 'flex' } : { padding: '1.25rem', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div className={isMaximized ? "glass-card animate-fade-in" : ""} style={isMaximized ? { flex: 1, display: 'flex', flexDirection: 'column', background: 'var(--bg-secondary)', borderRadius: '12px', overflow: 'hidden', padding: '1.5rem' } : { flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ fontSize: isMaximized ? '1.25rem' : '1.1rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Network className="text-accent-primary" /> Cartel Risk Network
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {isMaximized ? (
                  <>
                    <button className="btn btn-outline" style={{ padding: '0.5rem' }} onClick={() => {
                      if (fgRef.current) { fgRef.current.zoomToFit(400); showToast('Graph Re-centered', 'info'); }
                    }} title="Re-center Graph">
                      <Network size={16} />
                    </button>
                    <button className="btn btn-outline" style={{ padding: '0.5rem' }} onClick={() => setIsMaximized(false)} title="Close">
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem' }} onClick={() => setIsMaximized(true)} title="Maximize Graph">
                    <Maximize2 size={16} />
                  </button>
                )}
              </div>
            </div>

            <div ref={containerRef} style={{ flex: 1, minHeight: isMaximized ? '100%' : '350px', background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--glass-border)', overflow: 'hidden', position: 'relative' }}>
            {/* Neo4j subtle dotted grid background */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.5, backgroundImage: 'radial-gradient(circle, #cbd5e1 1.5px, transparent 1.5px)', backgroundSize: '20px 20px', pointerEvents: 'none' }}></div>
            {selectedNode && (
              <div style={{ position: 'absolute', top: '1rem', right: '1rem', width: '300px', background: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 8px 32px rgba(0,0,0,0.1)', zIndex: 10, color: 'var(--text-primary)', maxHeight: 'calc(100% - 2rem)', overflowY: 'auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.5rem' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600' }}>{selectedNode.label}</h3>
                    <span className="badge" style={{ marginTop: '0.5rem', display: 'inline-block', background: 'var(--accent-primary)', color: 'white' }}>{selectedNode.type}</span>
                  </div>
                  <button onClick={() => setSelectedNode(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><X size={18} /></button>
                </div>
                
                {selectedNode.attributes && (
                  <div style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Attributes</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {Object.entries(selectedNode.attributes).map(([key, val]) => (
                        <div key={key} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                          <span style={{ color: 'var(--text-secondary)' }}>{key}</span>
                          <span style={{ fontWeight: '500', textAlign: 'right' }}>{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div>
                  <h4 style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Relations</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {mockKnowledgeGraph.links
                      .filter(l => (l.source.id || l.source) === selectedNode.id || (l.target.id || l.target) === selectedNode.id)
                      .map((link, i) => {
                        const sourceId = link.source.id || link.source;
                        const targetId = link.target.id || link.target;
                        const isSource = sourceId === selectedNode.id;
                        const relatedNodeId = isSource ? targetId : sourceId;
                        const relatedNode = mockKnowledgeGraph.nodes.find(n => n.id === relatedNodeId) || { label: relatedNodeId };
                        
                        return (
                          <div key={i} style={{ background: 'var(--glass-bg)', padding: '0.75rem', borderRadius: '8px', fontSize: '0.8rem', border: '1px solid var(--glass-border)' }}>
                            <div style={{ color: 'var(--accent-primary)', fontWeight: '600', marginBottom: '0.25rem' }}>{link.label}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                              <span style={{ color: 'var(--text-secondary)' }}>{isSource ? 'To:' : 'From:'} <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>{relatedNode.label}</span></span>
                            </div>
                            {link.attributes && (
                              <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px dashed var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                {Object.entries(link.attributes).map(([k, v]) => (
                                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--text-secondary)' }}>{k}</span>
                                    <span style={{ fontWeight: '500' }}>{v}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )
                      })}
                  </div>
                </div>
              </div>
            )}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden' }}>
              <ForceGraph2D
                ref={fgRef}
                width={dimensions.width}
              height={dimensions.height}
              graphData={mockKnowledgeGraph}
              nodeLabel="label"
              nodeAutoColorBy="type"
              linkColor={() => 'rgba(0, 0, 0, 0.15)'}
              linkDirectionalArrowLength={4}
              linkDirectionalArrowRelPos={1}
              onNodeClick={handleNodeClick}
              linkCanvasObjectMode={() => 'after'}
              linkCanvasObject={(link, ctx, globalScale) => {
                const MAX_FONT_SIZE = 4;
                const LABEL = link.label;
                const start = link.source;
                const end = link.target;
                if (!start || !end) return;
                if (typeof start !== 'object' || typeof end !== 'object') return;
                
                const textPos = Object.assign(...['x', 'y'].map(c => ({
                  [c]: start[c] + (end[c] - start[c]) / 2
                })));
                
                ctx.font = `${MAX_FONT_SIZE}px Sans-Serif`;
                const textWidth = ctx.measureText(LABEL).width;
                const bckgDimensions = [textWidth, MAX_FONT_SIZE].map(n => n + MAX_FONT_SIZE * 0.2);

                ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                ctx.fillRect(textPos.x - bckgDimensions[0] / 2, textPos.y - bckgDimensions[1] / 2, ...bckgDimensions);

                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = '#1e293b';
                ctx.fillText(LABEL, textPos.x, textPos.y);
              }}
              nodeCanvasObject={(node, ctx, globalScale) => {
                const label = node.label;
                const fontSize = 14/globalScale;
                const NODE_R = 10;
                
                const getColor = (type) => {
                  switch(type) {
                    case 'Vendor': return '#3b82f6';
                    case 'Director': return '#ef4444';
                    case 'PAN': 
                    case 'GST': return '#a855f7';
                    case 'Project': return '#f59e0b';
                    case 'Certificate': return '#10b981';
                    case 'OEM': return '#0ea5e9';
                    case 'Bank': return '#059669';
                    case 'Tender': 
                    case 'Bid': 
                    case 'Purchase Order': return '#6366f1';
                    default: return '#6b7280';
                  }
                };
                
                const color = getColor(node.type);

                ctx.beginPath();
                ctx.arc(node.x, node.y, NODE_R, 0, 2 * Math.PI, false);
                ctx.fillStyle = color;
                ctx.fill();
                ctx.lineWidth = 1.5 / globalScale;
                ctx.strokeStyle = '#ffffff';
                ctx.stroke();

                ctx.font = `${fontSize}px Sans-Serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'top';
                ctx.fillStyle = '#1e293b';
                
                ctx.shadowColor = 'rgba(255,255,255,0.8)';
                ctx.shadowBlur = 4;
                ctx.fillText(label, node.x, node.y + NODE_R + 2);
                ctx.shadowBlur = 0;
                
                node.__bckgDimensions = [NODE_R * 2, NODE_R * 2];
              }}
              nodePointerAreaPaint={(node, color, ctx) => {
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(node.x, node.y, 10, 0, 2 * Math.PI, false);
                ctx.fill();
              }}
            />
            </div>
            
            <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem', right: '0.75rem', background: 'rgba(255,255,255,0.95)', padding: '0.75rem', borderRadius: '8px', borderLeft: '4px solid var(--danger)', backdropFilter: 'blur(8px)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <h4 style={{ color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
                <AlertTriangle size={14} /> Collusion Alert Active
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem', lineHeight: '1.4' }}>
                <strong>John Doe</strong> detected as Common Director across competing bids.
              </p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorIntelligence;
