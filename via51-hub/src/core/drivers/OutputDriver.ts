/**
 * VIA51 - OUTPUT DRIVER
 * Convierte resultados técnicos en información humana.
 */

export class OutputDriver {
    public static translate(rawResult: any, domain: string) {
        // El motor produjo un resultado, el Driver lo hace amigable
        const baseResponse = {
            timestamp: new Date().toLocaleString(),
            severity: rawResult.error ? 'CRÍTICO' : 'ÉXITO',
        };

        switch (domain) {
            case 'POL':
                return {
                    ...baseResponse,
                    mensaje: `Soberanía confirmada: Se ha registrado una nueva directiva en el nodo de Política.`,
                    accion_sugerida: "Revisar en el monitor Gamma la firma digital.",
                    visual: "badge-gold"
                };
            case 'PROD':
                return {
                    ...baseResponse,
                    mensaje: `Flujo de Producción actualizado: ${rawResult.qty} unidades integradas al inventario.`,
                    accion_sugerida: "Verificar balance de recursos en la Tríada de Logística.",
                    visual: "chart-green"
                };
            default:
                return {
                    ...baseResponse,
                    mensaje: "Operación procesada correctamente por el Núcleo Antigravity.",
                    data: rawResult
                };
        }
    }
}