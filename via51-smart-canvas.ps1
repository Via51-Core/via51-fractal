# VIA51 ANTIGRAVITY - SMART CANVAS A-40 / B-37
# PROTOCOLO: SIN ACENTOS / CALIDAD MUNDIAL / ARCHIVOS AL 100%

$RootPath = "C:\via51-fractal"
$BetaApi = "$RootPath\via51-beta\api"
$AlfaApp = "$RootPath\via51-alfa\src\App.tsx"

Write-Host "--- ACTIVANDO LIENZO DINAMICO Y RESTAURANDO ESTETICA ---" -ForegroundColor Cyan

# 1. ACTUALIZACION: api/core/blackbox_main.ts (EL GUIONISTA)
$BlackBox = @'
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL || "", process.env.SUPABASE_SERVICE_ROLE_KEY || "");

export class Via51BlackBox {
    public static async handleSinapsis(pkg: any): Promise<any> {
        const { action, payload, v51_dna } = pkg;

        // ACCION: OBTENER GUION DE PORTADA
        if (action === "GET_SMART_CANVAS") {
            return {
                status: "SUCCESS",
                config: {
                    bg_img: "/ceo-lima.png",
                    thoughts: [
                        "Primero en calificaciones y al fondo de la cedula para moverles el piso a los corruptos.",
                        "Hay taita lindo, hasta que al fin te revelaste como morado, taitita es peruano."
                    ],
                    interval: 9000
                }
            };
        }

        // ACCION: VALIDAR DNI Y REGISTRAR
        if (action === "CHECK_IDENTITY") {
            const { data: actor } = await supabase.from("sys_registry").select("*").eq("dni", payload.dni).single();
            if (!actor) return { status: "DENIED", msg: "NO_REGISTRADO" };

            const targetTable = (v51_dna.env === "LAB") ? "dev_sys_events" : "sys_events";
            const { data: event } = await supabase.from(targetTable).insert([{
                actor_id: actor.id,
                action_type: "SINAPSIS_LIENZO",
                payload: { dni: payload.dni }
            }]).select();

            return { status: "SUCCESS", user: actor.full_name, tx_id: event?.[0].id };
        }

        return { status: "ERROR", msg: "ACCION_NO_RECONOCIDA" };
    }
}
'@
Set-Content -Path "$BetaApi\core\blackbox_main.ts" -Value $BlackBox

# 2. ACTUALIZACION: App.tsx (EL LIENZO RESPONSIVE)
$AlfaCode = @'
import React, { useState, useEffect } from "react";

export default function App() {
    const [view, setView] = useState("CANVAS"); // CANVAS, LOGIN, SUCCESS
    const [dni, setDni] = useState("");
    const [thoughtIdx, setIdx] = useState(0);
    const [config, setConfig] = useState<any>(null);
    const [user, setUser] = useState<any>(null);

    const API_URL = "https://hub.via51.org";

    // SINAPSIS INICIAL: BAJAR EL GUION DEL NUCLEO
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
            } catch (e) { console.warn("Usando backup local"); }
        };
        fetchCanvas();
    }, []);

    // ROTACION DE PENSAMIENTOS
    useEffect(() => {
        if (!config) return;
        const timer = setInterval(() => setIdx(i => (i + 1) % config.thoughts.length), config.interval);
        return () => clearInterval(timer);
    }, [config]);

    const triggerLogin = async () => {
        if (dni.length !== 8) return;
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
    };

    const MainUI = ({ isMob }: { isMob: boolean }) => (
        <div className="h-full w-full relative flex flex-col items-center justify-end overflow-hidden bg-black font-sans">
            <div className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${isMob ? 'opacity-85' : 'opacity-60'}`}
                style={{ backgroundImage: `url("${config?.bg_img || '/ceo-lima.png'}")` }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            
            <div className={`relative z-10 text-center w-full px-12 ${isMob ? 'pb-24' : 'pb-40'}`}>
                <div className="min-h-[160px] flex items-center justify-center">
                    <p className={`text-white font-black italic uppercase leading-tight animate-in fade-in slide-in-from-bottom duration-1000 ${isMob ? 'text-2xl tracking-tighter' : 'text-6xl tracking-tight'}`}>
                        {config?.thoughts[thoughtIdx] || "VIA51 ANTIGRAVITY"}
                    </p>
                </div>
                <div className="h-1.5 w-20 bg-purple-600 mx-auto my-6 shadow-[0_0_20px_rgba(168,85,247,0.9)]"></div>
                <p className="text-green-500 font-bold tracking-[0.5em] text-[10px] md:text-xs uppercase">Peru Soberano</p>
            </div>

            <button onClick={() => setView("LOGIN")} className="absolute bottom-10 right-10 w-4 h-4 rounded-full bg-purple-600/30 border border-purple-500 animate-pulse"></button>
        </div>
    );

    return (
        <main className="min-h-screen bg-black flex flex-row overflow-hidden">
            {/* MARCO MONITOR */}
            <div className="hidden lg:flex flex-[2] border-r border-white/5"><MainUI isMob={false} /></div>
            
            {/* MARCO CELULAR */}
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
                        <div className="absolute inset-0 bg-black/95 z-50 p-10 flex flex-col justify-center text-center animate-in zoom-in duration-300">
                            <p className="text-green-500 text-5xl mb-6">✓</p>
                            <h2 className="text-xl font-black text-white uppercase mb-2">{user.user}</h2>
                            <p className="text-[10px] text-zinc-500 mb-10 font-mono">TX: {user.tx_id.split("-")[0]}...</p>
                            <button onClick={() => setView("CANVAS")} className="text-[9px] text-zinc-600 underline uppercase">Volver al Lienzo</button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
'@
Set-Content -Path $AlfaApp -Value $AlfaCode

Write-Host "--- LIENZO DINAMICO SELLADO AL 100% ---" -ForegroundColor Green