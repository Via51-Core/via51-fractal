import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

export default function Article_05_01A() {
  const [activeLang, setLang] = useState('ES');
  const [sectionIndex, setSectionIndex] = useState(0);
  const [stats, setStats] = useState({ article: 0, global: 0 });
  const issueCode = '2026.05.01.001A';

  useEffect(() => {
    const syncImpact = async () => {
      await supabase.from('sys_analytics_articles').insert([{ article_id: '2026.05.01.001', region: 'LIMA' }]);
      await supabase.from('sys_analytics_global').insert([{ node_name: 'HOLDING', visitor_region: 'LIMA' }]);
      const { count: artCount } = await supabase.from('sys_analytics_articles').select('*', { count: 'exact', head: true }).eq('article_id', '2026.05.01.001');
      const { data: globalData } = await supabase.from('view_global_total_impact').select('*').single();
      const tA = artCount || 0;
      const tG = globalData?.grand_total || 0;
      setStats({ article: tA, global: Math.max(tG, tA) });
    };
    syncImpact();
  }, []);

  const sections = [
    { id: "01", title: { ES: "1. Homenaje a la Dignidad del Trabajo", QU: "1. Llamkaypa sumaq kayninta yuyariy", EN: "1. Homage to the Dignity of Labor" }, content: { ES: "Saludamos hoy el esfuerzo inalcanzable de los peruanos... En VIA51 honramos esa historia.", QU: "Perupa llamkaqninkunatam saludayku, paykunam patria-ta sayachinku.", EN: "Today we salute the tireless effort of Peruvians... We honor that history." } },
    { id: "02", title: { ES: "2. El Estándar Inka: Bienestar de Calidad Mundial", QU: "2. Tawantinsuyu: Lliw pachapaq allin kawsay", EN: "2. The Inka Standard: World-Class Wellbeing" }, content: { ES: "El Estado Inka demostró que es posible alcanzar un bienestar de calidad mundial mediante el orden.", QU: "Inka kamachiyqa rikuchiwanchikmi allin kawsayqa atikuq kasqanta.", EN: "The Inka State proved that world-class wellbeing is possible through order." } },
    { id: "03", title: { ES: "3. La Producción como Plano Natural", QU: "3. Llamkaypacha: Plano Natural", EN: "3. Production as a Natural Plane" }, content: { ES: "El primer nudo de nuestro khipu generacional es la transmutación del trabajo en Producción Soberana.", QU: "Khipupa ñawpaq k'itunqa llamkay t'ikraymi Qasikay Llamkayman.", EN: "The first knot of our generational khipu is the transmutation of labor into Sovereign Production." } }
  ];

  return (
    <div style={{ backgroundColor: '#050505', color: '#ffffff', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif', overflowX: 'hidden' }}>
      
      {/* CONTENEDOR MAESTRO DE COLUMNA CENTRAL (850px) */}
      <div style={{ maxWidth: '850px', margin: '0 auto', position: 'relative' }}>
        
        {/* NAVEGACIÓN VINCULADA A LOS LÍMITES DE LA COLUMNA */}
        {sectionIndex > 0 && (
          <button onClick={() => setSectionIndex(sectionIndex - 1)} style={{ position: 'absolute', left: '-60px', top: '400px', background: 'none', color: '#D4AF37', fontSize: '30px', cursor: 'pointer', border: 'none', opacity: 0.4 }}> {"<"} </button>
        )}
        {sectionIndex < sections.length - 1 && (
          <button onClick={() => setSectionIndex(sectionIndex + 1)} style={{ position: 'absolute', right: '-60px', top: '400px', background: 'none', color: '#D4AF37', fontSize: '30px', cursor: 'pointer', border: 'none', opacity: 0.4 }}> {">"} </button>
        )}

        <header style={{ textAlign: 'center', marginBottom: '80px', paddingTop: '60px' }}>
          <span style={{ color: '#D4AF37', fontSize: '11px', letterSpacing: '0.6em', textTransform: 'uppercase', fontWeight: 'bold' }}>{issueCode}</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 75px)', fontWeight: '900', textTransform: 'uppercase', lineHeight: '0.85', margin: '30px 0' }}>Producción <br/> <span style={{ color: '#D4AF37', fontStyle: 'italic', fontWeight: '300' }}>Soberana</span></h1>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
            {['ES', 'QU', 'EN'].map(l => ( <button key={l} onClick={() => setLang(l)} style={{ background: 'none', border: 'none', color: activeLang === l ? '#D4AF37' : '#444', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.2em' }}>{l}</button> ))}
          </div>
        </header>

        <main style={{ minHeight: '300px', padding: '0 20px' }}>
          <AnimatePresence mode="wait">
            <motion.div key={sectionIndex + activeLang} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
              <h2 style={{ fontSize: '24px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '40px', textAlign: 'center' }}>{sections[sectionIndex].title[activeLang]}</h2>
              <p style={{ fontSize: '20px', fontWeight: '300', lineHeight: '1.6', textAlign: 'justify', borderLeft: '3px solid #D4AF37', paddingLeft: '35px', color: '#ccc' }}>{sections[sectionIndex].content[activeLang]}</p>
            </motion.div>
          </AnimatePresence>
        </main>

        {/* FOOTER UNIFICADO - DOS LÍNEAS DE FIRMA */}
        <footer style={{ marginTop: '120px', borderTop: '1px solid rgba(212, 175, 55, 0.2)', paddingTop: '30px', paddingBottom: '80px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'monospace', fontSize: '9px', textTransform: 'uppercase' }}>
            
            <div style={{ flex: 1, color: '#555', textAlign: 'left', letterSpacing: '0.1em' }}>
               ART_VISITS: <span style={{ color: '#D4AF37' }}>{stats.article}</span>
            </div>

            <div style={{ flex: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ color: '#fff', fontWeight: '900', letterSpacing: '0.6em', fontSize: '12px' }}>
                VIA51 ANTIGRAVITY
              </div>
              <div style={{ color: '#D4AF37', fontWeight: '400', letterSpacing: '0.2em', fontSize: '9px', opacity: 0.8 }}>
                ARQUITECTURA DIGITAL DE CALIDAD MUNDIAL
              </div>
            </div>

            <div style={{ flex: 1, color: '#555', textAlign: 'right', letterSpacing: '0.1em' }}>
               NETWORK_TOTAL: <span style={{ color: '#D4AF37' }}>{stats.global}</span>
            </div>

          </div>
        </footer>
      </div>
    </div>
  );
}