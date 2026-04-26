import { DismantlingGraph } from '@/components/DismantlingGraph'
import { AbsorptionTheory } from '@/components/AbsorptionTheory'
import { RegionalAnalysis } from '@/components/RegionalAnalysis'
import { IntelligenceSearch } from '@/components/IntelligenceSearch'
import { motion } from 'framer-motion'

export default function HoldingDashboard() {
  return (
    <div className="min-h-screen bg-[#020202] text-white p-8 font-sans">
      <header className="flex justify-between items-center mb-12 border-b border-v51-gold/10 pb-6">
        <div>
          <h1 className="text-v51-gold font-mono text-[10px] tracking-[0.6em] uppercase">Holding Sincronizado // Fase 1.5</h1>
          <p className="text-3xl font-black tracking-tighter">REVELACIÓN DE SOBERANÍA</p>
        </div>
        <div className="text-right font-mono text-[9px] text-gray-500 uppercase">
          Dominio: holding.via51.org <br />
          Explorador de Datos: Activo
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* LÍNEA 1: ABSORCIÓN ATÓMICA */}
        <section className="lg:col-span-2">
          <AbsorptionTheory />
        </section>

        {/* LÍNEA 2: PROGRESO Y BÚSQUEDA */}
        <section className="space-y-8">
          <DismantlingGraph />
          <IntelligenceSearch />
        </section>

        {/* LÍNEA 3: ANÁLISIS TERRITORIAL */}
        <section>
          <RegionalAnalysis />
        </section>
      </main>

      <footer className="mt-20 border-t border-white/5 pt-8 text-[8px] font-mono text-center text-gray-700 tracking-[0.5em] uppercase">
        Antigravity Protocol // Arquitecto Renzo_8 // 2026
      </footer>
    </div>
  )
}