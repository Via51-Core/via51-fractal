# VIA51 ANTIGRAVITY - FINAL IGNITION B-26
# PROTOCOLO: SIN ACENTOS / CALIDAD MUNDIAL

$RootPath = "C:\via51-fractal"
$BetaPath = "$RootPath\via51-beta"

Write-Host "--- SELLANDO NUCLEO PARA TRASCENDENCIA GLOBAL ---" -ForegroundColor Cyan

# 1. ASEGURAR ESTRUCTURA API
if (!(Test-Path "$BetaPath\api")) { New-Item -ItemType Directory -Path "$BetaPath\api" }
if (!(Test-Path "$BetaPath\api\core")) { New-Item -ItemType Directory -Path "$BetaPath\api\core" }

# 2. COPIAR NUCLEO CON EXTENSIONES .JS (ESM COMPLIANCE)
$CoreFiles = Get-ChildItem "$BetaPath\src\core\*.ts"
foreach ($file in $CoreFiles) {
    $content = Get-Content $file.FullName
    $content = $content -replace 'from "./(.*)"', 'from "./$1.js"'
    Set-Content -Path "$BetaPath\api\core\$($file.Name)" -Value $content
}

# 3. CREAR INDEX.TS EN LA RAIZ DE API
$ApiIndex = @'
import express from "express";
import cors from "cors";
import { Via51BlackBox } from "./core/blackbox_main.js";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("VIA51 HUB OPERATIVO - CALIDAD MUNDIAL");
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

# 4. VERCEL.JSON SIMPLIFICADO (Relativo al Root Directory via51-beta)
$VercelConfig = @'
{
  "rewrites": [{ "source": "/(.*)", "destination": "/api" }]
}
'@
Set-Content -Path "$BetaPath\vercel.json" -Value $VercelConfig

Write-Host "[OK] Sistema sellado y listo para Vercel." -ForegroundColor Green