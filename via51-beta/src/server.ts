import express from "express";
import cors from "cors";
import { Via51BlackBox } from "./core/blackbox_main";

const app = express();

// APERTURA TOTAL DE PUERTAS (CORS)
app.use(cors({ origin: "*" }));
app.use(express.json());

// RUTA RAIZ PARA PRUEBA MANUAL EN NAVEGADOR
app.get("/", (req, res) => {
    res.send("VIA51 HUB ONLINE");
});

// HEALTH CHECK PARA EL DRIVER ALFA
app.get("/api/v1/health", (req, res) => {
    res.json({ status: "ONLINE", timestamp: Date.now() });
});

// GATEKEEPER: Entrada de Sinapsis
app.post("/api/v1/gatekeeper", async (req, res) => {
    try {
        const output = await Via51BlackBox.handleSinapsis(req.body);
        res.status(200).json(output);
    } catch (e: any) {
        res.status(500).json({ status: "ERROR", msg: "FALLO_INTERNO_NUCLEO" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`HUB B-19 en puerto ${PORT}`));
