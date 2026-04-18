# VIA51 ANTIGRAVITY - VISUAL IMPACT A-41
# PROTOCOLO: SIN ACENTOS / CALIDAD MUNDIAL

$AlfaApp = "C:\via51-fractal\via51-alfa\src\App.tsx"

Write-Host "--- SELLANDO IMPACTO VISUAL A-41 ---" -ForegroundColor Cyan

$AlfaCode = @'
/**
 * V51_DNA: { id: "NODE-ALFA-0", seq: "A-41", env: "LAB" }
 */
import React, { useState, useEffect } from "react";

export default function App() {
    const [view, setView] = useState("CANVAS"); 
    const [dni, setDni] = useState("");
    const [thoughtIdx, setIdx] = useState(0);
    const [user, setUser] = useState<any>(null);
    
    // CONFIGURACION INICIAL SOBERANA (Backup inmediato)
    const [config, setConfig] = useState({
        bg_img: "/ceo-lima.png",
        thoughts: [
            "Primero en calificaciones y al fondo de la cedula para moverles el piso a los corruptos.",
            "Hay taita lindo, hasta que al fin te revelaste como morado, taitita es peruano."
        ],
        interval: 8000
    });

    const API_URL = "https://hub.via51.org";

    // SINAPSIS CON EL NUCLEO
    useEffect(() => {
        const fetchCanvas = async () => {
            try {
                const res = await fetch(`${API_URL}/api/v1/gatekeeper`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ action: "GET_SMART_CANVAS", v51_dna: { node: "ALFA", env: "LAB" } })
                });
                const data = await res.json();
                if (data.status === "SUCCESS") setConfig(data.config);
            } catch (e) { console.warn("Modo Bunker: Usando activos locales."); }
        };
        fetchCanvas();
    }, []);

    // ROTACION DE PENSAMIENTOS
    useEffect(() => {
        const timer = setInterval(() => {
            setIdx(prev => (prev + 1) % config.thoughts.length);
        }, config.interval);
        return () => clearInterval(timer);
    }, [config]);

    const triggerLogin = async () => {
        if (dni.length !== 8) return;
        try {
            const res = await fetch(`${API_URL}/api/v1/gatekeeper`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    action: "CHECK_IDENTITY", 
                    payload: { dni },
                    v51_dna: { node: "ALFA", env: "LAB" } 
                })
            });
            const out = await res.json();
            if (out.status === "SUCCESS") { setUser(out); setView("SUCCESS"); }
            else alert("Identidad no autorizada");
        } catch (e) { alert("Hub fuera de linea"); }
    };

    const MainUI = ({ isMob }: { isMob: boolean }) => (
        <div className="h-full w-full relative flex flex-col items-center justify-end overflow-hidden bg-black font-sans">
            {/* IMAGEN DE FONDO SOBERANA */}
            <div 
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${isMob ? 'opacity-90' : 'opacity-60'}`}
                style={{ backgroundImage: `url("${config.bg_img}")` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            
            {/* TEXTO DINAMICO */}
            <div className={`relative z-10 text-center w-full px-12 ${isMob ? 'pb-24' : 'pb-40'}`}>
                <div className="min-h-[160px] flex items-center justify-center">
                    <p className={`text-white font-black italic uppercase leading-tight animate-in fade-in slide-in-from-bottom duration-1000 ${isMob ? 'text-2xl tracking-tighter' : 'text-6xl tracking-tight'}`}>
                        {config.thoughts[thoughtIdx]}
                    </p>
                </div>
                <div className="h-1.5 w-20 bg-purple-600 mx-auto my-6 shadow-[0_0_20px_rgba(168,85,247,0.9)]"></div>
                <p className="text-green-500 font-bold tracking-[0.5em] text-[10px] md:text-xs uppercase">VÍA51 Antigravity</p>
            </div>

            {/* PUNTO DE LUZ DISCRETO */}
            <button onClick={() => setView("LOGIN")} className="absolute bottom-10 right-10 w-4 h-4 rounded-full bg-purple-500/30 border border-purple-500 animate-pulse"></button>
        </div>
    );

    return (
        <main className="min-h-screen bg-black flex flex-row overflow-hidden">
            <div className="hidden lg:flex flex-[2] border-r border-white/5"><MainUI isMob={false} /></div>
            <div className="flex-1 lg:max-w-[480px] h-screen bg-zinc-900 flex items-center justify-center p-4">
                <div className="w-full h-full max-h-[880px] bg-black border-[12px] border-zinc-800 rounded-[3.5rem] overflow-hidden relative shadow-2xl">
                    {view === "CANVAS" && <MainUI isMob={true} />}
                    {view === "LOGIN" && (
                        <div className="absolute inset-0 bg-black/95 z-50 p-10 flex flex-col justify-center text-center">
                            <button onClick={() => setView("CANVAS")} className="absolute top-8 right-8 text-zinc-600">✕</button>
                            <h2 className="text-white text-2xl font-black mb-10 uppercase italic">Identidad</h2>
                            <input type="text" value={dni} onChange={e => setDni(e.target.value.replace(/\D/g, "").slice(0,8))} placeholder="00000000" className="w-full bg-transparent border-b border-zinc-800 p-4 text-4xl font-bold text-center text-white outline-none focus:border-purple-500 mb-10" />
                            <button onClick={triggerLogin} className="w-full bg-purple-600 text-white font-black p-5 uppercase text-xs tracking-widest hover:bg-purple-500">Validar</button>
                        </div>
                    )}
                    {view === "SUCCESS" && (
                        <div className="absolute inset-0 bg-black/95 z-50 p-10 flex flex-col justify-center text-center animate-in zoom-in">
                            <p className="text-green-500 text-5xl mb-6">✓</p>
                            <h2 className="text-xl font-black text-white uppercase mb-2">{user?.user}</h2>
                            <button onClick={() => setView("CANVAS")} className="text-[9px] text-zinc-600 underline uppercase">Volver</button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
'@
Set-Content -Path $AlfaApp -Value $AlfaCode
Write-Host "[OK] App.tsx actualizado a version A-41." -ForegroundColor Green