import React, { useState, useRef, useCallback } from 'react';
import { SCHEMA } from '@gamma/lib/constants';
import PantallaAlfa from './PantallaAlfa';
import PantallaCenit from './PantallaCenit';

const TranscendenceEngine: React.FC = () => {
  const [stage, setStage] = useState<{ id: 'ALFA' | 'CENIT'; data: any }>({
    id: 'ALFA',
    data: null
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleActivation = useCallback((payload: any) => {
    // 1. Audio Sequence Initialization
    if (audioRef.current) audioRef.current.pause();

    const audioUrl = payload?.meta?.audio || '/assets/audio/core_pulse.mp3';
    audioRef.current = new Audio(audioUrl);

    // Tactic Offset for cinematic impact
    if (payload?.type === 'HIGH_PRIORITY') audioRef.current.currentTime = 7.5;

    audioRef.current.play().catch(() => console.warn("[V51] Interaction Required for Audio"));

    // 2. Stage Mutation
    setStage({ id: 'CENIT', data: payload });
  }, []);

  const resetSequence = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setStage({ id: 'ALFA', data: null });
  }, []);

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative selection:bg-blue-500/30">
      {/* Cinematic Transition Layer */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(0,71,255,0.05)_0%,transparent_100%)] pointer-events-none" />

      {stage.id === 'ALFA' ? (
        <div className="animate-in fade-in zoom-in-95 duration-1000">
          <PantallaAlfa
            data={stage.data}
            onSeleccionar={(t) => handleActivation({ type: t, label: 'SYSTEM_COMMAND' })}
          />
        </div>
      ) : (
        <div className="animate-in slide-in-from-bottom-10 duration-700">
          <PantallaCenit
            config={stage.data}
            onRetornar={resetSequence}
          />
        </div>
      )}
    </div>
  );
};

export default TranscendenceEngine;