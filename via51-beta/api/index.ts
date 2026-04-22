import express from "express";
import cors from "cors";
import { Via51BlackBox } from "./core/blackbox_main.js";

const app = express();

// GOBERNANZA DE ACCESO: Autorizamos el nuevo dominio de laboratorio
const allowedOrigins = [
    "https://via51.org", 
    "https://dev.alfa.via51.org", 
    "https://gamma.via51.org"
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin) || origin.includes("vercel.app")) {
            callback(null, true);
        } else {
            callback(new Error("Acceso denegado por jerarquia fractal"));
        }
    }
}));

app.use(express.json());

app.get("/", (req, res) => res.send("VIA51 HUB ONLINE - B-31"));

app.post("/api/v1/gatekeeper", async (req, res) => {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "0.0.0.0";
    const output = await Via51BlackBox.handleSinapsis(req.body, String(ip));
    res.status(200).json(output);
});

export default app;
