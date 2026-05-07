import { useState } from 'react';
import './AIGenerate.css';

export default function AIGenerate() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="ai-generate">
      <div className="ai-header">
        <h2>AI 生成</h2>
        <p className="text-muted">输入提示词，AI 将根据你的组件库生成规范的原型页面</p>
      </div>

      <div className="ai-container">
        <div className="ai-input-section">
          <textarea
            className="ai-textarea"
            placeholder="描述你想要生成的页面，例如：设计一个用户登录页面，包含用户名、密码输入框和登录按钮..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={6}
          />
          <div className="ai-options">
            <select className="ai-select">
              <option value="">选择组件库（可选）</option>
              <option value="1">企业后台设计系统</option>
              <option value="2">移动端组件库</option>
            </select>
            <button
              className="btn btn-primary"
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
            >
              {isGenerating ? '生成中...' : '生成页面'}
            </button>
          </div>
        </div>

        <div className="ai-preview-section">
          <div className="ai-preview-placeholder">
            <p>预览区域</p>
            <p className="text-muted">生成的页面将在这里显示</p>
          </div>
        </div>
      </div>

      <div className="ai-tips">
        <h4>使用提示</h4>
        <ul>
          <li>详细描述页面需求，包括布局、功能、交互等</li>
          <li>选择对应的组件库可以让生成的页面风格更统一</li>
          <li>生成后可手动调整细节</li>
        </ul>
      </div>
    </div>
  );
}
