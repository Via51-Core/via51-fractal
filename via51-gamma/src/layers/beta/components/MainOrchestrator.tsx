import { useSystem } from '@beta/context/SystemContext';

// Definiciones de emergencia para silenciar al compilador (Stubs)
const OPERATIONAL_MODES = { CRITICAL: 'CRITICAL', NORMAL: 'NORMAL' };
const AlphaCoyunturaView = ({ eventId }: any) => <div className="p-4 bg-red-900/20 border border-red-500/50 text-red-500 text-[10px] font-mono">CRITICAL_EVENT_ID: {eventId}</div>;
const PoliticalModule = () => <div className="p-4 border border-zinc-800 text-zinc-500 text-[10px] font-mono">POLITICAL_MODULE_ACTIVE</div>;
const SocialModule = () => <div className="p-4 border border-zinc-800 text-zinc-500 text-[10px] font-mono">SOCIAL_MODULE_ACTIVE</div>;
const ProductiveModule = () => <div className="p-4 border border-zinc-800 text-zinc-500 text-[10px] font-mono">PRODUCTIVE_MODULE_ACTIVE</div>;
