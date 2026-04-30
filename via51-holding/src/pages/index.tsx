import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface ReaderStat { region: string; total_readers: number; }

export default function HoldingDashboard() {
  const [stats, setStats] = useState<ReaderStat[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await supabase.from('view_readers_summary').select('*');
      if (data) setStats(data as ReaderStat[]);
    };
    fetchStats();
  }, []);

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', minHeight: '100vh', padding: '60px' }}>
      <h1 style={{ color: '#D4AF37', letterSpacing: '0.5em', fontSize: '12px' }}>VIA51 HOLDING // SISTEMA SOBERANO</h1>
      <div style={{ marginTop: '40px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '900' }}>Impacto Territorial</h2>
        <div style={{ display: 'flex', gap: '40px', marginTop: '40px' }}>
          {stats.map((s, i) => (
            <div key={i}>
              <span style={{ fontSize: '40px', fontWeight: '900', display: 'block' }}>{s.total_readers}</span>
              <span style={{ fontSize: '10px', color: '#D4AF37' }}>{s.region}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}