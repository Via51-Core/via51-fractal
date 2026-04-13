/**
 * V51_DNA: { node: "DRIVER-ALFA", env: "LAB", seq: "A-21" }
 * ESTADO: LABORATORIO DE PREVISUALIZACION
 */
import React from "react";

export default function App() {
    // El Driver de entrada apunta al Hub pero se identifica como LAB
    const API_URL = import.meta.env.VITE_API_URL || "https://hub.via51.org";

    return (
        <main className="h-screen bg-black text-white flex flex-col items-center justify-center font-sans">
            <h1 className="text-4xl font-black italic tracking-tighter mb-4">
                VIA51 <span className="text-yellow-500">LAB</span>
            </h1>
            <div className="h-0.5 w-12 bg-yellow-500 mb-6 opacity-50"></div>
            <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-500">
                Entorno de Previsualizacion Soberano
            </p>

            {/* Etiqueta de seguridad de rama */}
            <div className="absolute bottom-10 px-4 py-1 border border-yellow-500/30 rounded-full text-[8px] text-yellow-500 uppercase tracking-widest">
                Branch: dev // Sync: A-21
            </div>
        </main>
    );
}