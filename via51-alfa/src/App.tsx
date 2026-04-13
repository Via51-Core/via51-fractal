import React, { useState } from 'react';

export default function App() {
    const [dni, setDni] = useState('');
    const [status, setStatus] = useState('IDLE');
    const [response, setResponse] = useState<any>(null);

    // DNA INYECTADO: Marcador de Sincronia de Laboratorio
    const V51_DNA = { id: "NODE-ALFA-0", seq: "A-22", pulse: Date.now() };

    // El Driver apunta a la URL configurada o al puerto local 3000
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

    const sendToCore = async () => {
        // Validacion local antes de enviar a la maquina
        if (!/^[0-9]{8}$/.test(dni)) {
            alert("Formato de DNI invalido. Deben ser 8 numeros.");
            return;
        }

        setStatus('PROCESSING');
        try {
            // Empaquetamiento segun el contrato de la Caja Negra
            const res = await fetch(`${API_URL}/api/v1/gatekeeper`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    v51_dna: V51_DNA,
                    action: 'CHECK_IDENTITY',
                    payload: { dni }
                })
            });
            const data = await res.json();
            setResponse(data);
            setStatus('SUCCESS');
        } catch (e) {
            console.warn("[V51] Error de sinapsis con el hub.");
            setStatus('ERROR');
        }
    };

    return (
        <main className="h-screen bg-black text-white flex flex-col items-center justify-center font-sans overflow-hidden">
            <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-8 shadow-2xl relative">
                {/* DNA VISIBLE EN ENTORNO DE PRUEBAS */}
                <p className="text-[8px] text-zinc-600 uppercase tracking-widest absolute top-3 right-4 font-mono">
                    Seq: A-22 // Lab
                </p>

                <h1 className="text-3xl font-[1000] italic tracking-tighter mb-2">
                    VIA51 <span className="text-yellow-500">LAB</span>
                </h1>
                <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-8">
                    Modulo de Captura de Identidad
                </p>

                <div className="space-y-6">
                    <div>
                        <label className="text-[10px] text-zinc-500 uppercase block mb-2 font-bold">
                            Ingrese DNI
                        </label>
                        <input
                            type="text"
                            maxLength={8}
                            value={dni}
                            onChange={(e) => setDni(e.target.value)}
                            placeholder="00000000"
                            className="w-full bg-zinc-950 border border-zinc-800 p-4 text-center text-2xl text-white font-mono focus:border-yellow-500 outline-none transition-colors"
                        />
                    </div>

                    <button
                        onClick={sendToCore}
                        disabled={status === 'PROCESSING'}
                        className={`w-full p-4 font-black uppercase text-xs tracking-widest transition-colors ${status === 'PROCESSING'
                                ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                                : 'bg-yellow-500 hover:bg-yellow-400 text-black'
                            }`}
                    >
                        {status === 'PROCESSING' ? 'Procesando...' : 'Validar Sinapsis'}
                    </button>

                    {/* RESPUESTA DE LA CAJA NEGRA (OUTPUT) */}
                    {status === 'SUCCESS' && response && (
                        <div className="mt-4 p-4 bg-zinc-950 border-l-2 border-green-500 text-xs font-mono text-zinc-400 animate-in fade-in duration-500">
                            <p className="text-green-500 font-bold mb-1">Respuesta Exitosa</p>
                            <p>Status: {response.status}</p>
                            <p>TX_ID: {response.tx_id || "N/A"}</p>
                        </div>
                    )}

                    {status === 'ERROR' && (
                        <div className="mt-4 p-4 bg-zinc-950 border-l-2 border-red-500 text-xs font-mono text-zinc-400">
                            <p className="text-red-500 font-bold">Fallo de conexion</p>
                            <p>No se pudo establecer sinapsis con hub.via51.org</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}