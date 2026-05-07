import { Outlet, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Layout.css';

// Icons as SVG
const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9,22 9,12 15,12 15,22" />
  </svg>
);

const FolderIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const LibraryIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const AIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

const ChevronIcon = ({ expanded }: { expanded: boolean }) => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
  >
    <polyline points="9,18 15,12 9,6" />
  </svg>
);

const PlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const TrashIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3,6 5,6 21,6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

// Mock data for product lines
const mockProductLines = [
  { id: '1', name: '主站', color: '#5B5EF4', count: 8 },
  { id: '2', name: '移动端', color: '#22C55E', count: 5 },
  { id: '3', name: '后台管理', color: '#F59E0B', count: 3 },
];

export default function Layout() {
  const location = useLocation();
  const [productLinesExpanded, setProductLinesExpanded] = useState(true);
  const [productLines] = useState(mockProductLines);

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="sidebar">
        {/* Logo */}
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">PP</div>
            <span className="logo-text">ProtoPlatform</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <Link to="/" className={`sidebar-item ${isActive('/') ? 'active' : ''}`}>
            <span className="icon"><HomeIcon /></span>
            <span className="text">首页</span>
          </Link>

          <Link to="/ai" className={`sidebar-item ${isActive('/ai') ? 'active' : ''}`}>
            <span className="icon"><AIcon /></span>
            <span className="text">AI 生成</span>
            <span className="badge">New</span>
          </Link>

          <Link to="/library" className={`sidebar-item ${location.pathname.startsWith('/library') ? 'active' : ''}`}>
            <span className="icon"><LibraryIcon /></span>
            <span className="text">组件库</span>
          </Link>

          {/* Product Lines Section */}
          <div className="sidebar-section-header" onClick={() => setProductLinesExpanded(!productLinesExpanded)}>
            <span className="section-title">产品线</span>
            <ChevronIcon expanded={productLinesExpanded} />
          </div>

          {productLinesExpanded && (
            <div className="product-lines-list">
              {productLines.map((line) => (
                <div key={line.id} className="product-line-item">
                  <span className="dot" style={{ background: line.color }} />
                  <span className="name">{line.name}</span>
                  <span className="count">{line.count}</span>
                  <button className="delete-btn" title="删除">
                    <TrashIcon />
                  </button>
                </div>
              ))}
              <button className="add-product-line">
                <PlusIcon />
                <span>添加产品线</span>
              </button>
            </div>
          )}
        </nav>

        {/* User */}
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="avatar">S</div>
            <div className="details">
              <div className="name">Susie</div>
              <div className="role">管理员</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <h1 className="page-title">首页</h1>
          </div>
          <div className="header-right">
            <button className="btn btn-primary">
              <PlusIcon />
              新建项目
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
