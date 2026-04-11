import { supabase } from '../lib/supabaseClient';

export const useTelemetry = () => {
    const trackVisit = async (nodeId: string) => {
        try {
            const geoRes = await fetch('https://freeipapi.com/api/json');
            if (!geoRes.ok) throw new Error("Servidor de geolocalización no disponible");
            const geoData = await geoRes.json();

            const { error } = await supabase.from('sys_interactions').insert({
                node_id: nodeId,
                ip_address: geoData.ipAddress,
                region: geoData.regionName,
                city: geoData.cityName,
                country: geoData.countryName,
                content: `Tráfico detectado: ${geoData.cityName}, ${geoData.regionName}`,
                status: 'logged'
            });

            if (error) throw error;
            console.log(`[TELEMETRÍA] ÉXITO: Acceso desde ${geoData.regionName}`);
        } catch (err: any) {
            console.error(`[TELEMETRÍA-ERROR] ${err.message}`);
        }
    };

    return { trackVisit };
};