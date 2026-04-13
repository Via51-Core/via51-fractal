/**
 * V51_DNA: { node: "CORE-BETA", type: "MECHANIC", seq: "M-03" }
 * MECANICA 03: ORQUESTADOR DE SALIDA
 */

import { V51_Result } from "./processor";

export interface V51_Dispatch {
    target: string; // Ejemplo: "ALFA-SCREEN", "GAMMA-LOG", "WA-DRIVER"
    payload: any;
    priority: number;
}

export class CoreOrchestrator {
    /**
     * Dirige el resultado hacia los canales correspondientes.
     * La configuracion de canales vendra del Hangar en la Fase 2.
     */
    public static orchestrate(result: V51_Result): V51_Dispatch[] {
        console.log(`[ORCHESTRATOR] Despachando resultado de: ${result.action_performed}`);

        const dispatches: V51_Dispatch[] = [];

        // 1. Canal Obligatorio: Trazabilidad (sys_events)
        dispatches.push({
            target: "SYSTEM_EVENT_LOG",
            payload: result,
            priority: 1
        });

        // 2. Canal de Respuesta: Driver Solicitante
        // Si el estado es exito, enviamos la carga al driver.
        if (result.status === "SUCCESS") {
            dispatches.push({
                target: result.dna_origin, // Devuelve al nodo que inicio la sinapsis
                payload: result.payload_out,
                priority: 2
            });
        }

        return dispatches;
    }
}