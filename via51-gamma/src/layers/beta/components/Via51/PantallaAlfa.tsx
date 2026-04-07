/**
 * BETA LAYER: PantallaAlfa
 * Función: Interfaz de bienvenida y captura de contexto geográfico.
 * Norma: Inmutabilidad Visual (Tailwind) y Tipado Fuerte.
 */

import React, { useState, useEffect } from 'react';

// Interfaz de Integridad para el Nodo Beta
interface PantallaAlfaProps {
  data: any;
  onSeleccionar?: (tipo: string) => void;
}

export default function PantallaAlfa({ data, onSeleccionar }: PantallaAlfaProps) {
  const [visitante, setVisitante] = useState({ city: 'LIMA', ip: '...' });

  useEffect(() => {
    // Escaneo de Radar (IP/Ciudad)
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(info => setVisitante({ city: info.city, ip: info.ip }))
      .catch(() => setVisitante({ city: 'LIMA', ip: 'RADAR_ACTIVO' }));
  }, []);

  const titulo = data?.titulo_que || "SISTEMA_VÍA51";
  const desc = data?.descripcion_como || "Protocolo de transformación y soberanía tecnológica 2026.";

  return (
    <div
      onClick={() => onSeleccionar && onSeleccionar('ALFA_TOUCH')}
      className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center font-sans cursor-pointer group"
    >
      {/* Sovereign Border Box */}
      <div className="border border-yellow-500/20 rounded-[40px] p-10 md:p-16 max-w-2xl transition-all group-hover:border-yellow-500/40">

        {/* Radar Info */}
        <div className="mb-10">
          <span className="text-[10px] uppercase tracking-[0.4em] text-yellow-500 font-black animate-pulse">
            {visitante.city} // {visitante.ip}
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-5xl md:text-7xl font-black uppercase italic mb-10 leading-tight">
          <span className="text-yellow-500 block">{titulo}</span>
        </h1>

        {/* Agnostic Description */}
        <p className="text-xl md:text-2xl text-zinc-500 italic max-w-lg mx-auto border-l-4 border-yellow-500/20 pl-6 text-left leading-relaxed">
          "{desc}"
        </p>

        {/* Interaction Indicator */}
        <div className="mt-12 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="text-[9px] text-zinc-600 font-mono tracking-widest">
            CLICK_TO_PROCEED_
          </span>
        </div>
      </div>
    </div>
  );
}