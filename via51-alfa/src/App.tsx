import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { motion } from 'framer-motion'

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

function App() {
  const [ui, setUi] = useState({ 
    primaryColor: '#D4AF37', textSize: '48', bgImage: '', bgOpacity: 0.5,
    textMaxWidth: '800', textYPosition: '0', textAlign: 'center', fontWeight: '900' 
  })
  const [gov, setGov] = useState({ text: '' })

  useEffect(() => {
    const fetchAll = async () => {
      const { data: uiData } = await supabase.from('sys_registry').select('value').eq('id', 'ui_config_alfa').single()
      const { data: govData } = await supabase.from('sys_registry').select('value').eq('id', 'carta_magna_2_0').single()
      if (uiData) setUi(uiData.value)
      if (govData) setGov(govData.value)
    }
    fetchAll()
    supabase.channel('realtime').on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'sys_registry' }, 
      p => {
        if(p.new.id === 'ui_config_alfa') setUi(p.new.value)
        if(p.new.id === 'carta_magna_2_0') setGov(p.new.value)
      }).subscribe()
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden">
      {ui.bgImage && (
        <img src={ui.bgImage} className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700" 
             style={{ opacity: ui.bgOpacity }} />
      )}
      
      <div className="relative z-10 w-full flex flex-col items-center" 
           style={{ transform: `translateY(${ui.textYPosition}px)` }}>
        <div style={{ 
            maxWidth: `${ui.textMaxWidth}px`, 
            textAlign: ui.textAlign as any,
            color: ui.primaryColor,
            fontSize: `${ui.textSize}px`,
            fontWeight: ui.fontWeight,
            lineHeight: '1',
            padding: '20px'
          }} 
          className="uppercase tracking-tighter transition-all duration-500">
          {gov.text}
        </div>
      </div>
    </div>
  )
}
export default App