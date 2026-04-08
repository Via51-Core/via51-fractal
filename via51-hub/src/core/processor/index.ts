import { createClient } from '@supabase/supabase-client';
import { CorePayload, ValidationResult } from '../../types/core';

// Inicialización agnóstica (Variables de entorno gestionadas por Gamma)
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export class UniversalProcessor {

    public static async execute(payload: CorePayload): Promise<void> {
        const { sender, timestamp } = payload.metadata;

        try {
            // 1. VERIFICACIÓN DE SOBERANÍA (Jerarquía)
            const { data: permission } = await supabase
                .from('user_permissions')
                .select('*')
                .eq('id', sender)
                .single();

            if (!permission || permission.hierarchy_level > payload.data.requiredLevel) {
                throw new Error("INSUBORDINACIÓN: Nivel de jerarquía insuficiente.");
            }

            // 2. EJECUCIÓN DE TRANSICIÓN (Update Domain Data)
            // Agnosticismo: No sabemos qué es el payload, solo que va a 'domain_data'
            const { data: record, error: txError } = await supabase
                .from('domain_data')
                .upsert({
                    node_id: payload.data.nodeId,
                    payload: payload.data,
                    status: payload.data.nextStatus,
                    updated_at: new Date(timestamp).toISOString()
                });

            if (txError) throw txError;

            // 3. REGISTRO INMUTABLE (sys_events)
            await this.logToSysEvents(payload, 'SUCCESS');

            // 4. VAULT DE RESPALDO (sys_payload_vault)
            await supabase.from('sys_payload_vault').insert({
                node_id: payload.data.nodeId,
                payload: payload.data,
                checksum: this.generateChecksum(payload.data),
                is_active: true
            });

        } catch (error) {
            await this.logToSysEvents(payload, 'FAILURE');
            console.error(`[PROCESSOR-ERROR] ${error.message}`);
            throw error;
        }
    }

    private static async logToSysEvents(payload: CorePayload, status: string) {
        await supabase.from('sys_events').insert({
            actor_id: payload.metadata.sender,
            action_type: payload.action,
            payload_snapshot: payload.data,
            status: status,
            node_id: payload.data.nodeId
        });
    }

    private static generateChecksum(data: any): string {
        // Lógica para asegurar la integridad de los datos
        return Buffer.from(JSON.stringify(data)).toString('base64').substring(0, 16);
    }
}