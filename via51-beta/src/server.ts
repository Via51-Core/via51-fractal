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
