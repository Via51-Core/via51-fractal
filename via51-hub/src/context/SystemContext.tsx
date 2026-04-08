import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@gamma/lib/supabaseClient'; // Importación desde Gamma

// Definición de la Interfaz (Soberanía del Dato)
interface SystemState {
  mode: string;
  activeCoyunturaId: string | null;
}

export const SystemContext = createContext<{ config: SystemState } | null>(null);

export const SystemProvider = ({ children }: { children: React.ReactNode }) => {
  const [config, setConfig] = useState<SystemState>({
    mode: 'NORMAL',
    activeCoyunturaId: null
  });

  useEffect(() => {
    // Suscripción Real-time (Tráfico Beta)
    const channel = supabase
      .channel('system_changes')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'sys_config' },
        (payload: any) => {
          setConfig((prev) => ({ ...prev, ...payload.new }));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <SystemContext.Provider value={{ config }}>
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = () => {
  const context = useContext(SystemContext);
  if (!context) throw new Error("useSystem debe usarse dentro de SystemProvider");
  return context;
};

