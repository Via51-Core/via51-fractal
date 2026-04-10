import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Send, Plus, Trash2, ShieldCheck } from 'lucide-react';

interface CapturerProps {
    selectedNode: { id: string; name: string; path: string };
    onClose: () => void;
}

const AgnosticCapturer: React.FC<CapturerProps> = ({ selectedNode, onClose }) => {
    // Estado para campos dinámicos (Agnosticismo)
    const [fields, setFields] = useState([{ key: '', value: '' }]);
    const [isSending, setIsSending] = useState(false);

    const addField = () => setFields([...fields, { key: '', value: '' }]);

    const removeField = (index: number) => {
        setFields(fields.filter((_, i) => i !== index));
    };

    const handleSendToHub = async () => {
        setIsSending(true);

        // Construcción del Payload según Plano CoreVia51
        const payload = fields.reduce((acc, curr) => {
            if (curr.key) acc[curr.key] = curr.value;
            return acc;
        }, {} as Record<string, any>);

        try {
            // Envío al HUB (Beta) - Tabla domain_data
            const { error } = await supabase.from('domain_data').insert({
                node_id: selectedNode.id,
                payload: payload,
                status: 'PENDIENTE', // Estado inicial agnóstico
            });

            if (error) throw error;
            alert(`ÉXITO: Datos enviados al nodo ${selectedNode.name}`);
            onClose();
        } catch (err) {
            console.error("ERROR DE HUB:", err);
            alert("FALLO DE VALIDACIÓN EN HUB BETA");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-slate-900 border border-blue-500/50 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden">
                {/* Cabecera de Mando */}
                <div className="bg-blue-600/20 p-4 border-b border-blue-500/30 flex justify-between items-center">
                    <div>
                        <h2 className="text-blue-400 font-black text-sm uppercase tracking-tighter">Capturador de Datos</h2>
                        <p className="text-[10px] text-slate-400">NODO DESTINO: {selectedNode.path}</p>
                    </div>
                    <button onClick={onClose} className="text-slate-500 hover:text-white">✕</button>
                </div>

                {/* Campos Dinámicos */}
                <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                    {fields.map((field, index) => (
                        <div key={index} className="flex gap-2 items-center">
                            <input
                                placeholder="Propiedad (ej: nombre_evento)"
                                className="bg-slate-800 border border-slate-700 p-2 rounded text-xs w-1/2 focus:border-blue-500 outline-none"
                                value={field.key}
                                onChange={(e) => {
                                    const newFields = [...fields];
                                    newFields[index].key = e.target.value;
                                    setFields(newFields);
                                }}
                            />
                            <input
                                placeholder="Valor"
                                className="bg-slate-800 border border-slate-700 p-2 rounded text-xs w-1/2 focus:border-blue-500 outline-none"
                                value={field.value}
                                onChange={(e) => {
                                    const newFields = [...fields];
                                    newFields[index].value = e.target.value;
                                    setFields(newFields);
                                }}
                            />
                            <button onClick={() => removeField(index)} className="text-red-500/50 hover:text-red-500">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}

                    <button
                        onClick={addField}
                        className="w-full py-2 border border-dashed border-slate-700 rounded text-slate-500 hover:text-blue-400 hover:border-blue-400 transition-all text-xs flex justify-center items-center gap-2"
                    >
                        <Plus size={14} /> Añadir Atributo
                    </button>
                </div>

                {/* Acción de Envío */}
                <div className="p-4 bg-slate-800/50 border-t border-slate-800 flex justify-end gap-3">
                    <button
                        disabled={isSending}
                        onClick={handleSendToHub}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded font-bold text-xs flex items-center gap-2 transition-all disabled:opacity-50"
                    >
                        {isSending ? 'PROCESANDO EN HUB...' : 'ENVIAR AL ECOSISTEMA'}
                        <Send size={14} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AgnosticCapturer;