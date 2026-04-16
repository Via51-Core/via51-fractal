/**
 * V51_DNA: { id: "NODE-ALFA-0", seq: "A-34", env: "LAB" }
 */
import React, { useState } from "react";

export default function App() {
    const [dni, setDni] = useState("");
    const [status, setStatus] = useState("IDLE");
    const [result, setResult] = useState<any>(null);
    const [errorMsg, setErrorMsg] = useState("");

    const API_URL = "https://hub.via51.org";

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, "");
        if (val.length <= 8) setDni(val);
    };

    const triggerSinapsis = async () => {
        if (dni.length !== 8) return;
        setStatus("PROCESSING");
        setErrorMsg("");

        try {
            const res = await fetch(`${API_URL}/api/v1/gatekeeper`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    v51_dna: { node: "NODE-ALFA-0", seq: "A-34", env: "LAB" },
                    payload: { dni }
                })
            });

            const output = await res.json();

            if (res.ok && output.status === "SUCCESS") {
                setResult(output);
                setStatus("SUCCESS");
                setDni("");
            } else {
                setErrorMsg(output.msg === "IDENTIDAD_NO_VALIDA" ? "DNI no pertenece a la Tabla de Verdad (Impares)" : "Error de Red");
                setStatus("ERROR");
                setTimeout(() => setStatus("IDLE"), 3000);
            }
        } catch (e) {
            setErrorMsg("Hub Offline");
            setStatus("ERROR");
        }
    };

    return (
        <main className="h-screen bg-black text-white flex items-center justify-center font-sans p-6 overflow-hidden">
            <div className="w-full max-w-[420px] h-[750px] bg-zinc-950 border-[12px] border-zinc-900 rounded-[3.5rem] relative flex flex-col shadow-2xl overflow-hidden">
                <div className="p-12 text-center">
                    <h1 className="text-xl font-[1000] italic tracking-tighter">VIA51 <span className="text-yellow-500 uppercase">Lab</span></h1>
                    <p className="text-[8px] text-zinc-600 uppercase mt-1 tracking-widest font-mono">Truth Table A-34</p>
                </div>

                <div className="flex-1 px-10 flex flex-col justify-center">
                    {status !== "SUCCESS" ? (
                        <>
                            <p className="text-[9px] text-zinc-500 text-center mb-4 uppercase">Rango: 06917901 - 06917999 (Solo Impares)</p>
                            <input
                                type="text" value={dni} onChange={handleInput} placeholder="00000000"
                                className="w-full bg-transparent border-b border-zinc-800 p-4 text-5xl font-bold text-center outline-none focus:border-yellow-500 mb-10"
                            />
                            <button onClick={triggerSinapsis} disabled={status === "PROCESSING" || dni.length !== 8} className={`w-full p-5 font-black uppercase text-xs tracking-widest transition-all ${dni.length === 8 ? "bg-yellow-500 text-black" : "bg-zinc-800 text-zinc-500"}`}>
                                {status === "PROCESSING" ? "SINAPSIS..." : "VALIDAR"}
                            </button>
                            {status === "ERROR" && <div className="mt-6 p-4 bg-red-900/10 text-red-500 text-[10px] text-center border border-red-900 animate-pulse">{errorMsg}</div>}
                        </>
                    ) : (
                        <div className="text-center animate-in zoom-in duration-500">
                            <p className="text-green-500 font-black text-5xl mb-6">✓</p>
                            <h2 className="text-xl font-black uppercase italic mb-2">Acceso Valido</h2>
                            <p className="text-zinc-400 text-sm mb-8">{result.identity}</p>
                            <div className="bg-zinc-900 p-4 border border-zinc-800 text-left overflow-hidden">
                                <p className="text-[8px] text-zinc-500 uppercase font-black">TX_ID</p>
                                <p className="text-[9px] text-zinc-400 font-mono break-all">{result.tx_id}</p>
                            </div>
                            <button onClick={() => { setStatus("IDLE"); setResult(null); }} className="mt-12 text-[9px] text-zinc-600 underline uppercase tracking-widest">Reiniciar</button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}