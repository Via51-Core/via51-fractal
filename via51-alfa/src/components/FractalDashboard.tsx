import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Shield, Activity, Cpu, Hexagon, Database, LayoutPanelTop } from 'lucide-react';

export const FractalDashboard = () => {
    const [nodes, setNodes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNodes = async () => {
            const { data } = await supabase.from('sys_registry').select('*').order('node_path');
            if (data) setNodes(data);
            setLoading(false);
        };
        fetchNodes();
    }, []);

    const config = [
        { id: 0, label: 'NÚCLEO CENTRAL', icon: <Cpu className="text-blue-500" /> },
        { id: 1, label: 'DEPARTAMENTOS', icon: <LayoutPanelTop className="text-emerald-500" /> },
        { id: 2, label: 'TRÍADAS OPERATIVAS', icon: <Activity className="text-amber-500" /> },
        { id: 3, label: 'NODOS DE EJECUCIÓN', icon: <Database className="text-purple-500" /> }
    ];

    if (loading) return (
        <div className="h-screen bg-[#020617] flex items-center justify-center text-blue-500 font-mono animate-pulse uppercase tracking-widest">
            Sincronizando Ecosistema Vía 51...
        </div>
    );

    return (
        <div className="min-h-screen bg-[#020617] p-10 font-sans selection:bg-blue-500/30">
            <header className="flex justify-between items-end mb-16 border-b border-slate-800 pb-8">
                <div>
                    <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic leading-none">
                        Via51 <span className="text-blue-600">Antigravity</span>
                    </h1>
                    <p className="text-slate-500 font-mono text-[10px] tracking-[0.4em] uppercase mt-3">
                        Holding Digital Soberano // Control de Tráfico Hub-Beta
                    </p>
                </div>
                <div className="flex items-center gap-4 bg-slate-900 border border-blue-500/20 px-6 py-3 rounded-xl shadow-2xl">
                    <Shield size={20} className="text-blue-500 animate-pulse" />
                    <span className="text-xs font-black uppercase text-blue-400 tracking-widest">Soberanía Activa</span>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                {config.map((lvl) => (
                    <div key={lvl.id} className="space-y-6">
                        <div className="flex items-center gap-3 border-l-2 border-slate-700 pl-4 py-2 bg-slate-900/30 rounded-r-lg">
                            {lvl.icon}
                            <h2 className="text-xs font-black text-slate-400 tracking-widest uppercase">{lvl.label}</h2>
                        </div>
                        <div className="space-y-4">
                            {nodes.filter(n => n.level === lvl.id).map(node => (
                                <div key={node.id} className="bg-[#0a1024] border border-slate-800/80 p-5 rounded-xl transition-all hover:border-blue-500/50 group shadow-lg">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-[9px] font-mono text-slate-600 group-hover:text-blue-400">{node.node_path}</span>
                                        <Hexagon size={12} className="text-slate-800 group-hover:text-blue-500/40" />
                                    </div>
                                    <h3 className="text-slate-200 font-black text-sm uppercase group-hover:text-white transition-colors">
                                        {node.node_name}
                                    </h3>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};