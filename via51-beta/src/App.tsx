import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';

export default function App() {
    const [nodes, setNodes] = useState<any[]>([]);

    useEffect(() => {
        const fetchExternal = async () => {
            const { data } = await supabase
                .from('sys_registry')
                .select('*')
                .gte('level', 0)
                .order('level', { ascending: true })
                .order('node_path', { ascending: true });
            if (data) setNodes(data);
        };
        fetchExternal();
    }, []);

    return (
        <div className="min-h-screen bg-black text-white p-10 font-mono">
            <header className="mb-10 flex justify-between items-center border-b border-yellow-900/30 pb-6">
                <div>
                    <h1 className="text-xl font-bold text-yellow-500 uppercase tracking-tighter italic">Vía51 // Beta Hub</h1>
                    <p className="text-[10px] text-zinc-500 uppercase mt-1">Control de Tráfico Fractal Externo</p>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-black text-zinc-200">{nodes.length}</div>
                    <div className="text-[9px] text-zinc-600 uppercase font-bold">Nodos Externos</div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {nodes.map(node => (
                    <div key={node.id} className="bg-zinc-900/50 border border-zinc-800 p-4 flex flex-col justify-between hover:border-yellow-500/50 transition-colors">
                        <div className="flex justify-between items-center mb-3">
                            <span className="text-[9px] font-mono text-zinc-500 uppercase">{node.node_path}</span>
                            <div className={`h-1.5 w-1.5 rounded-full ${node.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        </div>
                        <div className="text-[11px] font-bold text-zinc-300 truncate">{node.node_name}</div>
                        <div className="mt-2 text-[8px] text-zinc-600 uppercase">Nivel {node.level}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}