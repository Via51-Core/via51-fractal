/**
 * V51_DNA: { node: "SERVER-BETA", seq: "B-13" }
 */
import express from "express";
import cors from "cors";
import { Via51BlackBox } from "./core/blackbox_main";

const app = express();

// GOBERNANZA DE ACCESO DINAMICA
// Perm**AUDITORIA TECNICA DE AMBITOS**
*   ** Ubicacion:** Hub Digital Beta / Nodo de Gestion de Entornos
    *   ** Fecha:** 13 de abril de 2026
        *   ** Hora:** 08:00 PET(Lima)
            *   ** Responsable:** IA de Control Antigravity
                *   ** Accion:** ** ACTIVACION DEL PROTOite via51.org y cualquier URL de previsualizacion de Vercel
app.use(cors({
    origin: [/via51\.org$/, /vercel\.app$/],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(express.json());

app.post("/api/v1/gatekeeper", async (req, res) => {
    try {
        const output = await Via51BlackBox.handleSinapsis(req.body);
        res.json(output);
    } catch (e: any) {
        res.status(500).json({ status: "CORE_ERROR", msg: e.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`[COLO DE PREVISUALIZACION (VERCEL PREVIEW)**.
*   **Estado:** **ENTORNO DE LABORATORIO CONFIGHUB] Via51 laticiendo en puerto ${PORT}`));