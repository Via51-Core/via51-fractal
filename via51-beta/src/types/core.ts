/**
 * VIA51 HUB - AGNÓSTICO
 * Definición de Entidades según Plano 'CoreVia51'
 */

export type EntityID = string;

export interface CorePayload {
    entityType: 'EXTERNAL_NODE_0' | 'EXTERNAL_NODE_1' | 'EXTERNAL_NODE_2' | 'EXTERNAL_NODE_3';
    domain: string; // Ej: "Social", "Politics", "Production"
    action: string;
    data: Record<string, any>;
    metadata: {
        timestamp: number;
        sender: EntityID;
        version: string;
    };
}

export interface ValidationResult {
    isValid: boolean;
    errors?: string[];
    sanitizedData?: any;
}

// Interfaz para el Procesador de Estados
export interface StateTransition {
    from: string;
    to: string;
    trigger: string;
    permissions: string[]; // RLS Check
}