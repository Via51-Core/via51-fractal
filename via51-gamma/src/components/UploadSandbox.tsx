import React, { useState } from 'react';

export const UploadSandbox = () => {
    const [status, setStatus] = useState('IDLE');

    const handleUpload = async (e: any) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const userData = Object.fromEntries(formData);

        setStatus('UPLOADING');

        // Simulación de captura de archivo
        const material = { type: 'document', name: 'propuesta.pdf', size: '2MB' };

        const res = await fetch('http://localhost:3000/api/v1/contributions/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userData, material })
        });

        if (res.ok) {
            setStatus('SUCCESS');
            alert("Registro exitoso. Su material está en evaluación.");
        }
    };

    return (
        <div className="bg-zinc-900 p-6 border border-zinc-800">
            <h2 className="text-green-500 font-bold mb-4">SANDBOX: INSCRIPCIÓN Y APORTES</h2>
            <form onSubmit={handleUpload} className="space-y-3">
                <input name="name" placeholder="Nombres" required className="w-full bg-black p-2 text-xs border border-zinc-700" />
                <input name="surname" placeholder="Apellidos" required className="w-full bg-black p-2 text-xs border border-zinc-700" />
                <input name="dni" placeholder="DNI" required className="w-full bg-black p-2 text-xs border border-zinc-700" />
                <input name="email" type="email" placeholder="Email" required className="w-full bg-black p-2 text-xs border border-zinc-700" />
                <input name="phone" placeholder="Celular" required className="w-full bg-black p-2 text-xs border border-zinc-700" />

                <div className="border-2 border-dashed border-zinc-700 p-4 text-center text-[10px] text-zinc-500">
                    Arrastre aquí su material (Texto, Audio, Video)
                    <input type="file" className="hidden" id="file_up" />
                </div>

                <button className="w-full bg-green-600 text-black font-bold p-3 text-xs uppercase">
                    {status === 'UPLOADING' ? 'Procesando...' : 'Registrar y Subir Aporte'}
                </button>
            </form>
        </div>
    );
};