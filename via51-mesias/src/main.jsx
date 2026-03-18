import React, { useState } from 'react';

function App() {
  // Corregido: Eliminado el 'require' que causaba el error de pantalla blanca
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // AQUÍ IRÁ TU LÓGICA DE SUPABASE PRÓXIMAMENTE
    setEnviado(true);
  };

  return (
    <div style={{ background: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '100%' }}>
      <h1 style={{ color: '#7D2181', textAlign: 'center', marginBottom: '10px' }}>Vía 51</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '25px' }}>Eje Político, Social y Productivo</p>
      
      <form onSubmit={handleSubmit}>
        {/* Aquí puedes añadir tus inputs de nombre, dni, etc. */}
        <button 
          type="submit" 
          style={{ 
            width: '100%', 
            padding: '15px', 
            background: '#7D2181', 
            color: 'white', 
            border: 'none', 
            borderRadius: '12px', 
            cursor: 'pointer', 
            fontSize: '1.1em',
            fontWeight: 'bold'
          }}
        >
          Unirse al Camino
        </button>
      </form>

      {/* VENTANA FLOTANTE (MODAL) TRILINGÜE Y RESPONSIVE */}
      {enviado && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          background: 'rgba(0,0,0,0.85)', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          zIndex: 9999, 
          padding: '20px' 
        }}>
          <div style={{ 
            background: 'white', 
            padding: '35px', 
            borderRadius: '20px', 
            maxWidth: '400px', 
            width: '100%',
            textAlign: 'center', 
            borderTop: '10px solid #7D2181',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <h2 style={{ fontSize: '1.6em', color: '#333', marginBottom: '10px' }}>
              ¡Yachaywasiman Hamuy!<br/>
              <span style={{color: '#7D2181'}}>Bienvenido</span>
            </h2>
            
            <div style={{ margin: '25px 0', fontSize: '1em', color: '#444', textAlign: 'left', lineHeight: '1.6', borderLeft: '3px solid #eee', paddingLeft: '15px' }}>
              <p><strong>QU:</strong> Añaychayki Vía 51-man yaykumusqaykimanta.</p>
              <p><strong>ES:</strong> Gracias por sumarte. Construimos el Perú con integridad.</p>
              <p><strong>EN:</strong> Together we build the future.</p>
            </div>

            <a href="https://chat.whatsapp.com/FsuP06moPhJJSgdmt5Vxk7" 
               target="_blank" 
               rel="noopener noreferrer"
               style={{ 
                 display: 'block', 
                 background: '#25D366', 
                 color: 'white', 
                 padding: '18px', 
                 borderRadius: '12px', 
                 textDecoration: 'none', 
                 fontWeight: 'bold', 
                 fontSize: '1.2em',
                 boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)'
               }}>
              Unirse al WhatsApp Oficial
            </a>
            
            <button 
              onClick={() => setEnviado(false)}
              style={{ marginTop: '20px', background: 'none', border: 'none', color: '#888', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;