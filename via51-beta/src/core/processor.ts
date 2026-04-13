/**
 * V51_DNA: { node: "CORE-BETA", type: "MECHANIC", seq: "M-02" }
 * MECANICA 02: PROCESADOR DE ESTADOS (CORE ENGINE)
 */

import { V51_Package } from "./validator";

export interface V51_Result {
    status: "SUCCESS" | "FAILURE" | "PENDING";
    dna_origin: string;
    action_performed: string;
    payload_out: any;
    timestamp: number;
}

export class CoreProcessor {
    /**
     * Procesa el paquete sin conocer el dominio.
     * En el futuro, aqui se conectara el "Disco" del Hangar.
     */
    public static async process(input: V51_Package, scenarioLogic?: any): Promise<V51_Result> {
        console.log(`[PROCESSOR] Ejecutando accion: ${input.action}`);

        try {
            // 1. Ejecucion de logica externa (inyectada desde el Hangar)
            // Si no hay logica aun (Fase 1), devolvemos el payload intacto como echo.
            const resultData = scenarioLogic
                ? await scenarioLogic(input.payload)
                : input.payload;

            // 2. Construccion del resultado estandar
            const response: V51_Result = {
                status: "SUCCESS",
                dna_origin: input.v51_dna.node,
                action_performed: input.action,
                payload_out: resultData,
                timestamp: Date.now()
            };

            return response;

        } catch (error) {
            console.error(`[PROCESSOR] CRITICAL FAILURE en accion ${input.action}`);
            return {
                status: "FAILURE",
                dna_origin: input.v51_dna.node,
                action_performed: input.action,
                payload_out: { error: "MECANICA_INTERRUMPIDA" },
                timestamp: Date.now()
            };
        }
    }
}