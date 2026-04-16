/**
 * V51_DNA: { node: "CORE-BETA", type: "MECHANIC", seq: "M-01" }
 * MECANICA 01: VALIDADOR AGNOSTICO
 */

export interface V51_Package {
    v51_dna: {
        node: string;
        seq: string;
        pulse: number;
    };
    action: string;
    payload: any;
}

export class CoreValidator {
    /**
     * Verifica la integridad estructural de la entrada.
     * No conoce el contenido, solo la forma del contrato.
     */
    public static validate(input: V51_Package): boolean {
        try {
            // 1. Verificacion de DNA
            if (!input.v51_dna || !input.v51_dna.node || !input.v51_dna.seq) {
                console.error("[VALIDATOR] ERROR: DNA inexistente o incompleto.");
                return false;
            }

            // 2. Verificacion de Intencion
            if (!input.action || typeof input.action !== "string") {
                console.error("[VALIDATOR] ERROR: Accion no definida.");
                return false;
            }

            // 3. Verificacion de Carga
            if (input.payload === undefined) {
                console.error("[VALIDATOR] ERROR: Payload vacio.");
                return false;
            }

            console.log(`[VALIDATOR] OK: Sinapsis validada para nodo ${input.v51_dna.node}`);
            return true;
        } catch (e) {
            return false;
        }
    }
}
