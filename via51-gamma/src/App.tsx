import React from 'react';

export default function App() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-6">
            <div className="max-w-md border-l-4 border-green-500 bg-zinc-900 p-8 shadow-xl">
                <h1 className="text-sm font-bold tracking-widest text-green-400 uppercase">Vía51 // Gamma</h1>
                <h2 className="mt-2 text-3xl font-light">Inteligencia Digital</h2>
                <p className="mt-4 text-zinc-400 text-sm">Nivel 2: Comando, Veto y Super Propietario.</p>
                <div className="mt-6 flex items-center gap-2">
                    <span className="h-2 w-2 animate-ping rounded-full bg-green-500"></span>
                    <span className="text-xs font-mono text-green-300">PUERTO 5175: OPERATIVO</span>
                </div>
            </div>
        </div>
    );
}