import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

export default function Article_05_02() {
  const [activeLang, setLang] = useState('ES');
  const [sectionIndex, setSectionIndex] = useState(0);
  const [stats, setStats] = useState([]);
  const issueCode = '2026.05.02.001';

  const langs = [ { id: 'ES', label: 'Español' }, { id: 'QU', label: 'Quechua' }, { id: 'EN', label: 'English' } ];

  const sections = [
    {
      id: "01",
      title: { ES: "1. El Virus del Abandono (Político)", QU: "1. Saqerpayaypa unquynin (política)", EN: "1. The Virus of Abandonment (Political)" },
      content: { 
        ES: "Desde nuestra infancia, una infección invisible ha recorrido el sistema nervioso del Perú. Se nos ha 'vacunado' con una frase que parece prudencia pero es veneno: 'Ni te metas en política'. Este es el Virus del Abandono. Su objetivo es que abandonemos el escenario para que las fuerzas perniciosas ocupen la voluntad nacional.",
        QU: "Warmacha kasqanchikmantapacha, mana rikuna unquymi Perupa sirk'ankunapi puriykun. 'Amam politicaman yaykunkichu' nispa t'uksiwarqanchik. Kayqa Saqerpayaypa Unquyninmi. Manam amachawasqanchikpaqchu, aswanpas politicata saqenanchikpaqmi.",
        EN: "Since our childhood, an invisible infection has traveled through Peru's nervous system. We have been 'vaccinated' with a phrase that seems like prudence but is poison: 'Don't get involved in politics'. This is the Virus of Abandonment."
      }
    },
    {
      id: "02",
      title: { ES: "2. La Falacia de la 'Potencia' sin Bienestar", QU: "2. Llimp'iyuq kaypa llullan", EN: "2. The Fallacy of 'Power' without Wellbeing" },
      content: { 
        ES: "El Perú ya ha sido potencia mundial en oro, plata, guano, pesca, hierro y cobre. Sin embargo, esa 'potencia' solo ha dejado un rastro de exterminio y pobreza extrema. Ser una 'potencia en cosas' no sirve de nada si no somos una Potencia en Bienestar. VIA51 propone una Soberanía de Desarrollo de Calidad Mundial.",
        QU: "Peruqa ñawpaq k'anchariqmi karqan qoripi, qolqepi, wanupi, challwakunapipas... ichaqa chay llimp'iyuq kayqa wakcha kayllatam llaqtapaq saqerqan. 'Imakunallapi' kallpayuq kayqa manam valenchu, mana sapa runa allin kawsaypi kaptinqa.",
        EN: "Peru has already been a world power in gold, silver, guano, fishing, iron, and copper. However, that 'power' has only left a trail of extermination and extreme poverty. Being a 'power in things' is useless if we are not a Power in Wellbeing."
      }
    },
    {
      id: "03",
      title: { ES: "3. El Sufragio Prospectivo: El Fin de la Urna Analógica", QU: "3. Hamuq pacha akllay: Mawk'a urna t'ikray", EN: "3. Prospective Suffrage: The End of the Analog Ballot Box" },
      content: { 
        ES: "La democracia analógica se basa en la 'Urna', un acto puntual, pasivo y muerto. VIA51 introduce el Sufragio Prospectivo Vinculante (SPV). Es la transición de ser un 'votante' a ser un Arquitecto Fractal en donde tu voluntad es una señal de identidad continua y educada.",
        QU: "Democracia nisqankuqa mawk'am kachkan. Urnallapim yuyaykunku, chayqa wañusqa ruraymi. VIA51-qa Hamuq Pacha Akllaytam (SPV) apamun. Manañam 'votante' kankichu, kunanqa kawsaypa Wasichaqninmi kanki.",
        EN: "Analog democracy is based on the 'Ballot Box', a punctual, passive, and dead act. VIA51 introduces Binding Prospective Suffrage (SPV). It is the transition from being a 'voter' to being a Fractal Architect."
      }
    }
  ];

  useEffect(() => {
    const sync = async () => {
      await supabase.from('sys_analytics_articles').insert([{ article_id: issueCode, region: 'LIMA' }]);
      const { data } = await supabase.from('view_readers_summary').select('*').eq('article_id', issueCode);
      if (data) setStats(data);
    };
    sync();
  }, []);

  const next = () => { if (sectionIndex < sections.length - 1) setSectionIndex(sectionIndex + 1); };
  const prev = () => { if (sectionIndex > 0) setSectionIndex(sectionIndex - 1); };

  return (
    <div style={{ backgroundColor: '#050505', color: '#ffffff', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif', position: 'relative' }}>
      {sectionIndex > 0 && <button onClick={prev} style={{ position: 'fixed', left: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212, 175, 55, 0.2)', color: '#D4AF37', fontSize: '30px', width: '60px', height: '100px', cursor: 'pointer', zIndex: 100 }}> {"<"} </button>}
      {sectionIndex < sections.length - 1 && <button onClick={next} style={{ position: 'fixed', right: '20px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(212,175,55,0.05)', border: '1px solid rgba(212, 175, 55, 0.2)', color: '#D4AF37', fontSize: '30px', width: '60px', height: '100px', cursor: 'pointer', zIndex: 100 }}> {">"} </button>}

      <div style={{ maxWidth: '850px', margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: '80px', paddingTop: '40px' }}>
          <span style={{ color: '#D4AF37', fontSize: '12px', letterSpacing: '0.6em', textTransform: 'uppercase', fontWeight: '900' }}>Emisión Soberana: {issueCode}</span>
          <h1 style={{ fontSize: 'clamp(3rem, 10vw, 85px)', fontWeight: '900', textTransform: 'uppercase', lineHeight: '0.8', margin: '40px 0' }}>Sufragio <br/> <span style={{ color: '#D4AF37', fontStyle: 'italic', fontWeight: '300' }}>Prospectivo</span></h1>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', padding: '20px 0', borderBottom: '1px solid #333', marginBottom: '40px' }}>
            {langs.map(l => ( <button key={l.id} onClick={() => setLang(l.id)} style={{ background: 'none', border: 'none', color: activeLang === l.id ? '#D4AF37' : '#999', fontSize: '13px', fontWeight: '900', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.3em' }}>{l.label}</button> ))}
          </div>
        </header>

        <main>
          <AnimatePresence mode="wait">
            <motion.div key={sectionIndex + activeLang} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }}>
              <h2 style={{ fontSize: '26px', fontWeight: '900', textTransform: 'uppercase', textAlign: 'center', marginBottom: '50px' }}>{sections[sectionIndex].title[activeLang]}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '45px' }}>
                {['ES', 'QU', 'EN'].map(langKey => ( <p key={langKey} style={{ fontSize: activeLang === langKey ? '23px' : '15px', color: activeLang === langKey ? '#ffffff' : '#777', lineHeight: '1.6', textAlign: 'justify', borderLeft: activeLang === langKey ? '5px solid #D4AF37' : '1px solid #333', paddingLeft: '40px', opacity: activeLang === langKey ? 1 : 0.7 }}>{sections[sectionIndex].content[langKey]}</p> ))}
              </div>
            </motion.div>
          </AnimatePresence>
          <section style={{ backgroundColor: '#D4AF37', color: '#000', padding: '80px 50px', textAlign: 'center', marginTop: '100px' }}>
             <p style={{ fontSize: '32px', fontWeight: '900', textTransform: 'uppercase', lineHeight: '1' }}>"No requerimos tu voto, solicitamos tu atención deliberada. Te invitamos a transmutar tu mentalidad."</p>
          </section>
        </main>
        
        <footer style={{ marginTop: '100px', borderTop: '2px solid #D4AF37', paddingTop: '60px', paddingBottom: '80px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '40px' }}>
            {stats.map(s => (
              <div key={s.region}>
                <span style={{ fontSize: '24px', fontWeight: '900', color: '#fff', display: 'block' }}>{s.total_readers}</span>
                <span style={{ fontSize: '10px', color: '#D4AF37', textTransform: 'uppercase' }}>{s.region}</span>
              </div>
            ))}
          </div>
          <span style={{ fontSize: '12px', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.8em', fontWeight: '900' }}>VIA51 // ARQUITECTURA DIGITAL DE CALIDAD MUNDIAL</span>
        </footer>
      </div>
    </div>
  );
}