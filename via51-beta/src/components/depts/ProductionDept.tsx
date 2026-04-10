import React from 'react';

const ProductionDept: React.FC<{ config: any }> = ({ config }) => (
  <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-700">
    <header className="flex justify-between items-center border-b border-zinc-800 pb-4">
      <h2 className="text-[10px] font-black tracking-[0.4em] text-amber-500 uppercase">Operational_Efficiency</h2>
      <span className="text-[9px] font-mono text-amber-600">THROUGHPUT_OPTIMIZED</span>
    </header>

    <div className="bg-zinc-900/80 p-6 rounded-sm border border-zinc-800/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-2 opacity-10">
        <div className="w-20 h-20 border-4 border-amber-500 rounded-full" />
      </div>

      <div className="relative z-10">
        <p className="text-[9px] text-zinc-500 uppercase tracking-widest mb-4 font-mono">Vault_Storage_Load</p>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black text-white">42.8</span>
          <span className="text-sm font-mono text-amber-500">TB</span>
        </div>
        <p className="text-[8px] text-zinc-600 mt-2 uppercase font-mono tracking-tighter">
          Encryption_Status: <span className="text-zinc-400">SHA-256_VERIFIED</span>
        </p>
      </div>
    </div>

    <div className="p-4 border border-zinc-800 grid grid-cols-3 gap-2 text-center">
      <div>
        <p className="text-[8px] text-zinc-600 uppercase font-mono">Nodes</p>
        <p className="text-sm font-bold text-zinc-300">27/27</p>
      </div>
      <div className="border-x border-zinc-800">
        <p className="text-[8px] text-zinc-600 uppercase font-mono">Uptime</p>
        <p className="text-sm font-bold text-zinc-300">99.9%</p>
      </div>
      <div>
        <p className="text-[8px] text-zinc-600 uppercase font-mono">Latency</p>
        <p className="text-sm font-bold text-zinc-300">14ms</p>
      </div>
    </div>
  </div>
);

export default ProductionDept;