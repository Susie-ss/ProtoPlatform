import { useParams, Link } from 'react-router-dom';

export default function ProjectDetail() {
  const { id } = useParams();

  return (
    <div className="project-detail">
      <div className="page-header">
        <h2>项目详情</h2>
        <p>项目 ID: {id}</p>
      </div>
      <div className="coming-soon">
        <h3>项目详情页面</h3>
        <p>该功能正在开发中...</p>
        <Link to="/" className="btn btn-primary">返回首页</Link>
      </div>
    </div>
  );
}
