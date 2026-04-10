import React, { useState, useEffect } from 'react';
import { supabase } from '@gamma/lib/supabaseClient';
import { SCHEMA } from '@gamma/lib/constants';

const DashboardMetricas: React.FC = () => {
  const [metricas, setMetricas] = useState<any[]>([]);
  const [totalVisitas, setTotalVisitas] = useState(0);

  const fetchMetricas = async () => {
    const { data } = await supabase
      .from(SCHEMA.TABLES.EVENTS)
      .select('payload, timestamp')
      .eq('action_type', 'VISIT');

    if (data) {
      setTotalVisitas(data.length);
      const resumen = data.reduce((acc: Record<string, number>, curr: any) => {
        const nombre = curr.payload?.client_name || 'Desconocido';
        acc[nombre] = (acc[nombre] || 0) + 1;
        return acc;
      }, {});
      setMetricas(Object.entries(resumen));
    }
  };

  useEffect(() => {
    fetchMetricas();

    const sub = supabase.channel('radar-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: SCHEMA.TABLES.EVENTS },
        () => fetchMetricas())
      .subscribe();

    return () => {
      supabase.removeChannel(sub);
    };
  }, []);

  return (
    <div className="p-10 bg-black min-h-screen text-white font-mono">
      <header className="flex justify-between items-end mb-12 border-b border-zinc-800 pb-8">
        <div>
          <h2 className="text-2xl font-black tracking-[0.2em]">VÍA 51 | TRAFFIC_CONTROL</h2>
          <p className="text-blue-500 text-[10px] mt-2 tracking-widest">SISTEMA_MULTI_TENANT_ACTIVO</p>
        </div>
        <div className="text-right">
          <p className="text-5xl font-black text-white leading-none">{totalVisitas}</p>
          <p className="text-[9px] opacity-40 tracking-[0.3em] uppercase mt-2">Impactos_Totales</p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-zinc-900/30 p-8 rounded-sm border border-zinc-800">
          <h3 className="text-[10px] font-bold mb-8 opacity-30 uppercase tracking-[0.2em]">Performance_by_Client</h3>
          {metricas.map(([cliente, visitas]) => (
            <div key={cliente} className="flex items-center justify-between py-5 border-b border-zinc-800/50 last:border-0">
              <span className="text-sm font-medium tracking-tight text-zinc-300">{cliente}</span>
              <div className="flex items-center gap-6">
                <div className="h-[2px] w-32 bg-zinc-800 overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: `${(visitas / totalVisitas) * 100}%` }} />
                </div>
                <span className="font-bold text-blue-500 text-sm">{visitas}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardMetricas;
