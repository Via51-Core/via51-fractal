import React from 'react';

export const NodeEngine = ({ nodeConfig }: { nodeConfig: any }) => {
    const { ui, input } = nodeConfig;

    return (
        <div style={{ borderColor: ui.color }} className="p-8 border-2 rounded-3xl bg-slate-900/50">
            <h1 style={{ color: ui.color }} className="text-3xl font-black uppercase tracking-tighter">
                {ui.title || "Nodo Agnóstico"}
            </h1>

            {/* Generación dinámica de la fachada de entrada */}
            <div className="mt-10 space-y-4">
                {input.fields.map((field: any) => (
                    <div key={field.name} className="flex flex-col gap-2">
                        <label className="text-[10px] text-slate-500 uppercase font-bold">{field.label}</label>
                        <input
                            type={field.type}
                            className="bg-slate-800 border border-slate-700 p-3 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        />
                    </div>
                ))}
            </div>

            <button style={{ backgroundColor: ui.color }} className="mt-8 w-full py-4 rounded-xl font-bold text-white uppercase">
                Emitir Información
            </button>
        </div>
    );
};