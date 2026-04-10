import { useState, useEffect } from 'react';
import { supabase } from '@gamma/lib/supabaseClient';
import { SCHEMA } from '@gamma/lib/constants';

export const useTenant = () => {
    const [tenant, setTenant] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTenant = async () => {
            try {
                // Obtenemos el slug desde el subdominio o variable de entorno
                const slug = import.meta.env.VITE_DEV_CLIENT_SLUG || 'default';

                const { data, error } = await supabase
                    .from(SCHEMA.TABLES.REGISTRY)
                    .select('*, node_data:sys_payload_vault(*)')
                    .eq('slug', slug)
                    .single();

                if (error) throw error;
                setTenant(data);
            } catch (err) {
                console.error("[V51-BETA] Tenant lookup failed:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchTenant();
    }, []);

    return { tenant, loading };
};