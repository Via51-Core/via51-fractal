import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Article_001() {
  const [activeLang, setLang] = useState('ES');
  const issueCode = '2026.04.28.001';

  const langs = [
    { id: 'ES', label: 'Español' },
    { id: 'QU', label: 'Quechua' },
    { id: 'EN', label: 'English' }
  ];

  const sections = [
    {
      id: "01",
      title: { 
        ES: "1. El Virus del Abandono (Político): La Vacuna contra el Futuro", 
        QU: "1. Saqerpayaypa unquynin (política): Hamuq pachapaq t'uksiy", 
        EN: "1. The Virus of Abandonment (Political): The Vaccine against the Future" 
      },
      content: { 
        ES: "Desde nuestra infancia, una infección invisible ha recorrido el sistema nervioso del Perú. Se nos ha 'vacunado' con una frase que parece prudencia pero es veneno: 'Ni te metas en política, porque la política es de lo peor'. Este es el Virus del Abandono. Su objetivo no es protegernos, sino que abandonemos el escenario para que las fuerzas perniciosas ocupen el Punto de Origen de la voluntad nacional. Al abandonar la política, hemos permitido el 'descopamiento' de las elites pro-bien común, dejando el timón del país en manos de una incompetencia filtrada y premeditada. En VIA51, declaramos que rescatar la política del abandono es nuestra primera urgencia.",
        QU: "Warmacha kasqanchikmantapacha, mana rikuna unquymi Perupa sirk'ankunapi puriykun. 'Amam politicaman yaykunkichu, chayqa mana allinmi' nispa t'uksiwarqanchik. Kayqa Saqerpayaypa Unquyninmi. Manam amachawasqanchikpaqchu, aswanpas politicata saqenanchikpaqmi, chaynapi mana allin runakuna kamachinankupaq. Políticata saqespa, allin ruraq runakunatam qarqonku, chaynapi mana yachayniyoq runakuna kikinpa munasqallanpaq kamachinankupaq. VIA51-piqa nikuikum: política saqeytaqa tukunanchikmi, chaymi allinchananchik ñawpaqtaqa.",
        EN: "Since our childhood, an invisible infection has traveled through Peru's nervous system. We have been 'vaccinated' with a phrase that seems like prudence but is poison: 'Don't get involved in politics, because it is the worst'. This is the Virus of Abandonment. Its goal is not to protect us, but to make us abandon the stage so that pernicious forces occupy the Point of Origin of the national will. By abandoning politics, we have allowed the displacement of pro-common good elites, leaving the country's helm in the hands of a filtered incompetence. In VIA51, we declare that rescuing politics from abandonment is our first urgency."
      }
    },
    {
      id: "02",
      title: { 
        ES: "2. La Falacia de la 'Potencia' sin Bienestar", 
        QU: "2. Llimp'iyuq kaypa llullan, mana allin kawsaywan", 
        EN: "2. The Fallacy of 'Power' without Wellbeing" 
      },
      content: { 
        ES: "El Perú ya ha sido potencia mundial en oro, plata, guano, pesca, hierro y cobre. Sin embargo, esa 'potencia' solo ha dejado un rastro de exterminio y pobreza extrema. Ser una 'potencia en cosas' no sirve de nada si no somos una Potencia en Bienestar. VIA51 propone una Soberanía de Desarrollo de Calidad Mundial en una sola generación.",
        QU: "Peruqa ñawpaq k'anchariqmi karqan qoripi, qolqepi, wanupi, challwakunapipas... ichaqa chay llimp'iyuq kayqa wakcha kayllatam llaqtapaq saqerqan. 'Imakunallapi' kallpayuq kayqa manam valenchu, mana sapa runa allin kawsaypi kaptinqa. VIA51 nisqaykuqa huk wiñayllapim lliw pachapaq allin kawsayta paqarichimunqa.",
        EN: "Peru has already been a world power in gold, silver, guano, fishing, iron, and copper. However, that 'power' has only left a trail of extermination and extreme poverty. Being a 'power in things' is useless if we are not a Power in Wellbeing. VIA51 proposes a Sovereignty of World-Class Development in a single generation."
      }
    }
  ];

  return (
    <div style={{ backgroundColor: '#050505', color: '#ffffff', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '850px', margin: '0 auto' }}>
        
        <header style={{ textAlign: 'center', marginBottom: '80px', paddingTop: '60px' }}>
          <span style={{ color: '#D4AF37', fontSize: '12px', letterSpacing: '0.6em', textTransform: 'uppercase', display: 'block', marginBottom: '20px', fontWeight: '900' }}>
            Emisión Soberana: {issueCode}
          </span>
          <h1 style={{ fontSize: 'clamp(3rem, 10vw, 85px)', fontWeight: '900', textTransform: 'uppercase', lineHeight: '0.8', margin: '0 auto 40px auto', letterSpacing: '-0.04em' }}>
            Sufragio <br/> <span style={{ color: '#D4AF37', fontStyle: 'italic', fontWeight: '300' }}>Prospectivo</span>
          </h1>

          {/* SELECTOR IDIOMÁTICO - NITIDEZ REFORZADA */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', padding: '25px 0', borderBottom: '1px solid #333' }}>
            {langs.map(l => (
              <button key={l.id} onClick={() => setLang(l.id)} style={{
                background: 'none', border: 'none', 
                color: activeLang === l.id ? '#D4AF37' : '#999', // Gris más claro para nitidez
                fontSize: '13px', fontWeight: '900', cursor: 'pointer', textTransform: 'uppercase', 
                letterSpacing: '0.3em', transition: 'all 0.3s ease'
              }}>
                {activeLang === l.id ? `[ ${l.label} ]` : l.label}
              </button>
            ))}
          </div>
        </header>

        <main>
          {sections.map(section => (
            <div key={section.id} style={{ marginBottom: '120px' }}>
              <h2 style={{ fontSize: '26px', fontWeight: '900', textTransform: 'uppercase', textAlign: 'center', marginBottom: '50px', color: '#fff' }}>
                {section.title[activeLang]}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '45px' }}>
                {['ES', 'QU', 'EN'].map(langKey => (
                  <p key={langKey} style={{ 
                    fontSize: activeLang === langKey ? '23px' : '15px',
                    color: activeLang === langKey ? '#ffffff' : '#777', // Blanco puro para activo, gris fuerte para pasivo
                    lineHeight: activeLang === langKey ? '1.6' : '1.3',
                    fontWeight: activeLang === langKey ? '300' : '400',
                    transition: 'all 0.5s ease',
                    textAlign: 'justify',
                    borderLeft: activeLang === langKey ? '5px solid #D4AF37' : '1px solid #333',
                    paddingLeft: '40px',
                    opacity: activeLang === langKey ? 1 : 0.7
                  }}>
                    {section.content[langKey]}
                  </p>
                ))}
              </div>
            </div>
          ))}

          {/* MANTRA DE TRANSMUTACIÓN - MÁXIMA NITIDEZ */}
          <section style={{ backgroundColor: '#D4AF37', color: '#000', padding: '80px 50px', textAlign: 'center', marginTop: '120px', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
             <h4 style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.6em', marginBottom: '35px', fontWeight: '900', opacity: 0.7 }}>Mantra de Transmutación</h4>
             <p style={{ fontSize: '34px', fontWeight: '900', textTransform: 'uppercase', lineHeight: '1', marginBottom: '0' }}>
               "{activeLang === 'ES' ? "No requerimos tu voto, solicitamos tu atención deliberada. Te invitamos a transmutar tu mentalidad; el bienestar de clase mundial nace en el momento en que decides ver el fractal completo." : 
                 activeLang === 'QU' ? "Manam votoykitachu munayku, yuyayniykita chaskinaykutam munayku. Ñawinchikta kicharisun pacha t'ikranapaq; allin kawsayqa yuyayninchikpi qallarin." :
                 "We do not seek your vote; we request your deliberate attention. We invite you to shift your mindset; world-class wellbeing is born the moment you choose to see the full fractal."}"
             </p>
          </section>
        </main>

        {/* FOOTER REFORMULADO - NITIDEZ TOTAL */}
        <footer style={{ marginTop: '150px', borderTop: '2px solid #D4AF37', paddingTop: '60px', paddingBottom: '120px', textAlign: 'center' }}>
          <span style={{ fontSize: '12px', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.8em', fontWeight: '900' }}>
            VIA51 // ARQUITECTURA DIGITAL DE CALIDAD MUNDIAL
          </span>
        </footer>
      </div>
    </div>
  );
}