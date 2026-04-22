import React, { useState, useEffect } from "react";

export default function App() {
    const [view, setView] = useState("CANVAS"); 
    const [dni, setDni] = useState("");
    const [user, setUser] = useState<any>(null);
    const [intelResult, setIntelResult] = useState<any>(null);
    const [status, setStatus] = useState("IDLE");

    const API_URL = "https://hub.via51.org";

    const handleAuth = async () => {
        if (dni.length !== 8) return;
        const res = await fetch(`${API_URL}/api/v1/gatekeeper`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "CHECK_IDENTITY", payload: { dni }, v51_dna: { node: "ALFA", env: "LAB" } })
        });
        const out = await res.json();
        if (out.status === "SUCCESS") { setUser(out.user); setView("INTEL_HUB"); }
        else alert("Identidad no autorizada");
    };

    const runIntel = async (type: string, data: any) => {
        setStatus("PROCESSING");
        const res = await fetch(`${API_URL}/api/v1/gatekeeper`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: type, payload: data, v51_dna: { node: "ALFA", env: "LAB" } })
        });
        const out = await res.json();
        setIntelResult(out.data);
        setStatus("IDLE");
    };

    const MainUI = () => (
        <div className="h-full w-full relative flex flex-col items-center justify-end overflow-hidden bg-black font-sans">
            <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: "url('/ceo-lima.png')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            <div className="relative z-10 text-center w-full px-12 pb-24">
                <p className="text-white font-black italic uppercase leading-tight text-2xl md:text-6xl animate-pulse">VIA51 ANTIGRAVITY</p>
                <div className="h-1.5 w-20 bg-purple-600 mx-auto my-6 shadow-[0_0_20px_purple]"></div>
            </div>
            <button onClick={() => setView("LOGIN")} className="absolute bottom-10 right-10 w-10 h-10 rounded-full bg-purple-500/30 border border-purple-500 animate-pulse z-50"></button>
        </div>
    );

    return (
        <main className="min-h-screen bg-black text-white flex flex-row overflow-hidden">
            <div className="hidden lg:flex flex-[2] border-r border-white/5"><MainUI /></div>
            <div className="flex-1 lg:max-w-[480px] h-screen bg-zinc-900 flex items-center justify-center p-4">
                <div className="w-full h-full max-h-[880px] bg-black border-[12px] border-zinc-800 rounded-[3.5rem] overflow-hidden relative shadow-2xl">
                    {view === "CANVAS" && <MainUI />}
                    
                    {view === "LOGIN" && (
                        <div className="absolute inset-0 bg-black/95 z-50 p-10 flex flex-col justify-center text-center">
                            <button onClick={() => setView("CANVAS")} className="absolute top-12 right-8 text-zinc-600">✕</button>
                            <h2 className="text-white text-2xl font-black mb-10 uppercase italic">Identidad</h2>
                            <input type="text" value={dni} onChange={e => setDni(e.target.value.replace(/\D/g, "").slice(0,8))} placeholder="00000000" className="w-full bg-transparent border-b border-zinc-800 p-4 text-4xl font-bold text-center text-white outline-none focus:border-purple-500 mb-10" />
                            <button onClick={handleAuth} className="w-full bg-purple-600 text-white font-black p-5 uppercase text-xs tracking-widest hover:bg-purple-500">Entrar al Hub</button>
                        </div>
                    )}

                    {view === "INTEL_HUB" && (
                        <div className="absolute inset-0 bg-black/95 z-50 p-10 flex flex-col justify-center animate-in slide-in-from-bottom">
                            <h3 className="text-green-500 text-[10px] font-bold mb-8 uppercase tracking-widest text-center">Centro de Inteligencia</h3>
                            <div className="space-y-4">
                                <button onClick={() => runIntel("INTEL_YOUTUBE", { url: "youtube.com/v51" })} className="w-full bg-zinc-900 border border-zinc-800 p-4 text-left hover:bg-zinc-800 transition-all">
                                    <p className="text-[9px] text-zinc-500 uppercase font-bold">Modulo 01</p>
                                    <p className="text-xs font-black uppercase">Analisis YouTube</p>
                                </button>
                                <button onClick={() => runIntel("SCAN_METER", { img: "meter.jpg" })} className="w-full bg-zinc-900 border border-zinc-800 p-4 text-left hover:bg-zinc-800 transition-all">
                                    <p className="text-[9px] text-zinc-500 uppercase font-bold">Modulo 02</p>
                                    <p className="text-xs font-black uppercase">Escaneo de Medidores</p>
                                </button>
                                
                                {intelResult && (
                                    <div className="mt-6 p-4 bg-green-900/10 border border-green-500/30 animate-in zoom-in">
                                        <p className="text-[9px] text-green-500 font-bold uppercase mb-2">Resultado Intel</p>
                                        <pre className="text-[10px] text-zinc-300 font-mono whitespace-pre-wrap">{JSON.stringify(intelResult, null, 2)}</pre>
                                    </div>
                                )}

                                <button onClick={() => { setView("CANVAS"); setIntelResult(null); }} className="w-full text-[9px] text-zinc-600 underline uppercase mt-8">Cerrar Hub</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
