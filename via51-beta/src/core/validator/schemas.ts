import { CorePayload } from '../../types/core';

/**
 * Define la estructura de reglas por tipo de entidad.
 * Beta no sabe qué es un "Concierto", solo sabe que 'ENTITY_A' 
 * requiere ciertos campos obligatorios.
 */
export interface DomainSchema {
    requiredFields: string[];
    dataTypes: Record<string, string>; // e.g., { "capacity": "number" }
    stateTransitions: string[];       // Estados permitidos
}

export const SchemaRegistry: Record<string, DomainSchema> = {
    // Ejemplo: Configuración para el Nivel 1 (Departamentos)
    "DEPT_PROD": {
        requiredFields: ["id", "status", "output_type"],
        dataTypes: { "id": "string", "status": "string", "output_type": "string" },
        stateTransitions: ["draft", "processing", "approved"]
    },
    "DEPT_POL": {
        requiredFields: ["id", "regulation_id", "authority"],
        dataTypes: { "id": "string", "regulation_id": "number", "authority": "string" },
        stateTransitions: ["pending", "reviewed", "enacted"]
    }
};