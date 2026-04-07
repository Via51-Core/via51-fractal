/**
 * SHARED HOOK: useSystemStream
 * Función: Monitoreo del pulso vital del sistema (Pilares y Emergencias).
 * Norma: Agnosticismo de Datos y Tipado Fuerte.
 */

import { useEffect, useState, useCallback } from 'react';
import { dataClient } from '@gamma/lib/supabaseClient';
import { SCHEMA } from '@gamma/lib/constants';

// 1. Definición de Interfaces (Soberanía del Dato)
interface Node {
    id: string;
    type: 'political' | 'social' | 'productive';
    is_active: boolean;
    is_emergency: boolean;
    payload: any;
}

interface SystemState {
    pillars: {
        political?: Node;
        social?: Node;
        productive?: Node;
    };
    critical_event: Node | null;
}

export function useSystemStream() {
    const [data, setData] = useState<SystemState>({
        pillars: {},
        critical_event: null
    });
    const [config, setConfig] = useState({ is_critical_mode: false });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // 2. Función de Carga Memoizada (Estabilidad Beta)
    const fetchEngineState = useCallback(async () => {
        try {
            // Ejecución paralela para optimizar latencia
            const [configRes, nodesRes] = await Promise.all([
                dataClient.from(SCHEMA.TABLES.CONFIG).select('*').single(),
                dataClient.from(SCHEMA.TABLES.REGISTRY).select('*').eq('is_active', true)
            ]);

            if (configRes.error) throw configRes.error;
            if (nodesRes.error) throw nodesRes.error;

            const engineConfig = configRes.data;
            const nodes: Node[] = nodesRes.data || [];

            setConfig({
                is_critical_mode: engineConfig?.operational_mode === 'CRITICAL'
            });

            setData({
                pillars: {
                    political: nodes.find(n => n.type === 'political'),
                    social: nodes.find(n => n.type === 'social'),
                    productive: nodes.find(n => n.type === 'productive'),
                },
                critical_event: nodes.find(n => n.is_emergency === true) || null
            });

        } catch (err: any) {
            console.error("[VÍA51-CORE] Stream Error:", err.message);
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // Inicialización Síncrona
        fetchEngineState();

        // 3. Suscripción Real-time Optimizada
        const canal = dataClient
            .channel('system-pulse')
            .on('postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: SCHEMA.TABLES.CONFIG
                },
                () => fetchEngineState()
            )
            .on('postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: SCHEMA.TABLES.REGISTRY
                },
                () => fetchEngineState()
            )
            .subscribe();

        return () => {
            dataClient.removeChannel(canal);
        };
    }, [fetchEngineState]);

    return { data, config, loading, error };
}
