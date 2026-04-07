import React from 'react';

const PoliticsDept: React.FC<{ config: any }> = ({ config }) => (
  <div className="space-y-6 animate-in fade-in duration-1000">
    <header className="flex justify-between items-center border-b border-zinc-800 pb-4">
      <h2 className="text-[10px] font-black tracking-[0.4em] text-blue-500 uppercase">Strategic_Governance</h2>
      <span className="text-[9px] px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full font-mono">ALPHA_VETO_ACTIVE</span>
    </header>

    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-sm">
        <p className="text-zinc-500 text-[9px] uppercase tracking-widest mb-1 font-mono">Consensus_Level</p>
        <p className="text-2xl font-black text-white">98.4%</p>
        <div className="w-full h-[1px] bg-zinc-800 mt-2">
          <div className="h-full bg-blue-500 w-[98%]" />
        </div>
      </div>
      <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-sm">
        <p className="text-zinc-500 text-[9px] uppercase tracking-widest mb-1 font-mono">Authority_Index</p>
        <p className="text-2xl font-black text-white italic">LEVEL_2</p>
        <p className="text-[8px] text-zinc-600 mt-1 uppercase">Sovereign_Control_Verified</p>
      </div>
    </div>
  </div>
);

export default PoliticsDept;