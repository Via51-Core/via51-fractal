import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';

export default function Article001() {
  const [analytics, setAnalytics] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const trackVisit = async () => {
      // En producción, detectar región por IP. Aquí simulamos 'LIMA'
      await supabase.from('sys_reader_analytics').insert([{ region: 'LIMA', device_type: 'PC' }]);
      fetchAnalytics();
    };
    const fetchAnalytics = async () => {
      const { data } = await supabase.from('view_reader_distribution').select('*');
      if (data) {
        setAnalytics(data);
        setTotal(data.reduce((acc, curr) => acc + curr.total_readers, 0));
      }
    };
    trackVisit();
  }, []);

  return (
    <div className="min-h-screen bg-[#020202] text-white p-8 md:p-24 font-sans selection:bg-v51-gold selection:text-black">
      <header className="max-w-4xl mx-auto mb-20 border-b border-white/5 pb-10">
        <span className="text-v51-gold font-mono text-[10px] tracking-[0.5em] uppercase">Emisión Soberana: 2026.04.28.001</span>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mt-4 uppercase italic">
          Sufragio <br/> <span className="text-v51-gold not-italic font-light">Prospectivo</span>
        </h1>
        <p className="mt-8 text-xl text-gray-500 font-light">Por: Héctor Bazalar</p>
      </header>

      <main className="max-w-3xl mx-auto space-y-12 text-lg leading-relaxed text-gray-300 font-light">
        <section className="border-l-2 border-v51-gold pl-8 py-4 bg-white/[0.02]">
          <h2 className="text-v51-gold font-bold uppercase text-sm mb-4">1. El Virus del Silencio</h2>
          <p>Se nos ha "vacunado" con una frase que parece prudencia pero es veneno: <span className="italic text-white">"Ni te metas en política, porque la política es de lo peor"</span>. Este es el Virus del Silencio.</p>
        </section>

        <section>
          <h2 className="text-v51-gold font-bold uppercase text-sm mb-4">2. La Falacia de la "Potencia"</h2>
          <p>El Perú ya ha sido potencia mundial en oro, plata, guano... Esa "potencia" solo ha dejado un rastro de exterminio. Ser una "potencia en cosas" no sirve de nada si no somos una <strong>Potencia en Bienestar</strong>.</p>
        </section>

        {/* ... Resto del contenido inyectado dinámicamente ... */}
        
        <div className="mt-32 p-12 bg-v51-gold/5 border border-v51-gold/20 text-center">
          <p className="text-v51-gold font-mono text-xs mb-4 tracking-[0.5em] uppercase">Mantra de la Revelación</p>
          <p className="text-2xl italic font-light">"No pedimos tu voto para que descanses, pedimos tu vinculación para que despiertes."</p>
        </div>
      </main>

      {/* BARRA LATERAL DE ANALÍTICA (REVELACIÓN) */}
      <aside className="fixed bottom-10 left-10 w-64 p-6 bg-black border border-white/5 font-mono">
        <h4 className="text-[8px] text-gray-500 uppercase mb-4 tracking-widest">Impacto Regional en Vivo</h4>
        <div className="space-y-2">
          {analytics.map(r => (
            <div key={r.region} className="flex justify-between text-[10px]">
              <span className="text-gray-400">{r.region}</span>
              <span className="text-v51-gold">{r.total_readers}</span>
            </div>
          ))}
          <div className="border-t border-white/10 pt-2 mt-4 flex justify-between text-[11px] font-bold">
            <span>TOTAL_LECTORES</span>
            <span className="text-green-500">{total}</span>
          </div>
        </div>
      </aside>
    </div>
  );
}