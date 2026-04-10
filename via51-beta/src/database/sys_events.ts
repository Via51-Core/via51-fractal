export const logEvent = (payload: CorePayload, status: 'SUCCESS' | 'FAILURE') => {
    const auditEntry = {
        eventId: crypto.randomUUID(),
        timestamp: Date.now(),
        actor: payload.metadata.sender,
        domain: payload.domain,
        status: status
    };

    // En un entorno real, esto se inserta en una DB con RLS estricto.
    console.log(`[SYS_EVENTS] Logged: ${JSON.stringify(auditEntry)}`);
};