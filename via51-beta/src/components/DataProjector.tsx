/**
 * BETA LAYER: DataProjector
 * Identity: V51_Alpha_DataProjector_Core
 * Función: Proyección dinámica de departamentos mediante Lazy Loading.
 * Norma: Agnosticismo de Interfaz y Carga Bajo Demanda.
 */

import React, { Suspense, lazy } from "react";

// 1. Implementación de Lazy Loading para optimizar la carga del nodo
const SocialDept = lazy(() => import("./depts/SocialDept"));
const PoliticsDept = lazy(() => import("./depts/PoliticsDept"));
const ProductionDept = lazy(() => import("./depts/ProductionDept"));

/**
 * Interface de Proyección de Departamentos
 * Garantiza el tipado fuerte para la transición entre nodos.
 */
interface DataProjectorProps {
  activeNode: 'SOCIAL' | 'POLITICAL' | 'PRODUCTIVE';
  config?: any; // Configuración inyectada desde el Registry
}

export const DataProjector: React.FC<DataProjectorProps> = ({ activeNode, config = {} }) => {
  return (
    <div className="v51-projection-container w-full min-h-[400px] bg-zinc-950/50 rounded-xl overflow-hidden border border-zinc-900">
      {/* 2. Capa de Suspensión (UX de Transición Soberana) */}
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center p-20 space-y-4">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-[10px] font-mono text-zinc-500 tracking-[0.3em] uppercase animate-pulse">
            SYNCHRONIZING_V51_NODE...
          </p>
        </div>
      }>

        {/* 3. Renderizado Condicional por Triada de Poder */}
        <div className="p-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
          {activeNode === 'SOCIAL' && <SocialDept config={config} />}
          {activeNode === 'POLITICAL' && <PoliticsDept config={config} />}
          {activeNode === 'PRODUCTIVE' && <ProductionDept config={config} />}
        </div>

      </Suspense>
    </div>
  );
};

export default DataProjector;