# VIA51 ANTIGRAVITY - GAMMA INTEL VISOR SCRIPT
# SEQUENCE: [V51-INTEL-B16-G07]

$RootPath = "C:\via51-fractal"
$BetaServer = "$RootPath\via51-beta\src\server.ts"
$GammaApp = "$RootPath\via51-gamma\src\App.tsx"

Write-Host "--- INICIANDO CONEXION DE INTELIGENCIA GAMMA ---" -ForegroundColor Cyan

# 1. ACTUALIZACION AL 100%: server.ts (BETA) - Añadiendo Endpoint de Auditoria
$ServerContent = @'
/**
 * V51_DNA: { node: "SERVER-BETA", type: "DRIVER", seq: "B-16" }
 */
import express from "express";
import cors from "cors";
import { Via51BlackBox } from "./core/blackbox_main";
import { createClient } from "@supabase/supabase-js";

const app = express();
const supabase = createClient(process.env.SUPABASE_URL || "", process.env.SUPABASE_SERVICE_ROLE_KEY || "");

app.use(cors({ origin: ["https://via51.org", "https://gamma.via51.org", /vercel\.app$/] }));
app.use(express.json());

// GATEKEEPER: Entrada de ciudadanos
app.post("/api/v1/gatekeeper", async (req, res) => {
    try {
        const output = await Via51BlackBox.handleSinapsis(req.body);
        res.status(200).json(output);
    } catch (e) { res.status(500).json({ status: "ERROR" }); }
});

// INTEL: Endpoint para el monitor de GAMMA
app.get("/api/v1/intel/pulses", async (req, res) => {
    const env = req.query.env || "PROD";
    const table = (env === "LAB") ? "dev_sys_events" : "sys_events";
    
    const { data, error } = await supabase
        .from(table)
        .select("*")
        .order("timestamp", { ascending: false })
        .limit(15);

    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`[HUB] Operativo en puerto ${PORT}`));
'@
Set-Content -Path "$BetaServer" -Value $ServerContent

# 2. ACTUALIZACION AL 100%: App.tsx (GAMMA) - El Visor de Trazabilidad
$GammaContent = @'
/**
 * V51_DNA: { id: "NODE-GAMMA-MANDO", seq: "G-07", env: "LAB" }
 */
import React, { useState, useEffect } from "react";

export default function App() {
    const [pulses, setPulses] = useState([]);
    const API_URL = "https://hub.via51.org";

    const fetchPulses = async () => {
        try {
            const res = await fetch(`${API_URL}/api/v1/intel/pulses?env=LAB`);
            const data = await res.json();
            setPulses(data);
        } catch (e) { console.error("Sinapsis interrumpida."); }
    };

    useEffect(() => {
        fetchPulses();
        const interval = setInterval(fetchPulses, 3000); // Latido cada 3 segundos
        return () => clearInterval(interval);
    }, []);

    return (
        <main className="min-h-screen bg-black text-white p-10 font-mono selection:bg-green-500">
            <header className="border-b border-zinc-800 pb-6 mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tighter italic">VIA51 <span className="text-green-500 uppercase">Gamma</span></h1>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-[0.5em] mt-2">Visor de Trazabilidad Soberana</p>
                </div>
                <div className="text-right">
                    <span className="px-3 py-1 border border-yellow-500 text-yellow-500 text-[9px] font-bold uppercase rounded-full animate-pulse">Monitor Lab Activo</span>
                </div>
            </header>

            <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
                <h2 className="text-[10px] font-bold text-zinc-600 uppercase mb-2">Latidos de la Red (dev_sys_events)</h2>
                
                {pulses.length === 0 ? (
                    <div className="p-20 text-center border border-dashed border-zinc-900 text-zinc-800 text-xs">Esperando pulso inicial...</div>
                ) : (
                    pulses.map((pulse: any) => (
                        <div key={pulse.id} className="bg-zinc-950 border border-zinc-900 p-4 flex items-center gap-6 animate-in slide-in-from-right duration-500">
                            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_green]"></div>
                            
                            <div className="flex-1">
                                <p className="text-[9px] text-zinc-500 uppercase font-bold">Sinapsis Detectada</p>
                                <p className="text-xs text-zinc-300 mt-1">Accion: <span className="text-white font-black">{pulse.action_type}</span></p>
                            </div>

                            <div className="text-right">
                                <p className="text-[8px] text-zinc-600 font-mono uppercase">{new Date(pulse.timestamp).toLocaleTimeString()}</p>
                                <p className="text-[8px] text-green-700 font-mono mt-1">{pulse.id.split("-")[0]}...</p>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <footer className="mt-20 pt-10 border-t border-zinc-900 text-center">
                <p className="text-[8px] text-zinc-800 uppercase tracking-widest">Antigravity Command Center // G-07</p>
            </footer>
        </main>
    );
}
'@
Set-Content -Path "$GammaApp" -Value $GammaContent

Write-Host "--- ACTUALIZACION COMPLETADA EXITOSAMENTE ---" -ForegroundColor Green
Write-Host "VISOR GAMMA CONECTADO AL LABORATORIO. PROCEDA CON GIT PUSH." -ForegroundColor White