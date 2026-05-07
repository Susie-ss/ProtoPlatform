import { useParams, Link } from 'react-router-dom';

export default function PrototypePreview() {
  const { id } = useParams();

  return (
    <div className="prototype-preview">
      <div className="preview-header">
        <Link to="/" className="btn btn-ghost">← 返回</Link>
        <h2>原型预览</h2>
        <div className="preview-actions">
          <button className="btn btn-primary">分享</button>
        </div>
      </div>
      <div className="preview-container">
        <div className="preview-frame">
          <div className="preview-placeholder">
            <p>原型预览区域</p>
            <p>项目 ID: {id}</p>
          </div>
        </div>
        <div className="preview-sidebar">
          <div className="preview-info">
            <h4>版本信息</h4>
            <p>v1.0.0</p>
          </div>
          <div className="preview-comments">
            <h4>评论</h4>
            <p className="text-muted">暂无评论</p>
          </div>
        </div>
      </div>
    </div>
  );
}
