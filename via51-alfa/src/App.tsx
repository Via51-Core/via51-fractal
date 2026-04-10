import React from 'react';

export default function App() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-6">
            <div className="max-w-md border-l-4 border-blue-500 bg-zinc-900 p-8 shadow-xl">
                <h1 className="text-sm font-bold tracking-widest text-blue-400 uppercase">Vía51 // Alfa</h1>
                <h2 className="mt-2 text-3xl font-light">Interfaz de Mentoría</h2>
                <p className="mt-4 text-zinc-400 text-sm">Nivel 0: Captura y Front-End Público.</p>
                <div className="mt-6 flex items-center gap-2">
                    <span className="h-2 w-2 animate-ping rounded-full bg-blue-500"></span>
                    <span className="text-xs font-mono text-blue-300">PUERTO 5173: OPERATIVO</span>
                </div>
            </div>
        </div>
    );
}