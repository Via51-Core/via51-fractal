import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

const supabase = createClient(
    process.env.SUPABASE_URL || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

app.get("/", (req, res) => res.status(200).send("VIA51 HUB OPERATIVO"));

app.post("/api/v1/gatekeeper", async (req, res) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const { v51_dna, payload } = req.body;

    try {
        const targetTable = (v51_dna.env === "LAB") ? "dev_sys_events" : "sys_events";

        // Grabacion con tipos de datos estrictos para Supabase
        const { data, error } = await supabase
            .from(targetTable)
            .insert([{
                actor_id: v51_dna.node_id, // Debe ser un UUID valido
                action_type: "REGISTRO_DNI",
                payload: {
                    dni: payload.dni,
                    ip_origin: ip,
                    meta: "Calidad Mundial V2"
                }
            }])
            .select();

        if (error) throw error;

        res.status(200).json({ status: "SUCCESS", tx_id: data[0].id });
    } catch (e: any) {
        console.error("ERROR_BUNKER:", e.message);
        res.status(500).json({ status: "ERROR", msg: e.message });
    }
});

export default app;