import React from 'react';

const SocialDept: React.FC<{ config: any }> = ({ config }) => (
  <div className="space-y-6 animate-in slide-in-from-right-4 duration-700">
    <header className="flex justify-between items-center border-b border-zinc-800 pb-4">
      <h2 className="text-[10px] font-black tracking-[0.4em] text-emerald-500 uppercase">Social_Cohesion_Pulse</h2>
      <div className="flex gap-1">
        <div className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" />
        <span className="text-[9px] text-emerald-400 font-mono">LIVE_STREAM</span>
      </div>
    </header>

    <div className="space-y-4">
      <div className="p-4 bg-zinc-900/30 border-l-2 border-emerald-500">
        <p className="text-zinc-400 text-xs leading-relaxed italic">
          "La soberanía no se delega, se ejerce a través del dato transparente."
        </p>
        <p className="text-[8px] text-zinc-600 mt-2 font-mono uppercase tracking-widest">— Citizen_Emitter_051</p>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <p className="text-[9px] text-zinc-500 uppercase mb-1 font-mono">Sentiment_Flux</p>
          <div className="flex gap-1 items-end h-8">
            {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
              <div key={i} className="w-2 bg-emerald-500/30" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-black text-white tracking-tighter">8.4k</p>
          <p className="text-[8px] text-zinc-500 uppercase font-mono">Active_Voices</p>
        </div>
      </div>
    </div>
  </div>
);

export default SocialDept;