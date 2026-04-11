import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function CommandCenter() {
    const [nodes, setNodes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchNodes = async () => {
        const { data } = await supabase.from('sys_registry').select('*').order('level', { ascending: true }).order('node_path', { ascending: true });
        if (data) setNodes(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchNodes();
    }, []);

    if (loading) return <div className="min-h-screen bg-black flex items-center justify-center font-mono text-green-500">ACCEDIENDO AL COMANDO...</div>;

    const renderSection = (title: string, filterLvl: (lvl: number) => boolean, accent: string) => (
        <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
                <h2 className={`text-xs font-black uppercase tracking-[0.3em] ${accent}`}>{title}</h2>
                <div className="h-[1px] flex-1 bg-zinc-800"></div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {nodes.filter(n => filterLvl(Number(n.level))).map(node => (
                    <div key={node.id} className="bg-zinc-900 border border-zinc-800 p-4 transition-all hover:border-green-500">
                        <div className="flex justify-between items-start">
                            <span className="text-[8px] font-mono text-zinc-500 uppercase">{node.node_path}</span>
                            <div className={`h-2 w-2 rounded-full ${node.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                        </div>
                        <div className="text-xs font-bold text-zinc-200 mt-2">{node.node_name}</div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#050505] text-white p-10 font-sans">
            <header className="mb-16 border-b border-zinc-800 pb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter uppercase italic">Vía51 <span className="text-green-500">Gamma</span></h1>
                    <p className="text-zinc-500 font-mono text-[10px] mt-2 tracking-[0.4em]">Inteligencia y Comando // 43 Elementos</p>
                </div>
                <div className="text-right font-mono"><div className="text-4xl font-black">{nodes.length}</div><div className="text-[9px] text-zinc-600 uppercase">Matriz Total</div></div>
            </header>
            {renderSection("Núcleo Interno", (l) => l === -1, "text-blue-500")}
            {renderSection("Estructura Fractal (Externa)", (l) => l >= 0, "text-zinc-500")}
        </div>
    );
}