import React, { useState } from 'react';

export const NodeEngine = ({ resultFromDriver }: { resultFromDriver: any }) => {
  if (!resultFromDriver) return null;

  return (
    <div className="mt-6 p-6 rounded-2xl bg-slate-900 border border-blue-500/30 shadow-2xl animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-2 h-2 rounded-full ${resultFromDriver.severity === 'ÉXITO' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`} />
        <span className="text-[10px] font-mono text-slate-500">{resultFromDriver.timestamp}</span>
      </div>

      <h2 className="text-white font-bold text-lg leading-tight">
        {resultFromDriver.mensaje}
      </h2>

      <p className="mt-3 text-blue-400 text-xs font-medium uppercase tracking-wider">
        Próximo paso: {resultFromDriver.accion_sugerida}
      </p>

      {/* Si el resultado es técnico, se oculta en un colapsable para no ensuciar la vista */}
      <details className="mt-6 border-t border-slate-800 pt-4">
        <summary className="text-[9px] text-slate-600 cursor-pointer hover:text-slate-400 uppercase font-bold">
          Ver rastro técnico (Metadata)
        </summary>
        <pre className="mt-2 text-[9px] text-slate-500 bg-black p-3 rounded overflow-x-auto">
          {JSON.stringify(resultFromDriver.data, null, 2)}
        </pre>
      </details>
    </div>
  );
};