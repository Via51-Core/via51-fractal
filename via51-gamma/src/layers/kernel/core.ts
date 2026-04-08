import { supabase } from '../lib/supabaseClient';
import { SCHEMA } from '../lib/constants';

export const V51_CORE = {
    vault: {
        /**
         * Recupera el payload agnóstico de un nodo.
         */
        async get(nodeId: string) {
            const { data, error } = await supabase
                .from(SCHEMA.TABLES.VAULT)
                .select('payload, version')
                .eq('node_id', nodeId)
                .eq('is_active', true)
                .single();

            if (error) throw new Error(`[V51-VAULT] Access Denied: ${error.message}`);
            return data.payload;
        }
    },

    events: {
        /**
         * Registra un impacto inmutable en el sistema.
         */
        async emit(nodeId: string, type: string, payload: any) {
            return await supabase.from(SCHEMA.TABLES.EVENTS).insert({
                node_id: nodeId,
                action_type: type,
                payload_snapshot: payload
            });
        }
    }
};
