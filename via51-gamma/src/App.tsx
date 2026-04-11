import React from 'react';
import CommandCenter from './components/CommandCenter';

export default function App() {
    return (
        <main className="min-h-screen bg-black">
            {/* Activación del Monitor de 43 Elementos */}
            <CommandCenter />
        </main>
    );
}