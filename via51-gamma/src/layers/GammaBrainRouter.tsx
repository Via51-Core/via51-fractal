/**
 * PATH: src/layers/gamma/pages/GammaBrainRouter.tsx
 * ROLE: Nivel 2 - GAMMA (Cerebro)
 * DESC: Orquestador de rutas de alto nivel y control de acceso.
 */

import React from 'react';
// CORRECCIÓN SOBERANA: Se elimina la extensión .tsx para cumplir con el estándar ESM
import NodeSwitcher from '@beta/core-tools/NodeSwitcher';

export const GammaBrainRouter: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

            <div className="w-full max-w-4xl z-10 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800 p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-blue-900/10">
                <header className="mb-10 text-center">
                    <h2 className="text-[10px] font-black tracking-[0.5em] text-blue-500 uppercase">
                        GAMMA_BRAIN_ROUTER_ONLINE
                    </h2>
                </header>

                {/* Punto de entrada al Switcher Beta */}
                <NodeSwitcher />
            </div>
        </div>
    );
};

export default GammaBrainRouter;