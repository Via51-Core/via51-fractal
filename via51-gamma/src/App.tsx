import V51_Visor_Animado from '@ui/V51_Visor_Animado'; // Importación por defecto corregida
import { CORE_REGISTRY } from '@gamma/registry';

function App() {
  // Protección contra datos nulos (Soberanía del Dato)
  const electoral = CORE_REGISTRY?.electoral;

  if (!electoral) {
    return <div className="bg-black text-red-500 p-10">ERROR: GAMMA_REGISTRY_NOT_FOUND</div>;
  }

  return (
    // Viewport Inmutable 9:16
    <div className="fixed inset-0 bg-zinc-950 flex items-center justify-center overflow-hidden">
      <main className="relative w-full max-w-[430px] aspect-[9/16] bg-black shadow-2xl border border-zinc-800">
        <V51_Visor_Animado
          slides={electoral.slides || []}
          frasePrincipal={electoral.frasePrincipal || "Cargando..."}
          fraseSecundaria={electoral.fraseSecundaria || ""}
          posicion={electoral.posicion || "center"}
        />
      </main>
    </div>
  );
}

export default App;

