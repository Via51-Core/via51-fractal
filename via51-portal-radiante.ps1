# VIA51 ANTIGRAVITY - PORTAL RADIANTE A-44
# PROTOCOLO: SIN ACENTOS / CALIDAD MUNDIAL / ARCHIVOS AL 100%

$AlfaApp = "C:\via51-fractal\via51-alfa\src\App.tsx"

Write-Host "--- REPARANDO SENSIBILIDAD DEL PUNTO DE LUZ ---" -ForegroundColor Cyan

$AlfaCode = @'
/**
 * V51_DNA: { id: "NODE-ALFA-0", seq: "A-44", env: "LAB" }
 */
import React, { useState, useEffect } from "react";

export default function App() {
    const [view, setView] = useState("CANVAS"); 
    const [dni, setDni] = useState("");
    const [user, setUser] = useState<any>(null);
    const [thoughtIdx, setIdx] = useState(0);
    const [config, setConfig] = useState({ 
        bg_img: "/ceo-lima.png", 
        thoughts: [
            "Primero en calificaciones y al fondo de la cedula para moverles el piso a los corruptos.",
            "Hay taita lindo, hasta que al fin te revelaste como morado, taitita es peruano."
        ], 
        interval: 8000 
    });

    const API_URL = "https://hub.via51.org";

    useEffect(() => {
        const sync = async () => {
            try {
                const res = await fetch(`${API_URL}/api/v1/gatekeeper`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ action: "GET_SMART_CANVAS", v51_dna: { node: "ALFA", env: "LAB" } })
                });
                const data = await res.json();
                if (data.config) setConfig(data.config);
            } catch (e) { console.warn("Sincronia local activa."); }
        };
        sync();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => setIdx(i => (i + 1) % config.thoughts.length), config.interval);
        return () => clearInterval(timer);
    }, [config]);

    const handleAuth = async () => {
        if (dni.length !== 8) return;
        try {
            const res = await fetch(`${API_URL}/api/v1/gatekeeper`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "CHECK_IDENTITY", payload: { dni }, v51_dna: { node: "ALFA", env: "LAB" } })
            });
            const out = await res.json();
            if (out.status === "SUCCESS") { setUser(out.user); setView("UPLOAD"); }
            else alert("Identidad no autorizada");
        } catch (e) { alert("Hub fuera de linea"); }
    };

    const MainUI = ({ isMob }: { isMob: boolean }) => (
        <div className="h-full w-full relative flex flex-col items-center justify-end overflow-hidden bg-black font-sans">
            <div className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${isMob ? 'opacity-85' : 'opacity-60'}`}
                style={{ backgroundImage: `url("${config.bg_img}")` }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            
            <div className={`relative z-10 text-center w-full px-12 ${isMob ? 'pb-24' : 'pb-40'}`}>
                <p className={`text-white font-black italic uppercase leading-tight animate-in fade-in slide-in-from-bottom duration-1000 ${isMob ? 'text-2xl' : 'text-6xl'}`}>
                    {config.thoughts[thoughtIdx]}
                </p>
                <div className="h-1.5 w-20 bg-purple-600 mx-auto my-6 shadow-[0_0_20px_rgba(168,85,247,0.9)]"></div>
                <p className="text-green-500 font-bold tracking-[0.4em] text-[10px] uppercase">Soberania Digital</p>
            </div>

            {/* PUNTO DE LUZ REPARADO: Area de contacto de 40px (w-10 h-10) */}
            <button 
                onClick={(e) => { e.stopPropagation(); setView("LOGIN"); }} 
                className="absolute bottom-12 right-12 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-purple-500/40 hover:border-purple-500 transition-all duration-500 z-50 cursor-pointer group"
            >
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse group-hover:scale-150 transition-transform"></div>
            </button>
        </div>
    );

    return (
        <main className="min-h-screen bg-black flex flex-row overflow-hidden">
            <div className="hidden lg:flex flex-[2] border-r border-white/5"><MainUI isMob={false} /></div>
            <div className="flex-1 lg:max-w-[480px] h-screen bg-zinc-900 flex items-center justify-center p-4">
                <div className="w-full h-full max-h-[880px] bg-black border-[12px] border-zinc-800 rounded-[3.5rem] overflow-hidden relative shadow-2xl">
                    {view === "CANVAS" && <MainUI isMob={true} />}
                    
                    {view === "LOGIN" && (
                        <div className="absolute inset-0 bg-black/95 z-[100] p-10 flex flex-col justify-center text-center animate-in fade-in">
                            <button onClick={() => setView("CANVAS")} className="absolute top-12 right-8 text-zinc-600 hover:text-white">✕</button>
                            <h2 className="text-white text-2xl font-black mb-10 uppercase italic">Identidad</h2>
                            <input type="text" value={dni} onChange={e => setDni(e.target.value.replace(/\D/g, "").slice(0,8))} placeholder="00000000" className="w-full bg-transparent border-b border-zinc-800 p-4 text-4xl font-bold text-center text-white outline-none focus:border-purple-500 mb-10" />
                            <button onClick={handleAuth} className="w-full bg-purple-600 text-white font-black p-5 uppercase text-xs tracking-widest hover:bg-purple-500">Validar</button>
                        </div>
                    )}

                    {view === "UPLOAD" && (
                        <div className="absolute inset-0 bg-black/95 z-[100] p-10 flex flex-col justify-center animate-in slide-in-from-bottom duration-500">
                            <h2 className="text-green-500 text-[10px] font-bold mb-2 uppercase tracking-widest">Bienvenido, {user?.full_name}</h2>
                            <h3 className="text-white text-2xl font-black mb-8 uppercase italic">Nuevo Guion</h3>
                            <div className="space-y-4">
                                <div className="border-2 border-dashed border-zinc-800 p-10 text-center text-[9px] text-zinc-600 uppercase">Seleccionar Imagen / Video</div>
                                <textarea placeholder="Instrucciones de texto alusivo..." className="w-full bg-zinc-900 border border-zinc-800 p-4 text-xs h-32 text-white outline-none focus:border-green-500"></textarea>
                                <button onClick={() => setView("SUCCESS")} className="w-full bg-green-600 text-black font-black p-5 uppercase text-xs tracking-widest hover:bg-green-400">Enviar para Evaluacion</button>
                                <button onClick={() => setView("CANVAS")} className="w-full text-[9px] text-zinc-600 uppercase underline mt-4">Cancelar</button>
                            </div>
                        </div>
                    )}

                    {view === "SUCCESS" && (
                        <div className="absolute inset-0 bg-black/95 z-[100] p-10 flex flex-col justify-center text-center animate-in zoom-in">
                            <p className="text-green-500 text-5xl mb-6">✓</p>
                            <h2 className="text-xl font-black text-white uppercase mb-2">Aporte Recibido</h2>
                            <button onClick={() => setView("CANVAS")} className="text-[9px] text-zinc-600 underline uppercase">Finalizar</button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
'@
Set-Content -Path $AlfaApp -Value $AlfaCode
Write-Host "--- PORTAL REPARADO AL 100% ---" -ForegroundColor Green