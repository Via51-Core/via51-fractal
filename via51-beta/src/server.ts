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
