//# Rutas principales
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UploadPage from './admin/UploadPage';
import BrandingPage from './admin/BrandingPage';
import PreviewPage from './admin/PreviewPage';
import Chat from './user/Chat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/upload" element={<UploadPage />} />
        <Route path="/admin/branding" element={<BrandingPage />} />
        <Route path="/admin/preview" element={<PreviewPage />} />
        <Route path="/chat" element={<Chat />} />  {/* Ruta pública */}
      </Routes>
    </Router>
  );
}