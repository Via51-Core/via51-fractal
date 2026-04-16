# VIA51 ANTIGRAVITY - BUNKER CONSOLIDATION B-24
# PROTOCOLO: SIN ACENTOS / CALIDAD MUNDIAL

$RootPath = "C:\via51-fractal"
$BetaPath = "$RootPath\via51-beta"

Write-Host "--- CONSOLIDANDO NUCLEO BETA (OPERACION BUNKER) ---" -ForegroundColor Cyan

# 1. CREAR ESTRUCTURA INTERNA AUTONOMA
if (!(Test-Path "$BetaPath\api")) { New-Item -ItemType Directory -Path "$BetaPath\api" }
if (!(Test-Path "$BetaPath\api\core")) { New-Item -ItemType Directory -Path "$BetaPath\api\core" }

# 2. MOVER EL CORE DENTRO DE BETA (Para que Vercel lo vea)
Copy-Item "$RootPath\via51-beta\src\core\*" "$BetaPath\api\core\" -Recurse -Force
Write-Host "[OK] Nucleo mecanico copiado al Bunker." -ForegroundColor Green

# 3. CREAR EL PUNTO DE ENTRADA INFALIBLE (api/index.ts)
$ApiIndex = @'
import express from "express";
import cors from "cors";
import { Via51BlackBox } from "./core/blackbox_main";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("VIA51 HUB OPERATIVO - MODO BUNKER");
});

app.get("/api/v1/health", (req, res) => {
    res.json({ status: "ONLINE", node: "BETA-HUB", pulse: Date.now() });
});

app.post("/api/v1/gatekeeper", async (req, res) => {
    try {
        const output = await Via51BlackBox.handleSinapsis(req.body);
        res.status(200).json(output);
    } catch (e: any) {
        res.status(500).json({ status: "ERROR", msg: e.message });
    }
});

export default app;
'@
Set-Content -Path "$BetaPath\api\index.ts" -Value $ApiIndex

# 4. VERCEL.JSON DE ALTA PRECISION (Dentro de via51-beta)
$VercelConfig = @'
{
  "version": 2,
  "builds": [
    { "src": "api/index.ts", "use": "@vercel/node" }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "api/index.ts" },
    { "src": "/(.*)", "dest": "api/index.ts" }
  ]
}
'@
Set-Content -Path "$BetaPath\vercel.json" -Value $VercelConfig

Write-Host "--- NUCLEO CONSOLIDADO. PROCEDA CON GIT PUSH ---" -ForegroundColor Green