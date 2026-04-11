import React, { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';

export default function App() {
    const [allNodes, setAllNodes] = useState<any[]>([]);
    const [currentNode, setCurrentNode] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNodes = async () => {
            const { data } = await supabase
                .from('sys_registry')
                .select('*')
                .gte('level', 0)
                .order('level', { ascending: true })
                .order('node_path', { ascending: true });
            if (data) setAllNodes(data);
            setLoading(false);
        };
        fetchNodes();
    }, []);

    const getChildren = (parentPath: string, parentLevel: number) => {
        return allNodes.filter(n =>
            n.level === parentLevel + 1 &&
            n.node_path.startsWith(parentPath + '.')
        );
    };

    const navigateTo = (node: any) => setCurrentNode(node);
    const resetToHome = () => setCurrentNode(null);
    const goBack = () => {
        if (!currentNode) return;
        const pathParts = currentNode.node_path.split('.');
        if (pathParts.length <= 1) {
            setCurrentNode(null);
        } else {
            const parentPath = pathParts.slice(0, -1).join('.');
            const parent = allNodes.find(n => n.node_path === parentPath);
            setCurrentNode(parent || null);
        }
    };

    if (loading) return <div className="min-h-screen bg-black flex items-center justify-center font-mono text-blue-500">CARGANDO ENTRAMADO...</div>;

    if (!currentNode) {
        const level0 = allNodes.filter(n => n.level === 0)[0];
        const level1Nodes = allNodes.filter(n => n.level === 1);

        return (
            <div className="min-h-screen bg-[#050505] text-white p-10 lg:p-20 font-sans">
                <header className="mb-20 border-b border-blue-900/30 pb-12">
                    <h1 className="text-7xl font-black italic tracking-tighter uppercase">Vía51 <span className="text-blue-500 font-normal">Alfa</span></h1>
                    <p className="text-zinc-500 mt-4 text-xl">{level0?.node_name || 'Portal de Mentoría'}</p>
                </header>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {level1Nodes.map(node => (
                        <div key={node.id} onClick={() => navigateTo(node)} className="group border border-zinc-800 p-10 bg-zinc-900/50 hover:border-blue-500 cursor-pointer transition-all">
                            <span className="text-[10px] font-mono text-zinc-600 uppercase">{node.node_path}</span>
                            <h3 className="text-xl font-bold mt-2 group-hover:text-blue-400">{node.node_name}</h3>
                            <div className="mt-8 text-[9px] font-black text-zinc-700 group-hover:text-white uppercase tracking-widest">Explorar Departamento →</div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const children = getChildren(currentNode.node_path, currentNode.level);
    const isFinalSite = currentNode.level === 3;

    return (
        <div className="min-h-screen bg-[#050505] text-white p-10 lg:p-20 font-sans">
            <nav className="mb-12 flex gap-4">
                <button onClick={resetToHome} className="text-[10px] font-bold text-zinc-500 hover:text-white uppercase tracking-widest">Pantalla Cero</button>
                <span className="text-zinc-800">/</span>
                <button onClick={goBack} className="text-[10px] font-bold text-zinc-500 hover:text-white uppercase tracking-widest">Regresar</button>
            </nav>

            <header className="mb-16">
                <span className="text-[10px] font-mono text-blue-500 uppercase tracking-[0.3em]">{currentNode.node_path}</span>
                <h1 className="text-5xl font-black mt-2 uppercase tracking-tighter">{currentNode.node_name}</h1>
                <p className="text-zinc-500 mt-4">Nivel {currentNode.level} // {isFinalSite ? 'Sitio Final' : 'Portal de Acceso'}</p>
            </header>

            {isFinalSite ? (
                <div className="border border-zinc-800 bg-zinc-900/20 p-20 text-center">
                    <div className="text-blue-500 font-mono text-sm mb-4">CONTENIDO SOBERANO NIVEL 3</div>
                    <h2 className="text-2xl font-light text-zinc-400">Bienvenido al Nodo Final del Entramado.</h2>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {children.map(node => (
                        <div key={node.id} onClick={() => navigateTo(node)} className="group border border-zinc-800 p-8 bg-zinc-900/30 hover:border-blue-400 cursor-pointer transition-all">
                            <span className="text-[9px] font-mono text-zinc-600">{node.node_path}</span>
                            <h3 className="text-lg font-bold mt-2 group-hover:text-white">{node.node_name}</h3>
                            <div className="mt-6 text-[8px] font-bold text-zinc-700 group-hover:text-blue-400 uppercase tracking-widest">Ingresar →</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}