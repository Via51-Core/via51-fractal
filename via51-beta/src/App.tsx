import React from 'react';

export default function App() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-6">
            <div className="max-w-md border-l-4 border-yellow-500 bg-zinc-900 p-8 shadow-xl">
                <h1 className="text-sm font-bold tracking-widest text-yellow-400 uppercase">Vía51 // Beta</h1>
                <h2 className="mt-2 text-3xl font-light">Control de Tráfico</h2>
                <p className="mt-4 text-zinc-400 text-sm">Nivel 1: Procesamiento, Reglas y Flujos.</p>
                <div className="mt-6 flex items-center gap-2">
                    <span className="h-2 w-2 animate-ping rounded-full bg-yellow-500"></span>
                    <span className="text-xs font-mono text-yellow-300">PUERTO 5174: OPERATIVO</span>
                </div>
            </div>
        </div>
    );
}