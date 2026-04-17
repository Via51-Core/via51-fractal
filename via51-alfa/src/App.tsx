import React, { useState } from "react";

export default function App() {
    const [dni, setDni] = useState("");
    const [status, setStatus] = useState("IDLE");
    const [user, setUser] = useState<any>(null);

    const triggerSinapsis = async () => {
        if (dni.length !== 8) return;
        setStatus("PROCESSING");
        try {
            const res = await fetch("https://hub.via51.org/api/v1/gatekeeper", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    v51_dna: { node: "NODE-ALFA-0", seq: "A-39", env: "LAB", pulse: Date.now() },
                    payload: { dni }
                })
            });
            const out = await res.json();
            if (res.ok && out.status === "SUCCESS") {
                setUser(out.user);
                setStatus("SUCCESS");
                setDni("");
            } else {
                alert(out.msg || "RECHAZADO");
                setStatus("IDLE");
            }
        } catch (e) {
            alert("ERROR_CONEXION");
            setStatus("IDLE");
        }
    };

    return (
        <main className="h-screen bg-black text-white flex items-center justify-center font-sans p-6 overflow-hidden">
            <div className="w-full max-w-[420px] h-[750px] bg-zinc-950 border-[12px] border-zinc-900 rounded-[3.5rem] relative flex flex-col shadow-2xl overflow-hidden">
                <div className="p-12 text-center">
                    <h1 className="text-2xl font-[1000] italic tracking-tighter">VIA51 <span className="text-green-500 uppercase">Antigravity</span></h1>
                </div>
                <div className="flex-1 px-10 flex flex-col justify-center">
                    {status !== "SUCCESS" ? (
                        <>
                            <input type="text" value={dni} onChange={e => setDni(e.target.value.replace(/\D/g, "").slice(0,8))} placeholder="00000000" className="w-full bg-transparent border-b border-zinc-800 p-4 text-5xl font-bold text-center outline-none focus:border-green-500 mb-10" />
                            <button onClick={triggerSinapsis} disabled={status === "PROCESSING" || dni.length !== 8} className={`w-full p-5 font-black uppercase text-xs tracking-widest transition-all ${dni.length === 8 ? "bg-green-600 text-black" : "bg-zinc-800 text-zinc-500"}`}>
                                {status === "PROCESSING" ? "VALIDANDO..." : "INICIAR SINAPSIS"}
                            </button>
                        </>
                    ) : (
                        <div className="text-center animate-in zoom-in duration-500">
                            <p className="text-green-500 font-black text-5xl mb-4">✓</p>
                            <h2 className="text-xl font-black uppercase italic">{user.name}</h2>
                            <p className="text-[10px] text-purple-500 font-bold mt-2 uppercase">{user.role} {user.vitalicio ? "VITALICIO" : ""}</p>
                            <div className="mt-8 p-4 bg-zinc-900 border border-zinc-800 text-left">
                                <p className="text-[8px] text-zinc-500 uppercase font-black">Autenticacion</p>
                                <p className="text-xs text-green-400 font-bold">{user.auth}</p>
                            </div>
                            <button onClick={() => { setStatus("IDLE"); setUser(null); }} className="mt-12 text-[9px] text-zinc-600 underline uppercase">Cerrar</button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
