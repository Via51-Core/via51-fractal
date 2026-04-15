# VIA51 ANTIGRAVITY - RECONEXION TOTAL B-18 / A-27
# SIN ACENTOS SEGUN CARTA MAGNA

$BetaServer = "C:\via51-   **Diagnostico:** **MURO DE SILENCIO (CORS / NETWORK ERROR)**.
*   **Analfractal\via51-beta\src\server.ts"
$AlfaApp = "C:\via51-fractal\via51-alfa\src\App.tsx"

Write-Host "--- INICIANDO PROTOCOLO DE RECONEXION TOTAL ---" -ForegroundColor Cyan

# 1. ACTUALIZACION AL 100%: server.ts (BETA) - CORS TOTAL Y SENSOR DE VIDA
$ServerContent = @'
import express fromisis:** El error "Failed to fetch" es la prueba de que el mensaje ni siquiera llego a la Caja Negra. El navegador bloqueo la salida por seguridad (CORS) o el dominio `hub.via51.org` no esta respondiendo en el puerto esperado.

---

Fredy, hemos detectado el punto de rotura. Para que el sistema de **Calidad Mundial** "express";
import cors from "cors";
import { Via51BlackBox } from "./core/blackbox_main";

const app = express();

// GOBERNANZA DE ACCESO: Apertura total para fase de Laboratorio
app.use(cors({ origin: "*" })); 
app.use(express.json());

// SENSOR DE VIDA (Para verificar si trascienda, el HUB debe ser un receptor universal pero seguro. Vamos a aplicar el **Protocolo de Apertura Total (Fase Lab)**. 

Este script hara tres cosas:
1.  **BETA:** Abrira las puertas ( el HUB respira)
app.get("/", (req, res) => {
    res.status(200).jsonCORS) al 100% para que cualquier URL de Vercel pueda entrar.
2.  **B({ status: "ONLINE", system: "VIA51-ANTIGRAVITY", node: "BETA-HUB" });
});

