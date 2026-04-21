# VIA51 ANTIGRAVITY - SOBERANIA TRILINGUE A-47 / B-42
# PROTOCOLO: SIN ACENTOS EN CODIGO / ACENTOS EN INTERFAZ CIUDADANA

$RootPath = "C:\via51-fractal"
$BetaApi = "$RootPath\via51-beta\api"
$AlfaApp = "$RootPath\via51-alfa\src\App.tsx"

Write-Host "--- INICIANDO SELLADO DE LEY SOBERANA ---" -ForegroundColor Cyan

# 1. ACTUALIZACION: api/core/blackbox_main.ts (EL CEREBRO)
$BlackBox = @'
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL || "", process.env.SUPABASE_SERVICE_ROLE_KEY || "");

export class Via51BlackBox {
    public static async handleSinapsis(pkg: any, ip: string): Promise<any> {
        const { action, payload, v51_dna } = pkg;

        if (action === "GET_SMART_CANVAS") {
            return { status: "SUCCESS", config: { bg_img: "/ceo-lima.png", thoughts: ["Primero en calificaciones...", "Hay taita lindo..."], interval: 8000 } };
        }

        if (action === "SIGN_PROTOCOL") {
            const { dni, whatsapp } = payload;
            
            let { data: actor } = await supabase.from("sys_registry").select("*").eq("dni", dni).single();

            if (!actor) {
                const { data: newActor } = await supabase.from("sys_registry").insert([{
                    dni: dni,
                    full_name: "Ciudadano por Validar",
                    role: "CITIZEN",
                    hierarchy_level: 1,
                    auth_status: "POR_VERIFICAR"
                }]).select().single();
                actor = newActor;
            }

            await supabase.from((v51_dna.env === "LAB" ? "dev_sys_events" : "sys_events")).insert([{
                actor_id: actor.id,
                action_type: "ACEPTACION_PROTOCOL_VINCULANTE",
                payload: { dni, whatsapp, ip, timestamp: new Date().toISOString() }
            }]);

            return { status: "SUCCESS", user: actor };
        }
        return { status: "ERROR" };
    }
}
'@
Set-Content -Path "$BetaApi\core\blackbox_main.ts" -Value $BlackBox

# 2. ACTUALIZACION: App.tsx (INTERFAZ NIVEL 0)
$AlfaCode = @'
import React, { useState, useEffect } from "react";

