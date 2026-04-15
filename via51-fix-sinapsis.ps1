# VIA51 ANTIGRAVITY - SOVEREIGN REPAIR SCRIPT
# SEQUENCE: [V51-REPAIR-B18-A27]
# PROTOCOLO: SIN ACENTOS / CALIDAD MUNDIAL

$RootPath = "C:\via51-fractal"
$BetaServer = "$RootPath\via51-beta\src\server.ts"
$AlfaApp = "$RootPath\via51-alfa\src\App.tsx"

Write-Host "--- INICIANDO REPARACION SOBERANA DE SINAPSIS ---" -ForegroundColor Cyan

# 1. ACTUALIZACION AL 100%: server.ts (BETA)
$ServerContent = @'
import express from "express";
import cors from "cors";
import { Via51BlackBox } from "./core/blackbox_main";

const app = express();

// APERTURA TOTAL DE PUERTAS PARA LABORATORIO
app.use(cors({ origin: "*" }));
app.use(express.json());

// LATIDO DE VIDA (Health Check)
app.get("/api/v1/health", (req, res) => {
    res.json({ status: "ONLINE", node: "BETA-HUB", pulse: Date.now() });
});

// GATEKEEPER: Entrada de Sinapsis
app.post("/api/v1/gatekeeper", async (req, res) => {
    console.log(`[HUB] Pulso recibido de: ${req.body.v51_dna?.node || "ANON"}`);
    try {
        const output = await Via51BlackBox.handleSinapsis(req.body);
        res.status(200).json(output);
    } catch (e: any) {
        console.error("[HUB] ERROR_INTERNO:", e.message);
        res.status(500).json({ status: "ERROR", msg: e.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`[HUB] Nucleo B-18 operativo en puerto ${PORT}`));
'@
Set-Content -Path $BetaServer -Value $ServerContent
Write-Host "[OK] server.ts reparado." -ForegroundColor Green

# 2. ACTUALIZACION AL 100%: App.tsx (ALFA)
$AlfaContent = @'
/**
 * V51_DNA: { id: "NODE-ALFA-0", seq: "A-27", env: "LAB" }
 */
import React, { useState, useEffect } from "react";

export default function App() {
    const [dni, setDni] = useState("");
    const [status, setStatus] = useState("IDLE");
    const [hubStatus, setHubStatus] = useState("CHECKING");
    const [result, setResult] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState("");

    const API_URL = "https://hub.via51.org";

    // VERIFICAR SALUD DEL HUB AL CARGAR
    useEffect(() => {
        const checkHub = async () => {
            try {
                const res = await fetch(`${API_URL}/api/v1/health`);
                if (res.ok) setHubStatus("ONLINE");
                else setHubStatus("OFFLINE");
            } catch (e) { setHubStatus("OFFLINE"); }
        };
        checkHub();
    }, []);

    const triggerSinapsis = async () => {
        if (dni.length !== 8) return alert("DNI requiere 8 digitos.");
        setStatus("PROCESSING");
        setErrorMsg("");
        
        try {
            const res = await fetch(`${API_URL}/api/v1/gatekeeper`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    v51_dna: { node: "NODE-ALFA-0", seq: "A-27", env: "LAB", pulse: Date.now() },
                    action: "GET_LIFE_DATA",
                    payload: { dni }
                })
            });

            if (!res.ok) throw new Error(`HTTP_${res.status}`);

            const output = await res.json();
            setResult(output);
            setStatus("SUCCESS");
        } catch (e: any) {
            setErrorMsg(e.message === "Failed to fetch" ? "ERROR_RED_O_CORS" : e.message);
            setStatus("ERROR");
            setTimeout(() => setStatus("IDLE"), 4000);
        }
    };

    return (
        <main className="h-screen bg-black text-white flex items-center justify-center font-sans p-6 overflow-hidden">
            <div className="w-full max-w-[420px] h-[750px] bg-zinc-950 border-[12px] border-zinc-900 rounded-[3.5rem] relative flex flex-col shadow-2xl">
                
                <div className="p-8 pb-4 flex justify-between items-center">
                    <h1 className="text-xl font-black italic tracking-tighter">VIA51 <span className="text-yellow-500 uppercase">Lab</span></h1>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${hubStatus === "ONLINE" ? "bg-green-500 shadow-[0_0_8px_green]" : "bg-red-500 animate-pulse"}`}></div>
                        <span className="text-[8px] font-bold uppercase text-zinc-500">{hubStatus}</span>
                    </div>
                </div>

                <div className="flex-1 px-10 py-4 flex flex-col justify-center">
                    {!result ? (
                        <div className="animate-in fade-in duration-700">
                            <p className="text-[10px] text-zinc-600 uppercase tracking-widest mb-4">Captura de Identidad</p>
                            <input value={dni} onChange={(e) => setDni(e.target.value)} placeholder="00000000" className="w-full bg-transparent border-b border-zinc-800 p-4 text-4xl font-bold text-center outline-none focus:border-yellow-500 mb-10 transition-all" />
                            
                            <button onClick={triggerSinapsis} disabled={status === "PROCESSING" || hubStatus === "OFFLINE"} className={`w-full p-5 font-black uppercase text-xs tracking-widest transition-all ${status === "PROCESSING" || hubStatus === "OFFLINE" ? "bg-zinc-800 text-zinc-500" : "bg-yellow-500 text-black hover:bg-white"}`}>
                                {status === "PROCESSING" ? "SIMBIOSIS..." : "INICIAR SINAPSIS"}
                            </button>

                            {status === "ERROR" && (
                                <div className="mt-6 p-4 border border-red-900 bg-red-900/10 text-red-500 text-[10px] font-mono text-center">
                                    ERROR: {errorMsg}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="animate-in zoom-in duration-500 text-center">
                            <h2 className="text-2xl font-black text-white uppercase italic mb-6">Autorizado</h2>
                            <div className="bg-zinc-900 p-4 border-l-2 border-yellow-500 text-left">
                                <p className="text-[8px] text-zinc-500 uppercase font-black">TX_ID</p>
                                <p className="text-[10px] text-zinc-300 font-mono break-all mt-1">{result.tx_id}</p>
                            </div>
                            <button onClick={() => setResult(null)} className="mt-12 text-[9px] text-zinc-500 underline uppercase">Reiniciar</button>
                        </div>
                    )}
                </div>

                <div className="p-8 text-center">
                    <p className="text-[8px] text-zinc-700 uppercase tracking-[0.4em]">Antigravity System // A-27</p>
                </div>
            </div>
        </main>
    );
}
'@
Set-Content -Path $AlfaApp -Value $AlfaContent
Write-Host "[OK] App.tsx reparado." -ForegroundColor Green

Write-Host "--- PROCESO COMPLETADO. PROCEDA CON GIT PUSH ORIGIN DEV ---" -ForegroundColor Yellow