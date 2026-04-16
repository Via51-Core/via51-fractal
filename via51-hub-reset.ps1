# VIA51 ANTIGRAVITY - HUB RESET B-22
# PROTOCOLO: SIN ACENTOS / CALIDAD MUNDIAL

$RootPath = "C:\via51-fractal"
$BetaPath = "$RootPath\via51-beta"

Write-Host "--- RECONSTRUYENDO ADN DE DESPLIEGUE EN BETA ---" -ForegroundColor Cyan

# 1. ASEGURAR QUE EL SERVIDOR EXPORTE LA APP (REQUERIDO POR VERCEL)
$ServerContent = @'
import express from "express";
import cors from "cors";
import { Via51BlackBox } from "./core/blackbox_main";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// RUTA RAIZ: Si esto no carga, el 404 persiste
app.get("/", (req, res) => {
    res.status(200).send("VIA51 HUB OPERATIVO - SINAPSIS ACTIVA");
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

// IMPORTANTE: Vercel no necesita app.listen, pero lo dejamos para local
if (process.env.NODE_ENV !== "production") {
    const PORT = 3000;
    app.listen(PORT, () => console.log(`Local Hub en puerto ${PORT}`));
}

export default app; 
'@
Set-Content -Path "$BetaPath\src\server.ts" -Value $ServerContent

# 2. VERCEL.JSON REFORZADO (CATCH-ALL ROUTE)
$VercelConfig = @'
{
  "version": 2,
  "name": "via51-beta",
  "builds": [
    {
      "src": "src/server.ts",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/server.ts"
    }
  ]
}
'@
Set-Content -Path "$BetaPath\vercel.json" -Value $VercelConfig

Write-Host "--- ARCHIVOS RECONSTRUIDOS AL 100% ---" -ForegroundColor Green