/**
 * V51_DNA: { node: "CORE-BETA", type: "MECHANIC", seq: "M-05" }
 * MECANICA 05: REGISTRO INMUTABLE DE EVENTOS
 */

import fs from "fs";
import path from "path";
import { V51_Result } from "./processor";

export class CoreEventLog {
    private static LOG_PATH = path.resolve("src/database/sys_events.json");

    /**
     * Sella un resultado en el historial inmutable.
     * Cumple la Regla 5 de la Carta Magna.
     */
    public static async seal(result: V51_Result): Promise<string> {
        const tx_id = `TX-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

        try {
            const data = fs.readFileSync(this.LOG_PATH, "utf8");
            const db = JSON.parse(data);

            const entry = {
                tx_id: tx_id,
                ...result,
                sealed_at: new Date().toISOString()
            };

            db.history.push(entry);

            // Escritura atomica en disco local
            fs.writeFileSync(this.LOG_PATH, JSON.stringify(db, null, 2));

            console.log(`[EVENT_LOG] OK: Evento sellado con ID ${tx_id}`);
            return tx_id;

        } catch (error) {
            console.error("[EVENT_LOG] CRITICAL: Fallo al sellar evento.");
            return "ERROR_UNSEALED";
        }
    }

    /**
     * Recupera el historial para auditoria de GAMMA.
     */
    public static getHistory(): any[] {
        try {
            const data = fs.readFileSync(this.LOG_PATH, "utf8");
            return JSON.parse(data).history;
        } catch (e) {
            return [];
        }
    }
}