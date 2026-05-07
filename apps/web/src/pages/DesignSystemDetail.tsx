import { useParams, Link } from 'react-router-dom';

export default function DesignSystemDetail() {
  const { id } = useParams();

  return (
    <div className="ds-detail">
      <div className="page-header">
        <Link to="/library" className="btn btn-ghost">← 返回</Link>
        <h2>组件库详情</h2>
      </div>
      <div className="ds-content">
        <p>组件库 ID: {id}</p>
        <p className="text-muted">该功能正在开发中...</p>
      </div>
    </div>
  );
}
