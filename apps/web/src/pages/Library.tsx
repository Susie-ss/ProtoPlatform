import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Library.css';

const mockDesignSystems = [
  {
    id: '1',
    name: '企业后台设计系统',
    description: '包含按钮、表单、表格等基础组件',
    componentCount: 48,
    colorCount: 12,
    createdAt: '2024-01-15',
    colors: ['#5B5EF4', '#22C55E', '#F59E0B', '#EF4444'],
  },
  {
    id: '2',
    name: '移动端组件库',
    description: '适用于移动端 App 的组件设计',
    componentCount: 32,
    colorCount: 8,
    createdAt: '2024-02-20',
    colors: ['#3B82F6', '#10B981', '#F59E0B', '#EC4899'],
  },
  {
    id: '3',
    name: '营销页面组件',
    description: '落地页、活动页常用组件',
    componentCount: 24,
    colorCount: 6,
    createdAt: '2024-03-10',
    colors: ['#8B5CF6', '#06B6D4', '#F97316', '#14B8A6'],
  },
];

export default function Library() {
  const [designSystems] = useState(mockDesignSystems);

  return (
    <div className="library">
      <div className="library-header">
        <div>
          <h2>组件库</h2>
          <p className="text-muted">管理你的设计系统和组件资产</p>
        </div>
        <button className="btn btn-primary">+ 新建组件库</button>
      </div>

      <div className="design-systems-grid">
        {designSystems.map((ds) => (
          <Link to={`/library/${ds.id}`} key={ds.id} className="ds-card">
            <div className="ds-colors">
              {ds.colors.map((color, i) => (
                <span key={i} className="color-dot" style={{ background: color }} />
              ))}
            </div>
            <h3 className="ds-name">{ds.name}</h3>
            <p className="ds-desc">{ds.description}</p>
            <div className="ds-meta">
              <span>{ds.componentCount} 组件</span>
              <span>{ds.colorCount} 色值</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
