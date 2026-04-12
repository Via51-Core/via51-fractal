/**
 * VIA51 ANTIGRAVITY - Alfa Telemetry Service
 * Nivel: ALFA (Captura)
 */

export class TelemetryService {
    /**
     * Envía señal de visita al CORE de forma silenciosa
     */
    public static async trackVisit(): Promise<void> {
        try {
            // Captura de datos básicos agnósticos
            const payload = {
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                language: navigator.language,
                // Nota: La resolución de IP a Región se hace en BETA para mantener ALFA liviano
                source: "VIA51-ALFA-MAIN"
            };

            // Envío al Driver de Entrada de BETA
            await fetch('https://hub.via51.org/api/v1/in/telemetry', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    origin: 'VIA51-ALFA-00',
                    domain: 'PUBLIC_AFFAIRS',
                    action: 'RECORD_VISIT',
                    payload: payload
                })
            });
        } catch (e) {
            console.warn("[V51-ALFA] Telemetry offline.");
        }
    }
}