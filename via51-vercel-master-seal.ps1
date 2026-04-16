# VIA51 ANTIGRAVITY - VERCEL MASTER SEAL B-25
# PROTOCOLO: SIN ACENTOS / CALIDAD MUNDIAL / ESM COMPLIANCE

$RootPath = "C:\via51-fractal"
$BetaPath = "$RootPath\via51-beta"

Write-Host "--- INICIANDO SELLADO SOBERANO PARA VERCEL (ESM FIX) ---" -ForegroundColor Cyan

# 1. LIMPIEZA Y PREPARACION DEL BUNKER
if (Test-Path "$BetaPath\api") { Remove-Item "$BetaPath\api" -Recurse -Force }
New-Item -ItemType Directory -Path "$BetaPath\api\core" -Force

# 2. COPIAR NUCLEO MECANICO AL BUNKER
Copy-Item "$BetaPath\src\core\*" "$BetaPath\api\core\" -Force
Write-Host "[OK] Nucleo copiado a carpeta api." -ForegroundColor Green

# 3. CORRECCION DE EXTENSIONES EN EL NUCLEO (La clave del exito)
# Vercel requiere que los imports terminen en .js para resolver el modulo
$CoreFiles = Get-ChildItem "$BetaPath\api\core\*.ts"
foreach ($file in $CoreFiles) {
    $content = Get-Content $file.FullName
    # Reemplaza imports internos añadiendo .js
    $content = $content -replace 'from "./(.*)"', 'from "./$1.js"'
    Set-Content $file.FullName -Value $content
}
Write-Host "[OK] Extensiones .js inyectadas en el Nucleo." -ForegroundColor Green

# 4. CREAR PUNTO DE ENTRADA MAESTRO (api/index.ts)
$ApiIndex = @'
import express from "express";
import cors from "cors";
import { Via51BlackBox } from "./core/blackbox_main.js";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).send("VIA51 HUB OPERATIVO - SINAPSIS ESM SELLADA");
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
Write-Host "[OK] api/index.ts sellado con extension .js" -ForegroundColor Green

Write-Host "--- SISTEMA LISTO PARA TRASCENDER ---" -ForegroundColor Yellow