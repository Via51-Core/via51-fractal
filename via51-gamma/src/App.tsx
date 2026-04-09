import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';
import { Terminal, ShieldAlert, Activity } from 'lucide-react';

const App = () => {
  const [logs, setLogs] = useState<any[]>([]);

  useEffect(() => {
    // 1. Cargar últimos eventos
    const fetchLogs = async () => {
      const { data } = await supabase.from('sys_events').select('*').order('timestamp', { ascending: false }).limit(15);
      if (data) setLogs(data);
    };
    fetchLogs();

    // 2. Escucha Síncrona (Realtime)
    const channel = supabase.channel('gamma-monitor')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'sys_events' },
        payload => {
          setLogs(prev => [payload.new, ...prev]);
        }).subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  return (
    <div className="min-h-screen bg-black text-emerald-500 font-mono p-8">
      <header className="flex justify-between items-center border-b border-emerald-900/50 pb-6 mb-8">
        <div>
          <h1 className="text-lg font-bold tracking-widest uppercase flex items-center gap-3">
            <Terminal size={20} /> Via51 Gamma Intelligence
          </h1>
          <p className="text-[9px] text-emerald-800 uppercase mt-1">Supervisión Soberana // Fredy & Renzo</p>
        </div>
        <Activity className="animate-pulse text-emerald-400" size={20} />
      </header>

      <div className="space-y-3">
        {logs.map((log) => (
          <div key={log.id} className="text-[10px] flex gap-4 border-l border-emerald-900 pl-4 py-1 hover:bg-emerald-900/10 transition-all">
            <span className="text-emerald-900">[{new Date(log.timestamp).toLocaleTimeString()}]</span>
            <span className="font-bold text-emerald-400">ACTION: {log.action_type}</span>
            <span className="text-emerald-600">NODE: {log.node_id.substring(0, 8)}...</span>
            <span className="text-emerald-700 italic">DRIVER: {log.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;