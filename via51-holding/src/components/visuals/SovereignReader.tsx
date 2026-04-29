import { motion } from 'framer-motion';
export const SovereignReader = ({ title, content, concept }) => (
  <div className="max-w-4xl mx-auto p-12 bg-white/[0.01] border-l border-v51-gold/20">
    <span className="text-v51-gold font-mono text-[10px] tracking-[0.5em] uppercase">{concept}</span>
    <h2 className="text-4xl font-black text-white mt-4 mb-8 uppercase tracking-tighter">{title}</h2>
    <div className="text-gray-400 text-lg font-light leading-relaxed whitespace-pre-wrap">{content}</div>
  </div>
);