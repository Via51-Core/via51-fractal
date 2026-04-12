// Actualización en C:\via51-fractal\via51-alfa\src\app\campaign.injector.ts

export class CampaignInjector {
    public static async init(): Promise<void> {
        // Pedir la última instrucción al corazón (BETA)
        const response = await fetch('http://hub.via51.org:3000/api/v1/instruction/latest');
        const data = await response.json();

        const container = document.getElementById('v51-app-root');
        if (container) {
            container.innerHTML = CampaignOverlay.render(data.title, data.message, data.priority);
        }
    }
}