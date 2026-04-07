/**
 * BETA LAYER: NodeSwitcher
 * Función: Conmutador Lógico de Nodo por Hostname.
 * Norma: Agnosticismo de Interfaz (Bifurcación Soberana).
 */

import React, { useEffect, useState } from 'react';
// CORRECCIÓN SOBERANA: Se eliminan las llaves { } porque son exportaciones por defecto
import PublicFeed from '@alfa/views/PublicFeed';
import AdminControl from '@alfa/views/AdminControl';

const NodeSwitcher: React.FC = () => {
  const [nodeType, setNodeType] = useState<'ALFA' | 'GAMMA' | 'LOADING'>('LOADING');

  useEffect(() => {
    const hostname = window.location.hostname;

    // Lógica de detección de soberanía de red
    if (hostname.startsWith('gamma.')) {
      setNodeType('GAMMA');
    } else {
      setNodeType('ALFA');
    }
  }, []);

  if (nodeType === 'LOADING') {
    return (
      <div className="flex items-center justify-center p-20 animate-pulse">
        <span className="text-[10px] font-mono text-zinc-600 tracking-[0.4em]">
          DETECTING_NODE_AUTHORITY...
        </span>
      </div>
    );
  }

  return (
    <div className="v51-node-context transition-opacity duration-1000">
      {nodeType === 'GAMMA' ? <AdminControl /> : <PublicFeed />}
    </div>
  );
};

export default NodeSwitcher;