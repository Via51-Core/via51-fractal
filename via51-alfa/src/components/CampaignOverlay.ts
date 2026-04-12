/**
 * VIA51 ANTIGRAVITY - Purple Frame Overlay
 * Nivel: ALFA (Comunicación de Fase 1)
 */

export class CampaignOverlay {
    public static render(title: string, message: string, priority: string): string {
        const borderColor = priority === 'CRITICAL' ? '#ff0000' : '#bc00ff';
        const pulseClass = priority === 'CRITICAL' ? 'v51-pulse' : '';

        return `
        <style>
            .v51-campaign-frame {
                border: 4px solid ${borderColor};
                background: rgba(43, 0, 64, 0.95);
                color: white;
                padding: 25px;
                border-radius: 10px;
                font-family: 'Segoe UI', Roboto, sans-serif;
                margin: 20px auto;
                max-width: 800px;
                box-shadow: 0 0 20px rgba(188, 0, 255, 0.3);
            }
            .v51-badge {
                background: #bc00ff;
                color: white;
                padding: 4px 10px;
                font-size: 0.8em;
                font-weight: bold;
                text-transform: uppercase;
            }
            .v51-pulse {
                animation: v51-blink 2s infinite;
            }
            @keyframes v51-blink {
                0% { box-shadow: 0 0 10px #ff0000; }
                50% { box-shadow: 0 0 30px #ff0000; }
                100% { box-shadow: 0 0 10px #ff0000; }
            }
        </style>
        <div class="v51-campaign-frame ${pulseClass}">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <span class="v51-badge">Vía51 Antigravity - Mensaje Oficial</span>
                <img src="https://via51.org/assets/logo-morado.png" alt="Partido Morado" style="height: 30px;">
            </div>
            <h1 style="color: #bc00ff; margin: 0 0 10px 0;">${title}</h1>
            <p style="font-size: 1.1em; line-height: 1.6; color: #f0f0f0;">
                ${message}
            </p>
            <hr style="border: 0; border-top: 1px solid rgba(255,255,255,0.1); margin: 20px 0;">
            <div style="font-size: 0.85em; color: #aaa; text-align: center;">
                Apoyando la visión de <strong>Mesías Guevara</strong> para el Perú.
            </div>
        </div>
        `;
    }
}