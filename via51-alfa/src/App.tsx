import React, { useState, useEffect } from "react";

export default function App() {
    const [thoughtIdx, setIdx] = useState(0);
    const [data, setData] = useState({ 
        img: "/ceo-lima.png", 
        thoughts: [
            "Primero en calificaciones y al fondo de la cédula para moverles el piso a los corruptos.",
            "¡Hay taita lindo! Taitita es peruano."
        ] 
    });

    const API_URL = "https://hub.via51.org"; 

    useEffect(() => {
        const sync = async () => {
            try {
                const res = await fetch(`${API_URL}/api/v1/gatekeeper`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ dna: { id: "NODE-ALFA-0", seq: "A-LIVE" }, action: "GET_PORTADA" })
                });
                const remote = await res.json();
                if (remote && remote.thoughts) setData(remote);
            } catch (e) { console.warn("Modo Bunker Activo."); }
        };
        sync();
        const timer = setInterval(() => setIdx(i => (i + 1) % 2), 9000);
        return () => clearInterval(timer);
    }, []);

    const MainUI = ({ isMob }: { isMob: boolean }) => (
        <div className="h-full w-full relative flex flex-col items-center justify-end overflow-hidden bg-black font-sans">
            <div className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                style={{ backgroundImage: `url("${data.img}")`, opacity: isMob ? 0.85 : 0.6 }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            <div className={`relative z-10 text-center w-full px-12 ${isMob ? "pb-24" : "pb-40"}`}>
                <div className="min-h-[160px] flex items-center justify-center">
                    <p className={`text-white font-black italic uppercase leading-tight ${isMob ? "text-2xl tracking-tighter" : "text-6xl tracking-tight"}`}>
                        {data.thoughts[thoughtIdx]}
                    </p>
                </div>
                <div className="h-1.5 w-20 bg-purple-600 mx-auto my-6 shadow-[0_0_20px_rgba(168,85,247,0.9)]"></div>
                <p className="text-green-500 font-bold tracking-[0.5em] text-[10px] md:text-xs uppercase">
                    VÍA51 Antigravity // hub.via51.org
                </p>
            </div>
        </div>
    );

    return (
        <main className="min-h-screen bg-black flex flex-row overflow-hidden">
            <div className="hidden lg:flex flex-1 border-r border-white/5"><MainUI isMob={false} /></div>
            <div className="flex-1 lg:max-w-[480px] h-screen bg-zinc-900 flex items-center justify-center p-4">
                <div className="w-full h-full max-h-[880px] bg-black border-[12px] border-zinc-800 rounded-[3.5rem] overflow-hidden relative shadow-2xl">
                    <MainUI isMob={true} />
                </div>
            </div>
        </main>
    );
}
