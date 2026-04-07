import React, { useState, useEffect } from 'react';
import { supabase } from '@gamma/lib/supabaseClient';
import { SCHEMA } from '@gamma/lib/constants';

interface NodeEngineProps {
  tenantSlug: string;
}

const NodeEngine: React.FC<NodeEngineProps> = ({ tenantSlug }) => {
  const [nodo, setNodo] = useState<any>(null);
  const [emergencia, setEmergencia] = useState({ activado: false, mensaje: "" });

  useEffect(() => {
    const init = async () => {
      // 1. Cargar Contenido del Nodo
      const { data } = await supabase
        .from(SCHEMA.TABLES.REGISTRY) // Uso de constante soberana
        .select('*, node_data:domain_data!inner(*)')
        .eq('slug', tenantSlug)
        .single();

      if (data) setNodo(data);

      // 2. Escuchar el Botón Rojo (Emergencia)
      const { data: emData } = await supabase
        .from(SCHEMA.TABLES.SECURITY)
        .select('*')
        .eq('id', 'global_veto')
        .single();

      if (emData?.is_active) {
        setEmergencia({ activado: true, mensaje: emData.veto_message });
      }
    };

    init();

    // Suscripción Real-time (Tráfico Beta)
    const sub = supabase.channel('global-security')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: SCHEMA.TABLES.SECURITY },
        payload => {
          setEmergencia({ activado: payload.new.is_active, mensaje: payload.new.veto_message });
        })
      .subscribe();

    return () => {
      supabase.removeChannel(sub);
    };
  }, [tenantSlug]);

  if (emergencia.activado) {
    return (
      <div className="h-screen w-screen bg-red-900 flex items-center justify-center p-10 text-center animate-pulse">
        <h1 className="text-white text-5xl font-black uppercase italic tracking-tighter">
          {emergencia.mensaje}
        </h1>
      </div>
    );
  }

  if (!nodo) return <div className="bg-black h-screen" />;

  return (
    <div className="h-screen w-screen bg-black overflow-hidden relative">
      <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover opacity-60">
        <source src={nodo.node_data?.url_media} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      <div className="absolute bottom-16 left-12 right-12 z-10">
        <h2 className="text-white text-6xl font-black uppercase leading-none mb-4 tracking-tighter">
          {nodo.node_data?.titulo_que}
        </h2>
        <div className="h-1 w-20 bg-blue-600 mb-6" />
        <p className="text-zinc-400 text-xl italic font-light max-w-2xl">
          {nodo.node_data?.descripcion_como}
        </p>
      </div>
    </div>
  );
};

export default NodeEngine;
