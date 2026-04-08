import { CorePayload, ValidationResult } from '../../types/core';
import { SchemaRegistry } from './schemas';

export class UniversalValidator {

    /**
     * Ejecuta la validación lógica sin conocer el dominio.
     */
    public static validate(payload: CorePayload): ValidationResult {
        const { domain, data } = payload;
        const schema = SchemaRegistry[domain];

        // 1. Verificar si el dominio/configuración existe en el HUB
        if (!schema) {
            return {
                isValid: false,
                errors: [`Unregistered Domain Configuration: ${domain}`]
            };
        }

        const errors: string[] = [];

        // 2. Validación de Campos Obligatorios (Rule Check)
        schema.requiredFields.forEach(field => {
            if (!(field in data)) {
                errors.push(`Missing mandatory field: ${field}`);
            }
        });

        // 3. Validación de Tipos de Datos (Data Integrity)
        for (const [key, expectedType] of Object.entries(schema.dataTypes)) {
            if (data[key] && typeof data[key] !== expectedType) {
                errors.push(`Type mismatch: Field '${key}' expected ${expectedType}, got ${typeof data[key]}`);
            }
        }

        // 4. Sanitización básica
        const sanitizedData = { ...data };

        return {
            isValid: errors.length === 0,
            errors: errors.length > 0 ? errors : undefined,
            sanitizedData: errors.length === 0 ? sanitizedData : undefined
        };
    }
}