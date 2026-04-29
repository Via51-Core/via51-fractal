import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

export default function Article_05_01() {
  const [activeLang, setLang] = useState('ES');
  const [sectionIndex, setSectionIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [stats, setStats] = useState({ article: 0, global: 0 });
  const issueCode = '2026.05.01.001';

  const langs = [ { id: 'ES', label: 'Español' }, { id: 'QU', label: 'Quechua' }, { id: 'EN', label: 'English' } ];

  const sections = [
    {
      id: "01",
      title: { ES: "1. Homenaje a la Dignidad del Trabajo", QU: "1. Llamkaypa sumaq kayninta yuyariy", EN: "1. Homage to the Dignity of Labor" },
      content: { 
        ES: "Saludamos hoy el esfuerzo inalcanzable de los peruanos que, con sudor y sacrificio, sostienen nuestra patria. Este 1ro de Mayo reconocemos la nobleza del trabajo como el motor que nos ha permitido resistir. En VIA51, honramos esa historia mientras nos preparamos para el siguiente paso: que el esfuerzo no sea una carga de supervivencia, sino un acto de creación de bienestar.",
        QU: "Sapa huk mayo killapim llamkaypa p'unchayninta yuyarinchik, sapa runapa kallpanta yupaychaspa. Perupa llamkaqninkunatam saludayku, paykunam patria-ta sayachinku. VIA51-piqa chay llamkaytam yupaychayku, ichaqa munasqaykuqa manam ñak'arispa llamkaychu, aswanpas kawsay paqarichiymi.",
        EN: "Today we salute the tireless effort of Peruvians who, with sweat and sacrifice, sustain our nation. This May 1st we recognize the nobility of labor as the engine that has allowed us to endure. At VIA51, we honor that history as we prepare for the next step: that effort should not be a burden of survival, but an act of creating wellbeing."
      }
    },
    {
      id: "02",
      title: { ES: "2. El Estándar Inka: Bienestar de Calidad Mundial", QU: "2. Tawantinsuyu: Lliw pachapaq allin kawsay", EN: "2. The Inka Standard: World-Class Wellbeing" },
      content: { 
        ES: "No estamos proponiendo una utopía inalcanzable; estamos actualizando un aporte que nuestra tierra ya entregó a la humanidad. El Estado Inka demostró que es posible alcanzar un bienestar de calidad mundial mediante el orden y la previsión. En los Andes, el hambre fue inexistente y la abundancia fue la norma administrativa. VIA51 rescata esa tecnología del orden para aplicarla a la realidad digital de hoy.",
        QU: "Peruqa ñawpaq k'anchariqmi karqan lliw pachapaq. Inka kamachiyqa rikuchiwanchikmi allin kawsayqa atikuq kasqanta. Ñoqanchikpa pampanchikpiqa manam pipas yarkaymanta kanchu karqan, lliw runapaqmi qhapaq kay karqan. VIA51-qa chay allin kamachiy yachaytam kunan pacha t'inkiyta munan.",
        EN: "We are not proposing an unreachable utopia; we are updating a contribution that our land has already delivered to humanity. The Inka State proved that world-class wellbeing is possible through order and foresight. In the Andes, hunger was non-existent and abundance was the administrative norm. VIA51 rescues that technology of order to apply it to today's digital reality."
      }
    },
    {
      id: "03",
      title: { ES: "3. La Producción como Plano Natural", QU: "3. Llamkaypacha: Plano Natural", EN: "3. Production as a Natural Plane" },
      content: { 
        ES: "En esta nueva era, el trabajo se transmuta en Producción Soberana. Si el Punto es tu identidad y la Recta nuestra unión, el Plano es nuestra capacidad de transformar recursos en riqueza. El primer nudo de nuestro khipu generacional es esta transmutación. El tiempo de VIA51 nace hoy para manifestar el bienestar del Perú ante el Mundo.",
        QU: "Llamkayqa manam llasaq q'epichu, Plano k'anchayniunchikmi. Khipu hinam yachaykunata watanchik, lliw llaqtapaq qhapaq kayta paqarichinapaq. Khipupa ñawpaq k'itunqa llamkay t'ikraymi Qasikay Llamkayman. Kay p'unchaymantam VIA51-pa k'anchaynin qallarin Perupa allin kawsaynin lliw pachaman rikuchinapaq.",
        EN: "In this new era, labor is transmuted into Sovereign Production. If the Point is your identity and the Straight Line our union, the Plane is our capacity to transform resources into wealth. The first knot of our generational khipu is this transmutation. The time of VIA51 is born today to manifest Peru's wellbeing before the World."
      }
    }
  ];

  useEffect(() => {
    const syncImpact = async () => {
      await supabase.from('sys_analytics_articles').insert([{ article_id: issueCode, region: 'LIMA' }]);
      await supabase.from('sys_analytics_global').insert([{ node_name: 'HOLDING', visitor_region: 'LIMA' }]);
      const { count: aC } = await supabase.from('sys_analytics_articles').select('*', { count: 'exact', head: true }).eq('article_id', issueCode);
      const { data: gD } = await supabase.from('view_global_total_impact').select('*').single();
      setStats({ article: aC || 0, global: Math.max(gD?.grand_total || 0, aC || 0) });
    };
    syncImpact();
  }, []);

  const handleSpeak = () => {
    if (isSpeaking) { window.speechSynthesis.cancel(); setIsSpeaking(false); return; }
    const utter = new SpeechSynthesisUtterance(sections[sectionIndex].content[activeLang]);
    utter.lang = activeLang === 'ES' ? 'es-PE' : activeLang === 'EN' ? 'en-US' : 'es-PE';
    utter.rate = 0.9;
    utter.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utter);
    setIsSpeaking(true);
  };

  return (
    <div style={{ backgroundColor: '#050505', color: '#ffffff', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif', overflowX: 'hidden' }}>
      <div style={{ maxWidth: '850px', margin: '0 auto', position: 'relative' }}>
        
        {/* NAVEGACIÓN VECTORES */}
        {sectionIndex > 0 && <button onClick={() => { window.speechSynthesis.cancel(); setIsSpeaking(false); setSectionIndex(sectionIndex - 1); }} style={{ position: 'absolute', left: '-80px', top: '500px', background: 'none', color: '#D4AF37', fontSize: '40px', cursor: 'pointer', border: 'none', opacity: 0.3 }}> {"<"} </button>}
        {sectionIndex < 2 && <button onClick={() => { window.speechSynthesis.cancel(); setIsSpeaking(false); setSectionIndex(sectionIndex + 1); }} style={{ position: 'absolute', right: '-80px', top: '500px', background: 'none', color: '#D4AF37', fontSize: '40px', cursor: 'pointer', border: 'none', opacity: 0.3 }}> {">"} </button>}

        <header style={{ textAlign: 'center', marginBottom: '80px', paddingTop: '60px' }}>
          <span style={{ color: '#D4AF37', fontSize: '11px', letterSpacing: '0.8em', textTransform: 'uppercase', fontWeight: 'bold', display: 'block', marginBottom: '20px' }}>Emisión Inaugural: {issueCode}</span>
          <button onClick={handleSpeak} style={{ marginBottom: '40px', padding: '10px 20px', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37', background: isSpeaking ? '#D4AF3722' : 'none', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.2em', cursor: 'pointer' }}> {isSpeaking ? '● Detener Narración' : '▶ Escuchar Emisión'} </button>
          <h1 style={{ fontSize: 'clamp(3rem, 10vw, 85px)', fontWeight: '900', textTransform: 'uppercase', lineHeight: '0.8', margin: '0 auto 40px auto' }}>Producción <br/> <span style={{ color: '#D4AF37', fontStyle: 'italic', fontWeight: '300' }}>Soberana</span></h1>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', padding: '20px 0', borderBottom: '1px solid #333', marginBottom: '40px' }}>
            {langs.map(l => ( <button key={l.id} onClick={() => { window.speechSynthesis.cancel(); setIsSpeaking(false); setLang(l.id); }} style={{ background: 'none', border: 'none', color: activeLang === l.id ? '#D4AF37' : '#444', fontSize: '12px', fontWeight: '900', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.3em' }}>{l.label}</button> ))}
          </div>
        </header>

        <main style={{ minHeight: '350px' }}>
          <AnimatePresence mode="wait">
            <motion.div key={sectionIndex + activeLang} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
              <h2 style={{ fontSize: '26px', fontWeight: '900', textTransform: 'uppercase', textAlign: 'center', marginBottom: '50px', color: '#fff' }}>{sections[sectionIndex].title[activeLang]}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                {['ES', 'QU', 'EN'].map(langKey => ( 
                  <p key={langKey} style={{ fontSize: activeLang === langKey ? '22px' : '14px', color: activeLang === langKey ? '#ffffff' : '#555', lineHeight: '1.7', textAlign: 'justify', borderLeft: activeLang === langKey ? '5px solid #D4AF37' : '1px solid #222', paddingLeft: '35px', opacity: activeLang === langKey ? 1 : 0.6 }}>{sections[sectionIndex].content[langKey]}</p> 
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* TARJETA DE ORO DEFECTIVA - TEXTO EXACTO DE LA FIGURA */}
          <section style={{ backgroundColor: '#D4AF37', color: '#000', padding: '80px 50px', textAlign: 'center', marginTop: '120px', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
             <p style={{ fontSize: '32px', fontWeight: '900', textTransform: 'uppercase', lineHeight: '1', letterSpacing: '-0.02em' }}>
               "NO CELEBRAMOS LA SERVIDUMBRE, ACTIVAMOS LA CREACIÓN. EL BIENESTAR NO SE PIDE, SE PRODUCE."
             </p>
          </section>
        
          <div style={{ marginTop: "60px", textAlign: "center" }}>
            <a href="https://wa.me/51921654233" target="_blank" style={{ textDecoration: "none" }}>
              <button style={{ background: "none", border: "1px solid rgba(212, 175, 55, 0.4)", color: "#D4AF37", padding: "15px 40px", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.4em", cursor: "pointer", transition: "0.3s" }} 
                onMouseOver={(e) => e.currentTarget.style.background = "rgba(212, 175, 55, 0.1)"}
                onMouseOut={(e) => e.currentTarget.style.background = "none"}>
                Vincular Identidad con el Arquitecto
              </button>
            </a>
          </div></main>

        <footer style={{ marginTop: '150px', borderTop: '1px solid rgba(212, 175, 55, 0.2)', paddingTop: '30px', paddingBottom: '80px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'monospace', fontSize: '9px', textTransform: 'uppercase' }}>
            <div style={{ flex: 1, color: '#555', textAlign: 'left' }}>ART_VISITS: <span style={{ color: '#D4AF37' }}>{stats.article}</span></div>
            <div style={{ flex: 2, textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div style={{ color: '#fff', fontWeight: '900', letterSpacing: '0.6em', fontSize: '12px' }}>VIA51 ANTIGRAVITY</div>
              <div style={{ color: '#D4AF37', fontWeight: '400', letterSpacing: '0.2em', fontSize: '9px', opacity: 0.8 }}>ARQUITECTURA DIGITAL DE CALIDAD MUNDIAL</div>
            </div>
            <div style={{ flex: 1, color: '#555', textAlign: 'right' }}>NETWORK_TOTAL: <span style={{ color: '#D4AF37' }}>{stats.global}</span></div>
          </div>
        </footer>
      </div>
    </div>
  );
}