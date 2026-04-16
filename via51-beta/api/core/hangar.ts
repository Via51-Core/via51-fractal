/**
 * V51_DNA: { node: "CORE-BETA", type: "MECHANIC", seq: "M-06" }
 * MECANICA 06: MOTOR DE CARGA BAJO DEMANDA (EL HANGAR)
 */

import fs from "fs";
import path from "path";

export interface V51_Scenario {
    id: string;
    rules: any;
    flow: string[];
    output_channels: string[];
}

export class CoreHangar {
    private static HANGAR_PATH = path.resolve("src/database/sys_hangar.json");

    /**
     * Recupera la configuracion de un escenario especifico.
     * Permite que el Core sea agnostico cargando logica externa.
     */
    public static loadScenario(scenarioId: string): V51_Scenario | null {
        console.log(`[HANGAR] Buscando escenario: ${scenarioId}`);

        try {
            // 1. Consultar el inventario del Hangar
            const inventory = JSON.parse(fs.readFileSync(this.HANGAR_PATH, "utf8"));
            const entry = inventory.scenarios.find((s: any) => s.id === scenarioId || s.alias === scenarioId);

            if (!entry || entry.status !== "READY") {
                console.error(`[HANGAR] Scenario ${scenarioId} no disponible.`);
                return null;
            }

            // 2. Cargar el "Disco" (Archivo de configuracion del escenario)
            const scenarioData = JSON.parse(fs.readFileSync(path.resolve(entry.config_path), "utf8"));

            console.log(`[HANGAR] OK: Escenario ${scenarioId} cargado y listo.`);
            return scenarioData as V51_Scenario;

        } catch (error) {
            console.error("[HANGAR] CRITICAL: Fallo en la carga de escenario.");
            return null;
        }
    }
}
