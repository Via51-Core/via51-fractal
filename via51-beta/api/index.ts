import 'dotenv/config';
import express from 'express';
import cors from 'cors';
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>VIA51 | CONTROL QUIRÚRGICO</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
        <style>
            body { background: #050505; color: white; font-family: sans-serif; overflow: hidden; }
            .mirror { background: #000; border: 1px solid rgba(212, 175, 55, 0.2); width: 100%; height: 100%; border-radius: 8px; }
            label { font-size: 7px; color: #888; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 2px; }
            input[type="range"] { width: 100%; accent-color: #D4AF37; }
        </style>
    </head>
    <body class="h-screen flex flex-col p-4">
        <div class="flex flex-1 gap-4 overflow-hidden">
            <div class="flex-[0.6] flex flex-col gap-4">
                <div class="flex-1"><iframe src="http://localhost:5173" class="mirror" id="f1"></iframe></div>
                
                <!-- PANEL DE CONTROL AVANZADO -->
                <div class="h-64 bg-white/5 p-4 grid grid-cols-3 gap-4 border border-white/10 overflow-y-auto">
                    <div>
                        <label>Fondo Opacidad</label>
                        <input type="range" id="bgOp" min="0" max="1" step="0.1" onchange="up()">
                        <label class="mt-2">Color Maestro</label>
                        <input type="color" id="cp" class="w-full h-6 bg-transparent" onchange="up()">
                        <label class="mt-2">Alternar Imagen URL</label>
                        <input type="text" id="bgImg" class="w-full bg-black border border-white/10 text-[9px] p-1" onchange="up()">
                    </div>
                    <div>
                        <label>Tamaño Texto (px)</label>
                        <input type="range" id="ts" min="12" max="120" onchange="up()">
                        <label class="mt-2">Ancho de Marco (px)</label>
                        <input type="range" id="mw" min="200" max="1200" onchange="up()">
                        <label class="mt-2">Posición Y (offset)</label>
                        <input type="range" id="ty" min="-200" max="200" onchange="up()">
                    </div>
                    <div>
                        <label>Alineación</label>
                        <select id="ta" class="w-full bg-black border border-white/10 text-[9px] p-1" onchange="up()">
                            <option value="left">Izquierda</option>
                            <option value="center">Centro</option>
                            <option value="right">Derecha</option>
                        </select>
                        <label class="mt-2">Grosor (Weight)</label>
                        <select id="fw" class="w-full bg-black border border-white/10 text-[9px] p-1" onchange="up()">
                            <option value="100">Thin</option>
                            <option value="400">Normal</option>
                            <option value="900">Black</option>
                        </select>
                        <button onclick="up()" class="w-full mt-4 py-2 bg-[#D4AF37] text-black text-[9px] font-bold">EJECUTAR</button>
                    </div>
                </div>
            </div>
            <div class="flex-[0.4] bg-black p-4 flex flex-col items-center">
                <div class="w-[280px] flex-1 border-[8px] border-gray-900 rounded-[40px] overflow-hidden">
                    <iframe src="http://localhost:5173" class="mirror" id="f2"></iframe>
                </div>
            </div>
        </div>

        <script>
            const v51 = supabase.createClient('${process.env.SUPABASE_URL}', '${process.env.VITE_SUPABASE_ANON_KEY}');
            async function up() {
                const config = {
                    primaryColor: document.getElementById('cp').value,
                    textSize: document.getElementById('ts').value,
                    bgImage: document.getElementById('bgImg').value || "https://ibhhzgtxaqwdykedhtvk.supabase.co/storage/v1/object/public/via51-assets/background-v51.jpg",
                    bgOpacity: parseFloat(document.getElementById('bgOp').value),
                    textMaxWidth: document.getElementById('mw').value,
                    textYPosition: document.getElementById('ty').value,
                    textAlign: document.getElementById('ta').value,
                    fontWeight: document.getElementById('fw').value,
                    lineHeight: "1"
                };
                await v51.from('sys_registry').update({ value: config }).eq('id', 'ui_config_alfa');
                document.getElementById('f1').src = document.getElementById('f1').src;
                document.getElementById('f2').src = document.getElementById('f2').src;
            }
        </script>
    </body>
    </html>
  `);
});
app.listen(3001, () => { console.log('BETA QUIRÚRGICO ON 3001'); });