import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Dashboard.css';

// Icons
const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const ListIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const FolderIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const UploadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17,8 12,3 7,8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const ShareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="3,6 5,6 21,6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

// Mock data
const mockProjects = [
  {
    id: '1',
    name: '主站原型',
    productLine: '主站',
    color: '#5B5EF4',
    version: 'v2.3.0',
    updatedAt: '2小时前',
    cover: 'https://picsum.photos/seed/proto1/400/300',
    status: 'active',
  },
  {
    id: '2',
    name: '移动端 App',
    productLine: '移动端',
    color: '#22C55E',
    version: 'v1.5.0',
    updatedAt: '1天前',
    cover: 'https://picsum.photos/seed/proto2/400/300',
    status: 'active',
  },
  {
    id: '3',
    name: '后台管理系统',
    productLine: '后台管理',
    color: '#F59E0B',
    version: 'v3.0.0',
    updatedAt: '3天前',
    cover: 'https://picsum.photos/seed/proto3/400/300',
    status: 'draft',
  },
  {
    id: '4',
    name: '登录页面改版',
    productLine: '主站',
    color: '#5B5EF4',
    version: 'v1.0.0',
    updatedAt: '1周前',
    cover: 'https://picsum.photos/seed/proto4/400/300',
    status: 'active',
  },
  {
    id: '5',
    name: '搜索功能优化',
    productLine: '主站',
    color: '#5B5EF4',
    version: 'v0.5.0',
    updatedAt: '2周前',
    cover: 'https://picsum.photos/seed/proto5/400/300',
    status: 'archived',
  },
  {
    id: '6',
    name: '用户中心重构',
    productLine: '移动端',
    color: '#22C55E',
    version: 'v2.0.0',
    updatedAt: '1个月前',
    cover: 'https://picsum.photos/seed/proto6/400/300',
    status: 'active',
  },
];

type ViewMode = 'grid' | 'list';
type FilterStatus = 'all' | 'active' | 'draft' | 'archived';

export default function Dashboard() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = mockProjects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="dashboard">
      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-value">12</div>
          <div className="stat-label">全部项目</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">8</div>
          <div className="stat-label">进行中</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">3</div>
          <div className="stat-label">草稿</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">1</div>
          <div className="stat-label">已归档</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <div className="toolbar-left">
          <div className="search-box">
            <SearchIcon />
            <input
              type="text"
              placeholder="搜索项目..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
          >
            <option value="all">全部状态</option>
            <option value="active">进行中</option>
            <option value="draft">草稿</option>
            <option value="archived">已归档</option>
          </select>
        </div>
        <div className="toolbar-right">
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="网格视图"
            >
              <GridIcon />
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="列表视图"
            >
              <ListIcon />
            </button>
          </div>
          <button className="btn btn-ghost">
            <FolderIcon />
            新建文件夹
          </button>
          <button className="btn btn-primary">
            <UploadIcon />
            上传原型
          </button>
        </div>
      </div>

      {/* Projects */}
      <div className={`projects-container ${viewMode}`}>
        {filteredProjects.length === 0 ? (
          <div className="empty-state">
            <FolderIcon />
            <h3>暂无项目</h3>
            <p>点击「上传原型」开始你的第一个项目</p>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <div key={project.id} className="project-card">
                <Link to={`/prototypes/${project.id}`} className="project-cover">
                  <img src={project.cover} alt={project.name} />
                  <div className="project-overlay">
                    <button className="overlay-btn" title="预览">
                      <EyeIcon />
                    </button>
                    <button className="overlay-btn" title="分享">
                      <ShareIcon />
                    </button>
                    <button className="overlay-btn" title="删除">
                      <TrashIcon />
                    </button>
                  </div>
                </Link>
                <div className="project-info">
                  <div className="project-header">
                    <span className="project-dot" style={{ background: project.color }} />
                    <span className="project-product">{project.productLine}</span>
                  </div>
                  <h3 className="project-name">{project.name}</h3>
                  <div className="project-meta">
                    <span className="project-version">{project.version}</span>
                    <span className="project-time">{project.updatedAt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="projects-list">
            <table className="projects-table">
              <thead>
                <tr>
                  <th>名称</th>
                  <th>产品线</th>
                  <th>版本</th>
                  <th>更新时间</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <tr key={project.id}>
                    <td>
                      <div className="project-cell">
                        <img src={project.cover} alt="" className="project-thumb" />
                        <span>{project.name}</span>
                      </div>
                    </td>
                    <td>
                      <span className="product-badge" style={{ color: project.color }}>
                        {project.productLine}
                      </span>
                    </td>
                    <td>{project.version}</td>
                    <td>{project.updatedAt}</td>
                    <td>
                      <span className={`status-badge status-${project.status}`}>
                        {project.status === 'active' ? '进行中' : project.status === 'draft' ? '草稿' : '已归档'}
                      </span>
                    </td>
                    <td>
                      <div className="action-btns">
                        <button className="action-btn" title="预览"><EyeIcon /></button>
                        <button className="action-btn" title="分享"><ShareIcon /></button>
                        <button className="action-btn" title="删除"><TrashIcon /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