// GATEKEEPER: Entrada de sinapsis
app.post("/api/v1/gatekeeper", async (req, res) => {
    console.log(`[HUB] Pulso recibido de: ${req.body.v51_dna?.node || "ANON"}`);
    try {
        const output = await Via51BlackBox.handleSinapsis(req.body);
        res.status(200).json(ETA:** Añadira un "Latido de Vida" (Health Check) para saber si el servidor esta vivo.
3.  **ALFA:** Antes de pedir el DNI, verificara si el HUB esta online.

### SCRIPT DE RESCATE DE SINAPSIS: `via51-recovery-lab.ps1`
*   **Accion:** Ejecutalo como Administrador enoutput);
    } catch (e: any) {
        console.error("[HUB] ERROR_INTERNO:", e.message);
        res.status(500).json({ status: "ERROR", msg: e.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen( tu PC.

```powershell
# VIA51 ANTIGRAVITY - RECOVERY LAB
# SEQUENCE: [V51-RECOVERY-B18-A27]

$BetaServer = "C:\via51-fractal\via51-beta\src\server.ts"
$AlfaApp = "C:\via51-fractal\viaPORT, () => console.log(`[HUB] Nucleo B-18 en puerto ${PORT}`));
'@
Set-Content -Path $BetaServer -Value $ServerContent

# 2. ACTUALIZACION AL 100%: App.tsx (ALFA) - Diagnostico de Red Avanzado
$AlfaContent = @'
/**
 * V51_DNA: { id: "NODE-ALFA-0", seq: "A-27", env: "LAB" }
 */
import React, { useState, useEffect } from "react";

export default function App() {
    const51-alfa\src\App.tsx"

Write-Host "--- INICIANDO RECUPERACION DE SINAPSIS ---" -ForegroundColor Cyan

# 1. ACTUALIZACION AL 100%: server.ts (BETA) - Apertura Total de Puertas
$ServerContent = @'
import express from "express";
import cors from "cors";
import { Via51BlackBox } from "./core/blackbox_main";

const app = express();

 [dni, setDni] = useState("");
    const [status, setStatus] = useState("IDLE");
    const [result, setResult] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState("");
    const [hubStatus, setHubStatus] = useState("CHECKING...");

    const API_URL = "https://hub.via51.org";

    // Verificar// APERTURA TOTAL PARA LABORATORIO (Evita el Failed to Fetch)
app.use(cors({ origin: "*" })); 
app.use(express.json());

// LATIDO DE VIDA: Para verificar si el HUB esta en linea
app.get("/api/v1/health", (req, res) => {
    res.json({ status: "ONLINE", server salud del HUB al cargar
    useEffect(() => {
        fetch(API_URL).then(r => r.json())
            .then(d => setHubStatus(d.status))
            .catch(() => setHubStatus("OFFLINE"));
    }, []);

    const triggerSinapsis = async () => {
        if (dni.length !==: "VIA51-HUB", timestamp: Date.now() });
});

app.post("/api/v1/gatekeeper", async (req, res) => {
    console.log(`[HUB] Sinapsis entrante de: ${req.body.v51_dna?.node}`);
    try {
        const output = await Via51BlackBox.handleSinapsis(req.body);
        res.status(200).json(output); 8) return alert("DNI requiere 8 digitos.");
        setStatus("PROCESSING");
        setErrorMsg("");
        
        try {
            const res = await fetch(`${API_URL}/api/v1/gatekeeper`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    v51_dna: { node: "NODE-ALFA-0", seq: "A
    } catch (e: any) {
        console.error("[HUB] ERROR INTERNO:", e.message);
        res.status(500).json({ status: "ERROR", msg: e.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`[HUB] Latiendo en puerto ${PORT}`));
'@
Set-Content -Path $BetaServer -Value $ServerContent

# 2. ACTUALIZACION AL 100%: App.tsx-27", env: "LAB", pulse: Date.now() },
                    action: "GET_LIFE_DATA",
                    payload: { dni }
                })
            });

            if (!res.ok) { (ALFA) - Verificador de Conexion
$AlfaContent = @'
/**
 * V51_DNA:
                const errData = await res.json().catch(() => ({ msg: "FALLO_ESTRUCTURAL" }));
                throw new Error(errData.msg || "ERROR_SERVER");
            }

            const output = await res.json();
            setResult(output);
            setStatus("SUCCESS");
        } catch (e: any) {
            setErrorMsg(e.message === "Failed to fetch" ? "HUB_NO_ALCANZABLE (CORS o Red)" : e.message);
            setStatus("ERROR");
        }
    };

    return (
        <main className="h-screen bg-black text-white flex items-center justify-center font-sans p- { id: "NODE-ALFA-0", seq: "A-27", env: "LAB" }
 */
import React, { useState, useEffect } from "react";

export default function App() {
    const [dni, setDni] = useState("");
    const [status, setStatus] = useState("IDLE");
    const [hubStatus, setHubStatus] = useState("CHECKING");
    const [result, setResult] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState("");

    const API_URL = "https://hub.via51.org";

    // VERIFICAR SI EL HUB ESTA VIVO AL CARGAR
    useEffect(() => {
        const checkHub = async () => {
            try {
                const res = await fetch(`${API_URL}/api/v1/health`);
                if (res.ok) setHubStatus("ONLINE");
6">
            <div className="w-full max-w-[420px] h-[750px] bg-zinc-950 border-[12px] border-zinc-900 rounded-[3rem] relative flex flex-col overflow-hidden shadow-2xl">
                <div className="p-8                else setHubStatus("OFFLINE");
            } catch (e) { setHubStatus("OFFLINE"); }
        };
        checkHub();
    }, []);

    const triggerSinapsis = async () => {
 pb-4 flex justify-between items-center">
                    <h1 className="text-xl font-black italic tracking-tighter">        if (dni.length !== 8) return;
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
            });VIA51 <span className="text-yellow-500">Lab</span></h1>
                    <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full ${hubStatus === "ONLINE" ? "bg-green-900 text-green-400" : "bg-red-900 text-red-400"}`}>
                        HUB: {hubStatus}
                    </span>
                </div>

                <div className="flex-1 px-10 py-4 flex flex-col justify-center">
                    {!result ? (
                        <>
                            <input value={dni} onChange={(e) => setDni(e.target.value)} placeholder="00000000" className="w-full bg-transparent border-b border-zinc-800 p-4 text-4xl font-bold text-center outline-none focus:border-yellow-500 mb-10" />
                            <button onClick={triggerSinapsis} disabled={status === "PROCESSING" || hubStatus === "OFFLINE"} className={`w-full p-5 font-black uppercase text-xs tracking-widest transition-all ${status ===

            if (!res.ok) throw new Error(`Error ${res.status}`);
            const output = await res.json();
            setResult(output);
            setStatus("SUCCESS");
        } catch (e: any) {
            setError "PROCESSING" || hubStatus === "OFFLINE" ? "bg-zinc-800 text-zinc-500" : "bg-yellow-500 text-black hover:bg-white"}`}>
                                {status === "PROCESSING" ? "SIMBIOSIS..." : "INICIAR SINAPSIS"}
                            </button>
                            {errorMsg && (
                                <div className="mt-6 p-4 border border-red-900 bgMsg("El HUB no respondio. Verifique despliegue en Vercel.");
            setStatus("ERROR");
            setTimeout(() => setStatus("IDLE"), 4000);
        }
    };

    return (
        <main className="h-screen bg-black text-white flex items-center justify-center font-sans p-6">
            <div className="w-full max-w-[420px] h-[750px] bg-zinc-950 border-[12px] border-zinc-900 rounded-[3rem] relative flex flex-col overflow-hidden shadow-2xl">
                
                <div className="p-8 pb-4 flex justify-between items-center">
                    <h1 className="text-xl font-black italic tracking-tighter">VIA51 <span className="text-yellow-500 uppercase">Lab</span></h1>
                    <div className="flex items-center gap-2">
                        <div className={`w-2 h-2-red-900/10 text-red-500 text-[10px] font-mono animate-pulse">
                                    ERROR: {errorMsg}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="animate-in zoom-in duration-500 text-center">
                            <h2 className="text-2xl font-black text-white uppercase italic mb-6">Autorizado</h2>
                            <div className="bg-zinc-900 p-4 border-l-2 border-yellow-500 text-left">
                                <p className="text-[8px] text-zinc-500 uppercase rounded-full ${hubStatus === "ONLINE" ? "bg-green-500" : "bg-red-500 animate-pulse"}`}></div>
                        <span className="text-[8px] font-bold uppercase text-zinc-500">{hubStatus}</span>
                    </div>
                </div>

                <div className="flex-1 px-10 py-4 flex flex-col justify-center">
                    {hubStatus === "OFFLINE" ? (
                        <div className="text-center p-6 border border-red-900 bg-red-900/ font-black">TX_ID</p>
                                <p className="text-[10px] text-zinc-300 font-mono break-all">{result.tx_id}</p>
                            </div>
                            <button onClick={() => setResult(null)} className="mt-10 text-[9px] text-zinc-500 underline uppercase">10">
                            <p className="text-red-500 font-black text-xs uppercase mb-2">HubReiniciar</button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
'@
Set-Content -Path $AlfaApp -Value $AlfaContent

Write-Host "--- RECONEXION SELLADA AL 100% ---" -ForegroundColor Green
Write-Host "PROCEDA CON GIT PUSH ORIGIN DEV" -ForegroundColor White