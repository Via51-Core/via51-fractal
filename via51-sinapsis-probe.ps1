# VIA51 ANTIGRAVITY - SINAPSIS PROBE A-26
# SIN ACENTOS SEGUN CARTA MAGNA

$AlfaApp = "C:\via51-fractal\via51-alfa\src\App.tsx"

$AlfaContent = @'
/**
 * V51_DNA: { id: "NODE-ALFA-0", seq: "A-26", env: "LAB" }
 */
import React, { useState } from "react";

export default function App() {
    const [dni, setDni] = useState("");
    const [status, setStatus] = useState("IDLE");
    const [result, setResult] = useState<any>(null);
    const [debugInfo, setDebugInfo] = useState("");

    const API_URL = "https://hub.via51.org";

    const triggerSinapsis = async () => {
        if (dni.length !== 8) return alert("DNI requiere 8 digitos.");
        
        setStatus("PROCESSING");
        setDebugInfo("");
        
        try {
            console.log("Iniciando disparo a:", `${API_URL}/api/v1/gatekeeper`);
            
            const res = await fetch(`${API_URL}/api/v1/gatekeeper`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    v51_dna: { node: "NODE-ALFA-0", seq: "A-26", env: "LAB", pulse: Date.now() },
                    action: "GET_LIFE_DATA",
                    payload: { dni }
                })
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ msg: "FALLO_ESTRUCTURAL_SERVER" }));
                throw new Error(`HTTP_${res.status}: ${errorData.msg || "ERROR_SIN_MENSAJE"}`);
            }

            const output = await res.json();
            setResult(output);
            setStatus("SUCCESS");
        } catch (e: any) {
            console.error("DETALLE_ERROR:", e.message);
            setDebugInfo(e.message);
            setStatus("ERROR");
        }
    };

    const reset = () => {
        setResult(null);
        setDebugInfo("");
        setStatus("IDLE");
    };

    return (
        <main className="h-screen bg-black text-white flex items-center justify-center font-sans p-6 overflow-hidden">
            <div className="w-full max-w-[420px] h-[800px] bg-zinc-950 border-[12px] border-zinc-900 rounded-[3.5rem] relative flex flex-col shadow-2xl">
                
                <div className="p-8 pb-4">
                    <h1 className="text-xl font-black italic tracking-tighter">VIA51 <span className="text-yellow-500 uppercase">Lab</span></h1>
                    <div className="h-0.5 w-8 bg-yellow-500 mt-1 opacity-50"></div>
                </div>

                <div className="flex-1 px-10 py-4 flex flex-col">
                    {!result ? (
                        <div className="mt-20">
                            <p className="text-[10px] text-zinc-600 uppercase tracking-widest mb-4">Captura de Identidad</p>
                            <input 
                                value={dni} 
                                onChange={(e) => setDni(e.target.value)} 
                                placeholder="00000000" 
                                className="w-full bg-transparent border-b border-zinc-800 p-4 text-4xl font-bold text-center outline-none focus:border-yellow-500 mb-10 transition-all" 
                            />
                            
                            <button 
                                onClick={triggerSinapsis} 
                                disabled={status === "PROCESSING"}
                                className={`w-full p-5 font-black uppercase text-xs tracking-widest transition-all ${
                                    status === "PROCESSING" ? "bg-zinc-800 text-zinc-500" : "bg-yellow-500 text-black hover:bg-white"
                                }`}
                            >
                                {status === "PROCESSING" ? "SIMBIOSIS..." : "INICIAR SINAPSIS"}
                            </button>

                            {status === "ERROR" && (
                                <div className="mt-8 p-4 border border-red-900 bg-red-900/20 animate-pulse">
                                    <p className="text-[9px] text-red-500 font-black uppercase">Fallo Critico de Sinapsis</p>
                                    <p className="text-[11px] text-zinc-300 font-mono mt-2 break-all">{debugInfo}</p>
                                    <p className="text-[8px] text-zinc-500 mt-4 italic">Verifique que el HUB este encendido y las llaves de Supabase configuradas en Vercel.</p>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="animate-in zoom-in duration-500 flex-1 flex flex-col justify-center text-center">
                            <h2 className="text-2xl font-black text-white uppercase italic mb-6">Autorizado</h2>
                            <div className="bg-zinc-900 p-4 border-l-2 border-yellow-500 text-left">
                                <p className="text-[8px] text-zinc-500 uppercase font-black">ID Transaccion</p>
                                <p className="text-[10px] text-zinc-300 font-mono break-all mt-1">{result.tx_id}</p>
                            </div>
                            <button onClick={reset} className="mt-12 text-[9px] text-zinc-500 underline uppercase tracking-widest hover:text-white transition-colors">Reiniciar Bucle</button>
                        </div>
                    )}
                </div>

                <div className="p-8 text-center">
                    <p className="text-[8px] text-zinc-700 uppercase tracking-[0.4em]">Sovereign Diagnostic // A-26</p>
                </div>
            </div>
        </main>
    );
}
'@

Set-Content -Path $AlfaApp -Value $AlfaContent
Write-Host "--- DIAGNOSTICO INYECTADO AL 100% ---" -ForegroundColor Green
Write-Host "PROCEDA CON GIT PUSH ORIGIN DEV" -ForegroundColor White