/**
 * VIA51 - DRIVER MANAGER
 * Recibe el "Pedido Crudo" y lo adecua según el Dominio.
 */

export interface RawRequest {
    nodeId: string;
    domain: 'POL' | 'SOC' | 'PROD';
    payload: any; // El pedido sin procesar
}

export class DriverManager {
    // El Driver adecua el pedido antes de que llegue al motor principal
    public static process(request: RawRequest) {
        console.log(`[DRIVER] Procesando pedido crudo para dominio: ${request.domain}`);

        switch (request.domain) {
            case 'POL':
                return this.politicsDriver(request.payload);
            case 'PROD':
                return this.productionDriver(request.payload);
            default:
                return request.payload; // Driver agnóstico por defecto
        }
    }

    private static politicsDriver(raw: any) {
        // Aquí el Driver "sabe" que en política todo debe llevar firma y nivel de acceso
        return {
            ...raw,
            processed_by: 'Politics-Driver-v1',
            security_clearance: 'Level-1',
            formatted_date: new Date().toISOString()
        };
    }

    private static productionDriver(raw: any) {
        // El Driver de producción asegura que existan cantidades numéricas
        return {
            ...raw,
            qty: Number(raw.qty) || 0,
            unit: raw.unit || 'UNIDAD',
            timestamp: Date.now()
        };
    }
}