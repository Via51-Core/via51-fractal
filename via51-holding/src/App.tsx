import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Article0501 from './pages/articles/20260501001';
import Article0501A from './pages/articles/20260501001A';
import Article0502 from './pages/articles/20260502001';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div style={{backgroundColor:'#000',color:'#D4AF37',padding:'100px',fontFamily:'monospace'}}>VIA51 HOLDING // SISTEMA SOBERANO ONLINE</div>} />
        <Route path="/articles/20260501001" element={<Article0501 />} />
        <Route path="/articles/20260501001A" element={<Article0501A />} />
        <Route path="/articles/20260502001" element={<Article0502 />} />
      </Routes>
    </Router>
  );
}