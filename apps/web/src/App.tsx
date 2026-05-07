import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import ProjectDetail from './pages/ProjectDetail';
import PrototypePreview from './pages/PrototypePreview';
import Library from './pages/Library';
import DesignSystemDetail from './pages/DesignSystemDetail';
import AIGenerate from './pages/AIGenerate';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="projects/:id" element={<ProjectDetail />} />
        <Route path="prototypes/:id" element={<PrototypePreview />} />
        <Route path="library" element={<Library />} />
        <Route path="library/:id" element={<DesignSystemDetail />} />
        <Route path="ai" element={<AIGenerate />} />
      </Route>
    </Routes>
  );
}

export default App;
