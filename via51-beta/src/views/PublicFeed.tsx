/**
 * ALFA LAYER: PublicFeed
 * Función: Visualización agnóstica de interacciones aprobadas.
 * Norma: Soberanía del Dato (Usa SCHEMA.TABLES.INTERACTIONS)
 */

import React, { useEffect, useState } from 'react';
import { supabase } from '@gamma/lib/supabaseClient';
import { SCHEMA } from '@gamma/lib/constants';

// Interfaz de Integridad (Evita error 'never')
interface InteractionMessage {
    id: string;
    content: string;
    sender_name: string;
    created_at: string;
}

const PublicFeed: React.FC = () => {
    const [messages, setMessages] = useState<InteractionMessage[]>([]);

    useEffect(() => {
        // Envoltura Síncrona para Lógica Asíncrona (Norma React)
        const fetchApproved = async () => {
            const { data, error } = await supabase
                .from(SCHEMA.TABLES.INTERACTIONS)
                .select('id, content, sender_name, created_at')
                .eq('status', 'approved')
                .order('created_at', { ascending: false });

            if (!error) setMessages(data || []);
        };

        fetchApproved();

        // Suscripción Real-time (Tráfico Beta)
        const channel = supabase
            .channel('public_feed')
            .on('postgres_changes',
                { event: 'UPDATE', schema: 'public', table: SCHEMA.TABLES.INTERACTIONS },
                fetchApproved
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    return (
        <div className="space-y-6">
            <div className="pb-4 border-b border-zinc-800">
                <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500">
                    LIVE_STREAM: AGNOSTIC_INTERACTIONS
                </h2>
            </div>

            {messages.length === 0 ? (
                <div className="py-20 text-center opacity-50">
                    <p className="text-zinc-500 text-xs italic font-mono">AWAITING_VOICES...</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <article key={msg.id} className="p-5 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all animate-in fade-in duration-700">
                            <div className="flex justify-between items-start mb-3">
                                <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-wider">{msg.sender_name}</span>
                                <span className="text-[9px] text-zinc-500 font-mono">
                                    {new Date(msg.created_at).toLocaleTimeString()}
                                </span>
                            </div>
                            <p className="text-sm text-zinc-400 leading-relaxed font-light">
                                {msg.content}
                            </p>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PublicFeed;


