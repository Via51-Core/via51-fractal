import { useState, useEffect } from 'react';
import { supabase } from '@gamma/lib/supabaseClient';
import { SCHEMA } from '@gamma/lib/constants';

export const useNodeStream = (nodeId: string | null = 'default-node') => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!nodeId) return;
    const fetchInitial = async () => {
      try {
        setLoading(true);
        const { data: res, error: err } = await supabase
          .from(SCHEMA.TABLES.EVENTS)
          .select('*')
          .eq('node_id', nodeId)
          .limit(10);

        if (err) throw err;
        setData(res || []);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchInitial();
  }, [nodeId]);

  return { data, loading, error };
};
