/**
 * V51_DNA: { id: "NODE-ALFA-0", seq: "A-23" }
 * ESTADO: PRUEBA DE SINAPSIS VINCULANTE
 */
import React, { useState } from 'react';

export default function App() {
    const [dni, setDni] = useState('');
    const [status, setStatus] = useState('IDLE');
    const [result, setResult] = useState<any>(null);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    const triggerSinapsis = async () => {
        if (dni.length !== 8) return alert("DNI requiere 8 digitos.");

        setStatus('PROCESSING');
        try {
            const res = await fetch(`${API_URL}/api/v1/gatekeeper`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    v51_dna: { node: "NODE-ALFA-0", seq: "A-23", pulse: Date.now() },
                    action: 'GET_LIFE_DATA',
                    payload: { dni }
                })
            });
            const output = await res.json();

            // La Caja Negra responde con el objeto procesado y el TX_ID
            setResult(output);
            setStatus('SUCCESS');
        } catch (e) {
            setStatus('ERROR');
        }
    };

    const reset = () => { setDni(''); setResult(null); setStatus('IDLE'); };

    return (
        <main className="h-screen bg-black text-white flex items-center justify-center font-sans overflow-hidden p-6">
            <div className="w-full max-w-[420px] h-[800px] bg-zinc-950 border-[12px] border-zinc-900 rounded-[3rem] relative shadow-2xl flex flex-col overflow-hidden">

                {/* CABECERA SOBERANA */}
                <div className="p-8 pb-4">
                    <h1 className="text-xl font-black italic tracking-tighter">VIA51 <span className="text-yellow-500">LAB</span></h1>
                    <div className="h-0.5 w-8 bg-yellow-500 mt-1 opacity-50"></div>
                </div>

                <div className="flex-1 px-8 py-4 overflow-y-auto">
                    {!result ? (
                        <div className="animate-in fade-in slide-in-from-bottom duration-700">
                            <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-10">Capture de Identidad</p>
                            <input
                                value={dni} onChange={(e) => setDni(e.target.value)}
                                placeholder="00000000"
                                className="w-full bg-transparent border-b border-zinc-800 p-4 text-4xl font-bold text-center outline-none focus:border-yellow-500 transition-all mb-10"
                            />
                            <button
                                onClick={triggerSinapsis}
                                className="w-full bg-yellow-500 text-black font-black p-5 uppercase text-xs tracking-widest hover:bg-white transition-all"
                            >
                                {status === 'PROCESSING' ? 'Procesando...' : 'Iniciar Sinapsis'}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-in zoom-in duration-500">
                            <div className="border-b border-zinc-900 pb-4">
                                <p className="text-[10px] text-zinc-500 uppercase">Resultado Autorizado</p>
                                <h2 className="text-2xl font-black text-white uppercase italic">Fredy Bazalar</h2>
                            </div>

                            {/* TARJETAS DE RADIOGRAFIA (Muestra de Impacto) */}
                            <div className="grid grid-cols-1 gap-3">
                                <div className="bg-zinc-900 p-4 border-l-2 border-blue-500">
                                    <p className="text-[8px] text-zinc-500 uppercase font-bold">Estado Legal</p>
                                    <p className="text-xs text-zinc-300 mt-1">DNI Activo - Sin restricciones.</p>
                                </div>
                                <div className="bg-zinc-900 p-4 border-l-2 border-green-500">
                                    <p className="text-[8px] text-zinc-500 uppercase font-bold">Tributario</p>
                                    <p className="text-xs text-zinc-300 mt-1">RUC 10... Activo / Habido.</p>
                                </div>
                                <div className="bg-zinc-900 p-4 border-l-2 border-purple-500">
                                    <p className="text-[8px] text-zinc-500 uppercase font-bold">Electoral</p>
                                    <p className="text-xs text-zinc-300 mt-1">Local: Colegio Lima / Mesa 42.</p>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-zinc-900 text-center">
                                <p className="text-[8px] text-zinc-600 font-mono mb-4 uppercase">ID Transaccion: {result.tx_id}</p>
                                <button onClick={reset} className="text-[9px] text-zinc-500 underline uppercase tracking-widest">Salir y Limpiar</button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-8 pt-0">
                    <p className="text-[8px] text-zinc-700 text-center uppercase tracking-[0.3em]">Antigravity System // A-23</p>
                </div>
            </div>
        </main>
    );
}