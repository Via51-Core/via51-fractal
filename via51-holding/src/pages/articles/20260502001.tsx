import { useState } from 'react';

interface LangContent { ES: string; QU: string; EN: string; }
interface Section { id: string; title: LangContent; content: LangContent; }

export default function Article_05_02() {
  const [activeLang, setLang] = useState<keyof LangContent>('ES');
  const issueCode = '2026.05.02.001';

  const sections: Section[] = [
    {
      id: "01",
      title: { ES: "1. El Virus del Abandono", QU: "1. Saqerpayaypa unquynin", EN: "1. The Virus of Abandonment" },
      content: { ES: "Contenido...", QU: "Qillqasqa...", EN: "Content..." }
    }
  ];

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', padding: '40px' }}>
      <header style={{ textAlign: 'center' }}>
        <h1 style={{ fontSize: '60px', fontWeight: '900' }}>{issueCode}</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
          {(['ES', 'QU', 'EN'] as const).map(l => (
            <button key={l} onClick={() => setLang(l)} style={{ color: activeLang === l ? '#D4AF37' : '#555', background: 'none', border: 'none', cursor: 'pointer' }}>{l}</button>
          ))}
        </div>
      </header>
      <main style={{ maxWidth: '800px', margin: '60px auto' }}>
        <h2 style={{ fontSize: '24px' }}>{sections[0].title[activeLang]}</h2>
        <p style={{ fontSize: '20px', color: '#ccc', marginTop: '20px' }}>{sections[0].content[activeLang]}</p>
      </main>
    </div>
  );
}