import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Terminal, ShieldAlert, Cpu, Eye } from 'lucide-react';

interface AuditEvent {
    id: string;
    timestamp: string;
    actor_id: string;
    action_type: string;
    payload_snapshot: any;
    status: 'SUCCESS' | 'FAILURE';
    node_id: string;
}

const CommandCenter: React.FC = () => {
    const [logs, setLogs] = useState<AuditEvent[]>([]);

    useEffect(() => {
        // 1. Cargar logs históricos iniciales
        const fetchInitialLogs = async () => {
            const { data } = await supabase
                .from('sys_events')
                .select('*')
                .order('timestamp', { ascending: false })
                .limit(50);
            if (data) setLogs(data);
        };

        fetchInitialLogs();

        // 2. ESCUCHA EN TIEMPO REAL (Realtime)
        // Cada vez que el HUB (Beta) procesa algo, Gamma lo recibe instantáneamente.
        const channel = supabase
            .channel('audit_stream')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'sys_events' },
                payload => {
                    setLogs(prev => [payload.new as AuditEvent, ...prev]);
                })
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, []);

    return (
        <div className="bg-black min-h-screen text-green-500 font-mono p-6">
            {/* Cabecera de Comando Superior */}
            <header className="border-b-2 border-green-900 pb-4 mb-6 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <div className="bg-green-900/30 p-2 rounded-full animate-pulse">
                        <Cpu className="text-green-400" size={32} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black tracking-widest uppercase">Via51 Gamma Intelligence</h1>
                        <p className="text-xs text-green-700">SUPERVISIÓN SOBERANA: FREDY BAZALAR & RENZO BAZALAR</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-xs bg-green-900/20 px-3 py-1 border border-green-500/30 rounded">
                        ESTADO DEL HUB: <span className="text-white">ACTIVO / PROCESANDO</span>
                    </div>
                </div>
            </header>

            {/* Flujo de Eventos Forenses */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-2">
                    <h2 className="text-xs font-bold mb-4 flex items-center gap-2">
                        <Terminal size={14} /> LIVE EVENT STREAM_
                    </h2>
                    {logs.map((log) => (
                        <div
                            key={log.id}
                            className={`p-3 border-l-4 text-[11px] bg-zinc-950 flex justify-between items-center transition-all
                ${log.status === 'SUCCESS' ? 'border-green-600' : 'border-red-600'}`}
                        >
                            <div className="flex gap-4">
                                <span className="text-zinc-600">{new Date(log.timestamp).toLocaleTimeString()}</span>
                                <span className="font-bold text-green-400 uppercase">[{log.action_type}]</span>
                                <span className="text-zinc-400">Actor: {log.actor_id.substring(0, 8)}...</span>
                                <span className="text-zinc-500">Node: {log.node_id.substring(0, 8)}...</span>
                            </div>
                            <div className="flex gap-4">
                                <button className="text-green-800 hover:text-green-400 border border-green-900 px-2 rounded">
                                    VER PAYLOAD
                                </button>
                                <span className={log.status === 'SUCCESS' ? 'text-green-500' : 'text-red-500'}>
                                    ● {log.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Panel Lateral de Estado de Inteligencia */}
                <div className="bg-zinc-950 border border-green-900/50 p-4 rounded">
                    <h2 className="text-xs font-bold mb-4 text-green-400 flex items-center gap-2">
                        <ShieldAlert size={14} /> ALERTAS DE SEGURIDAD
                    </h2>
                    <div className="text-[10px] text-zinc-500 space-y-4">
                        <p>● Sincronización con Nivel 0: <span className="text-green-500">OPTIMA</span></p>
                        <p>● Capacidad del Disco (HUB): <span className="text-green-500">99% LIBRE</span></p>
                        <p>● Sesiones Activas: <span className="text-white">2 (Fredy/Renzo)</span></p>
                        <div className="mt-8 border-t border-green-900 pt-4">
                            <p className="text-[9px] uppercase italic text-zinc-700">"El núcleo no conoce el dominio, pero el comando lo conoce todo."</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommandCenter;