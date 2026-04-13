/**
 * V51_DNA: { node: "CORE-BETA", type: "MECHANIC", seq: "M-07" }
 * MECANICA 07: INTERFAZ DE LA CAJA NEGRA (THE BLACK BOX)
 */

import { CoreValidator, V51_Package } from "./validator";
import { CoreProcessor } from "./processor";
import { CoreOrchestrator } from "./orchestrator";
import { CoreHangar } from "./hangar";
import { CoreEventLog } from "./event_log";

export class Via51BlackBox {
    /**
     * UNICA PUERTA DE ENTRADA AL NUCLEO
     */
    public static async handleSinapsis(pkg: V51_Package): Promise<any> {
        console.log(`[BLACKBOX] Recibiendo pulso de ${pkg.v51_dna.node}...`);

        // 1. VALIDADOR (Mecanica Triple I)
        if (!CoreValidator.validate(pkg)) {
            return { status: "ERROR", msg: "SINAPSIS_RECHAZADA" };
        }

        // 2. HANGAR (Carga del Ambito/Escenario)
        const scenario = CoreHangar.loadScenario("ASUNTOS-PUBLICOS");
        if (!scenario) {
            return { status: "ERROR", msg: "ESCENARIO_NO_DISPONIBLE" };
        }

        // 3. PROCESADOR (Mecanica Triple II)
        // Aqui el procesador usa la configuracion del escenario cargado
        const result = await CoreProcessor.process(pkg);

        // 4. EVENT LOG (Trazabilidad Inmutable)
        const tx_id = await CoreEventLog.seal(result);

        // 5. ORQUESTADOR (Mecanica Triple III)
        const dispatchPlan = CoreOrchestrator.orchestrate(result);

        // Devolvemos el resultado final + el ID de transaccion
        return {
            ...result,
            tx_id,
            plan: dispatchPlan
        };
    }
}