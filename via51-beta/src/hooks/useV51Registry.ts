import { useState, useEffect } from 'react';
import { supabase } from '@gamma/lib/supabaseClient';
import { SCHEMA } from '@gamma/lib/constants';

export const useV51Registry = () => {
    const [nodes, setNodes] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRegistry = async () => {
            const { data, error } = await supabase
                .from(SCHEMA.TABLES.REGISTRY)
                .select('*')
                .order('level', { ascending: true });

            if (!error) setNodes(data || []);
            setLoading(false);
        };

        fetchRegistry();
    }, []);

    return { nodes, loading };
};