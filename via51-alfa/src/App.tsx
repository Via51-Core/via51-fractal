import React, { useState } from "react";

export default function App() {
    const [dni, setDni] = useState("");
    const [status, setStatus] = useState("IDLE");
    const [txId, setTxId] = useState("");

    const API_URL = "https://hub.via51.org";

    // FILTRO RIGUROSO: Solo permite numeros y maximo 8 caracteres
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, "");
        if (val.length <= 8) {
            setDni(val);
        }
    };

    const triggerSinapsis = async () => {
        if (dni.length !== 8) return;

        setStatus("PROCESSING");
        try {
            const res = await fetch(`${API_URL}/api/v1/gatekeeper`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    // DNA con UUID valido para actor_id de Supabase
                    v51_dna: {
                        node_id: "00000000-0000-0000-0000-000000000000",
                        seq: "A-31",
                        env: "LAB"
                    },
                    payload: { dni }
                })
            });
            const data = await res.json();
            if (data.tx_id) {
                setTxId(data.tx_id);
                setStatus("SUCCESS");
            } else {
                console.error("Error del Hub:", data.msg);
                setStatus("ERROR");
            }
        } catch (e) {
            setStatus("ERROR");
        }
    };

    return (
        <main className="h-screen bg-black text-white flex items-center justify-center font-sans p-6">
            <div className="w-full max-w-[420px] h-[700px] bg-zinc-950 border-[12px] border-zinc-900 rounded-[3.5rem] relative flex flex-col shadow-2xl overflow-hidden">
                <div className="p-12 text-center">
                    <h1 className="text-2xl font-[1000] italic tracking-tighter">VIA51 <span className="text-green-500">ANTIGRAVITY</span></h1>
                </div>

                <div className="flex-1 px-10 flex flex-col justify-center">
                    {status !== "SUCCESS" ? (
                        <>
                            <p className="text-[10px] text-zinc-600 uppercase text-center mb-4 tracking-widest">DNI PERUANO</p>
                            <input
                                type="text"
                                inputMode="numeric"
                                value={dni}
                                onChange={handleInput}
                                placeholder="00000000"
                                className="w-full bg-transparent border-b border-zinc-800 p-4 text-5xl font-bold text-center outline-none focus:border-green-500 mb-10 transition-all"
                            />
                            <button
                                onClick={triggerSinapsis}
                                disabled={status === "PROCESSING" || dni.length !== 8}
                                className={`w-full p-5 font-black uppercase text-xs tracking-widest transition-all ${dni.length === 8 ? "bg-green-600 text-black hover:bg-white" : "bg-zinc-800 text-zinc-500"
                                    }`}
                            >
                                {status === "PROCESSING" ? "GRABANDO..." : "INICIAR SINAPSIS"}
                            </button>
                        </>
                    ) : (
                        <div className="text-center animate-in zoom-in duration-500">
                            <p className="text-green-500 font-black text-5xl mb-6">✓</p>
                            <h2 className="text-xl font-black uppercase italic mb-2">Sello Trazable</h2>
                            <p className="text-[10px] text-zinc-500 font-mono break-all bg-zinc-900 p-4 border border-zinc-800">
                                {txId}
                            </p>
                            <button onClick={() => { setStatus("IDLE"); setDni(""); }} className="mt-12 text-[9px] text-zinc-600 underline uppercase tracking-widest">Reiniciar</button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}