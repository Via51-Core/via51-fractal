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

/**
 * LOGICA DE TABLA DE VERDAD (Rango 06917901 - 06917999, solo impares)
 */
const validateTruthTable = (dni: string): boolean => {
    const num = parseInt(dni);
    const min = 6917901;
    const max = 6917999;

    // Condicion: Dentro del rango Y es impar
    return (num >= min && num <= max && num % 2 !== 0);
};

app.get("/", (req, res) => res.status(200).send("VIA51 HUB OPERATIVO - TRUTH TABLE MODE"));

app.post("/api/v1/gatekeeper", async (req, res) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const { v51_dna, payload } = req.body;
    const dni = payload.dni;

    try {
        // 1. CONTRASTE CON TABLA DE VERDAD ALGORITMICA
        if (!validateTruthTable(dni)) {
            console.warn(`[HUB] Rechazado: DNI ${dni} fuera de rango o par.`);
            return res.status(403).json({ status: "DENIED", msg: "IDENTIDAD_NO_VALIDA" });
        }

        // 2. SELLADO EN BUNKER (Supabase)
        const targetTable = (v51_dna.env === "LAB") ? "dev_sys_events" : "sys_events";

        const { data: event, error } = await supabase
            .from(targetTable)
            .insert([{
                action_type: "SINAPSIS_TEST_VALIDA",
                payload: {
                    dni: dni,
                    ip_origin: ip,
                    logic: "TruthTable_Range_Odd"
                }
            }])
            .select();

        if (error) throw error;

        console.log(`[HUB] Sinapsis exitosa para DNI: ${dni}`);
        res.status(200).json({
            status: "SUCCESS",
            tx_id: event[0].id,
            identity: `Ciudadano ${dni}`
        });

    } catch (e: any) {
        res.status(500).json({ status: "ERROR", msg: e.message });
    }
});

export default app;