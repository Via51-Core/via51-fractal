import React, { useState, useEffect } from 'react';
import { supabase } from '@gamma/lib/supabaseClient';
import { SCHEMA } from '@gamma/lib/constants';

const PantallaAlfa: React.FC = () => {
  const [nodo, setNodo] = useState<any>(null);

  useEffect(() => {
    const subscription = supabase
      .channel('cambios-alfa')
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: SCHEMA.TABLES.REGISTRY, filter: "slug=eq.pol" },
        (payload) => {
          setNodo(payload.new);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  if (!nodo) return null;

  return (
    <div className="p-4 bg-zinc-900 border border-zinc-800 rounded">
      <p className="text-blue-500 text-[10px] font-mono">ALFA_NODE_SYNC: {nodo.slug}</p>
    </div>
  );
};

export default PantallaAlfa;
