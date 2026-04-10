import { UniversalValidator } from './core/validator';
import { CorePayload } from './types/core';

/**
 * Punto de entrada del tráfico captado por ALFA
 */
export const handleIncomingTraffic = (payload: CorePayload) => {
    console.log(`[HUB-BETA] Processing event from: ${payload.metadata.sender}`);

    const validation = UniversalValidator.validate(payload);

    if (!validation.isValid) {
        console.error(`[AUDIT-BETA] Validation Failed: ${validation.errors?.join(', ')}`);
        // Aquí se enviaría la respuesta de error a ALFA
        return;
    }

    // Si es válido, se procede al PROCESADOR (Siguiente fase del plano CoreVia51)
    console.log(`[HUB-BETA] Data validated. Handing over to Processor.`);
    // executeProcessor(validation.sanitizedData);
};