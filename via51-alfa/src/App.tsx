import React, { useState, useEffect } from "react";

export default function App() {
    const [view, setView] = useState("CANVAS"); 
    const [dni, setDni] = useState("");
    const [user, setUser] = useState<any>(null);
    const [config, setConfig] = useState<any>(null);
    const [status, setStatus] = useState("IDLE");

    const API_URL = "https://hub.via51.org";

    useEffect(() => {
        fetch(`${API_URL}/api/v1/gatekeeper`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "GET_SMART_CANVAS", v51_dna: { node: "ALFA", env: "LAB" } })
        }).then(r => r.json()).then(data => { if(data.config) setConfig(data.config); });
    }, []);

    const handleAuth = async () => {
        if (dni.length !== 8) return;
        const res = await fetch(`${API_URL}/api/v1/gatekeeper`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ action: "CHECK_IDENTITY", payload: { dni }, v51_dna: { node: "ALFA", env: "LAB" } })
        });
        const out = await res.json();
        if (out.status === "SUCCESS") { setUser(out.user); setView("UPLOAD"); }
        else alert("Identidad no autorizada");
    };

    const handleFileUpload = async (e: any) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        const context = (document.getElementById("script_text") as HTMLTextAreaElement).value;

        reader.onloadend = async () => {
            setStatus("UPLOADING");
            const base64 = (reader.result as string).split(',')[1];
            const res = await fetch(`${API_URL}/api/v1/gatekeeper`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    action: "SUBMIT_CONTRIBUTION", 
                    payload: { dni, type: "IMAGE", file_name: file.name, file_base64: base64, context },
                    v51_dna: { node: "ALFA", env: "LAB" } 
                })
            });
            if (res.ok) setView("SUCCESS");
            setStatus("IDLE");
        };
        reader.readAsDataURL(file);
    };

    const MainUI = ({ mode }: { mode: "desktop" | "mobile" }) => (
        <div className={`h-full w-full relative flex flex-col items-center overflow-hidden bg-black font-sans ${config?.styles[mode].padding}`}>
            <div className="absolute inset-0 bg-cover bg-center opacity-60" style={{ backgroundImage: `url("/ceo-lima.png")` }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
            <div className="relative z-10 text-center w-full px-12">
                <p className="text-white font-black italic uppercase leading-tight" style={{ fontSize: config?.styles[mode].textScale }}>
                    VIA51 ANTIGRAVITY
                </p>
                <div className={`bg-purple-600 mx-auto shadow-[0_0_20px_purple] ${config?.styles[mode].lineMargin} h-1 w-16`}></div>
            </div>
            <button onClick={() => setView("LOGIN")} className="absolute bottom-10 right-10 w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/50 flex items-center justify-center z-50 animate-pulse">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            </button>
        </div>
    );

    return (
        <main className="min-h-screen bg-black text-white flex flex-row overflow-hidden">
            <div className="hidden lg:flex flex-[2] border-r border-white/5"><MainUI mode="desktop" /></div>
            <div className="flex-1 lg:max-w-[480px] h-screen bg-zinc-900 flex items-center justify-center p-4">
                <div className="w-full h-full max-h-[880px] bg-black border-[12px] border-zinc-800 rounded-[3.5rem] overflow-hidden relative shadow-2xl">
                    {view === "CANVAS" && <MainUI mode="mobile" />}
                    {view === "LOGIN" && (
                        <div className="absolute inset-0 bg-black/95 z-50 p-10 flex flex-col justify-center text-center">
                            <h2 className="text-white text-2xl font-black mb-10 uppercase italic">Identidad</h2>
                            <input type="text" value={dni} onChange={e => setDni(e.target.value.replace(/\D/g, "").slice(0,8))} placeholder="00000000" className="w-full bg-transparent border-b border-zinc-800 p-4 text-4xl font-bold text-center text-white outline-none focus:border-purple-500 mb-10" />
                            <button onClick={handleAuth} className="w-full bg-purple-600 text-white font-black p-5 uppercase text-xs tracking-widest">Validar</button>
                        </div>
                    )}
                    {view === "UPLOAD" && (
                        <div className="absolute inset-0 bg-black/95 z-50 p-10 flex flex-col justify-center animate-in slide-in-from-bottom duration-500">
                            <h2 className="text-green-500 text-[10px] font-bold mb-2 uppercase tracking-widest">Bienvenido, {user?.full_name}</h2>
                            <h3 className="text-white text-2xl font-black mb-8 uppercase italic">Nuevo Guion</h3>
                            <div className="space-y-4">
                                <input type="file" onChange={handleFileUpload} className="w-full text-[10px] text-zinc-500 file:bg-zinc-800 file:border-0 file:text-white file:px-4 file:py-2" />
                                <textarea id="script_text" placeholder="Instrucciones de texto alusivo..." className="w-full bg-zinc-900 border border-zinc-800 p-4 text-xs h-32 text-white outline-none focus:border-green-500"></textarea>
                                <p className="text-[9px] text-zinc-600 uppercase">{status === "UPLOADING" ? "Simbiosis en curso..." : "Seleccione archivo para iniciar"}</p>
                                <button onClick={() => setView("CANVAS")} className="w-full text-[9px] text-zinc-600 underline uppercase mt-4">Cancelar</button>
                            </div>
                        </div>
                    )}
                    {view === "SUCCESS" && (
                        <div className="absolute inset-0 bg-black z-50 p-10 flex flex-col justify-center text-center animate-in zoom-in">
                            <p className="text-green-500 text-5xl mb-6">✓</p>
                            <h2 className="text-xl font-black text-white uppercase mb-2">Aporte Recibido</h2>
                            <button onClick={() => setView("CANVAS")} className="text-[9px] text-zinc-600 underline uppercase">Finalizar</button>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