export default function App() {
    const [view, setView] = useState("CANVAS"); 
    const [lang, setLang] = useState("ES"); 
    const [dni, setDni] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [config, setConfig] = useState({ bg_img: "/ceo-lima.png", thoughts: ["VIA51"], interval: 8000 });

    const API_URL = "https://hub.via51.org";

    const legal = {
        ES: { 
            title: "Protocolo de Convivencia Soberana",
            body: "Via51 Antigravity es un Holding Digital y Ecosistema Fractal. Promovido por Fredy Hector Bazalar Grimaldo (DNI 06917989). Toda accion es VINCULANTE. El usuario asume responsabilidad plena por la veracidad de sus aportes.",
            dni: "Documento Identidad",
            wa: "WhatsApp",
            btn: "ACEPTAR Y VINCULAR"
        },
        QU: { 
            title: "Allin Kawsay Kamachiy",
            body: "Via51 Antigravity nisqaqa huk Suyu Fractal nisqam. Fredy Hector Bazalar Grimaldo-qa kamachin. Tukuy rurasqaykiqa HUNT’ANAPAQMI. Qammi huchayuq kanki lliw rurasqaykimanta.",
            dni: "Kikinyachiq Qillqa",
            wa: "WhatsApp",
            btn: "ARI NISPA TINKUCHIY"
        },
        EN: { 
            title: "Sovereign Coexistence Protocol",
            body: "Via51 Antigravity is a Digital Holding and Fractal Ecosystem. Promoted by Fredy Hector Bazalar Grimaldo (ID 06917989). All actions are BINDING. The user assumes full responsibility for their contributions.",
            dni: "Identity Document",
            wa: "WhatsApp",
            btn: "ACCEPT AND BIND"
        }
    };

    const handleAction = async () => {
        if (dni.length < 5 || whatsapp.length < 9) return alert("Datos incompletos.");
        const res = await fetch(`${API_URL}/api/v1/gatekeeper`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                action: "SIGN_PROTOCOL", 
                payload: { dni, whatsapp },
                v51_dna: { node: "ALFA", env: "LAB" } 
            })
        });
        if (res.ok) setView("SUCCESS");
    };

    const MainUI = ({ isMob }: { isMob: boolean }) => (
        <div className="h-full w-full relative flex flex-col items-center justify-end overflow-hidden bg-black font-sans">
            <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: "url('/ceo-lima.png')" }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            <div className={`relative z-10 text-center w-full px-12 ${isMob ? 'pb-24' : 'pb-40'}`}>
                <p className="text-white font-black italic uppercase leading-tight text-2xl md:text-6xl">VIA51 ANTIGRAVITY</p>
                <div className="h-1.5 w-20 bg-purple-600 mx-auto my-6 shadow-[0_0_20px_purple]"></div>
                <p className="text-green-500 font-bold tracking-[0.4em] text-[10px] uppercase italic">Por un Peru Sostenible</p>
            </div>
            <button onClick={() => setView("LOGIN")} className="absolute bottom-10 right-10 w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center z-50">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            </button>
        </div>
    );

    return (
        <main className="min-h-screen bg-black text-white flex flex-row overflow-hidden">
            <div className="hidden lg:flex flex-[2] bg-zinc-950 items-center justify-center border-r border-white/5 opacity-40">
                <h2 className="text-9xl font-black italic">V51</h2>
            </div>
            
            <div className="flex-1 lg:max-w-[480px] h-screen bg-zinc-900 flex items-center justify-center p-4">
                <div className="w-full h-full max-h-[880px] bg-black border-[12px] border-zinc-800 rounded-[3.5rem] relative overflow-hidden shadow-2xl">
                    
                    {view === "CANVAS" && <MainUI isMob={true} />}
                    
                    {view === "LOGIN" && (
                        <div className="absolute inset-0 bg-black/95 z-[100] p-10 flex flex-col justify-center animate-in slide-in-from-bottom duration-500">
                            <div className="flex gap-2 mb-6 justify-center">
                                {["ES", "QU", "EN"].map(l => (
                                    <button key={l} onClick={() => setLang(l)} className={`px-2 py-1 text-[9px] border ${lang === l ? 'border-green-500 text-green-500' : 'border-zinc-800 text-zinc-600'}`}>{l}</button>
                                ))}
                            </div>
                            <div className="pt-8 mb-8">
                                <h2 className="text-white text-xl font-black mb-4 uppercase italic leading-tight">{legal[lang].title}</h2>
                                <p className="text-[10px] text-zinc-400 leading-relaxed text-justify">{legal[lang].body}</p>
                            </div>
                            
                            <input placeholder={legal[lang].dni} value={dni} onChange={e => setDni(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 p-4 text-white text-center mb-4 outline-none focus:border-purple-500 font-mono" />
                            <input placeholder={legal[lang].wa} value={whatsapp} onChange={e => setWhatsapp(e.target.value)} className="w-full bg-zinc-900 border border-zinc-800 p-4 text-white text-center mb-10 outline-none focus:border-green-500 font-mono" />
                            
                            <button onClick={handleAction} className="w-full bg-green-600 text-black font-black p-5 uppercase text-xs tracking-widest hover:bg-green-400">{legal[lang].btn}</button>
                            <button onClick={() => setView("CANVAS")} className="mt-6 text-[9px] text-zinc-600 underline uppercase">Cancelar</button>
                        </div>
                    )}

                    {view === "SUCCESS" && (
                        <div className="absolute inset-0 bg-black z-[100] p-10 flex flex-col justify-center text-center animate-in zoom-in">
                            <p className="text-green-500 text-5xl mb-6">✓</p>
                            <h2 className="text-xl font-black uppercase mb-4 italic">Vínculo Sello</h2>
                            <p className="text-xs text-zinc-500">Identidad captada. El sistema evoluciona con su aporte.</p>
                            <button onClick={() => setView("CANVAS")} className="mt-12 text-zinc-600 underline text-[10px] uppercase">Finalizar</button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
'@
Set-Content -Path $AlfaApp -Value $AlfaCode

Write-Host "--- PROTOCOLO DE CONVIVENCIA SOBERANA SELLADO ---" -ForegroundColor Green