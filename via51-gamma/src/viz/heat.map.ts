/**
 * VIA51 ANTIGRAVITY - Heat Map Visualizer
 * Nivel: GAMMA (Visualización de Datos)
 */

import { GeoMetrics } from '../intel/reporting.engine';

export class HeatMapProcessor {
    private static heatMatrix: Map<string, number> = new Map();

    public static updateMatrix(data: GeoMetrics): void {
        const current = this.heatMatrix.get(data.region) || 0;
        const newIntensity = Math.min(current + 1, 100);
        this.heatMatrix.set(data.region, newIntensity);
        this.renderTerminalStatus(data.region, newIntensity);
    }

    private static renderTerminalStatus(region: string, intensity: number): void {
        const color = intensity > 80 ? 'CRITICAL-RED' : intensity > 40 ? 'ALERT-ORANGE' : 'STABLE-BLUE';
        console.log(`[HEAT-UPDATE] ${region}: ${intensity}% Intensity [${color}]`);
    }

    public static getFullHeatData(): { region: string, intensity: number }[] {
        return Array.from(this.heatMatrix.entries()).map(([region, intensity]) => ({
            region,
            intensity
        }));
    }
}