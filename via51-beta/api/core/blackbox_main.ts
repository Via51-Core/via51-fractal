import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL || "", process.env.SUPABASE_SERVICE_ROLE_KEY || "");

export class Via51BlackBox {
    public static async handleSinapsis(pkg: any, ip: string): Promise<any> {
        const { action, payload, v51_dna } = pkg;

        // ACCION: OBTENER CONFIGURACION DE LIENZO
        if (action === "GET_SMART_CANVAS") {
            return { status: "SUCCESS", config: { bg_img: "/ceo-lima.png", thoughts: ["Primero en calificaciones...", "Hay taita lindo..."], interval: 9000, styles: { desktop: { textScale: "4vw", padding: "pt-[45vh]", lineMargin: "mt-16" }, mobile: { textScale: "7vw", padding: "justify-end pb-24", lineMargin: "my-6" } } } };
        }

        // ACCION: CARGA MULTIMEDIA VINCULANTE
        if (action === "SUBMIT_CONTRIBUTION") {
            try {
                const { dni, type, file_name, file_base64, context } = payload;
                
                // A. Identificar Actor
                const { data: actor } = await supabase.from("sys_registry").select("id").eq("dni", dni).single();
                if (!actor) return { status: "DENIED", msg: "IDENTIDAD_NO_VALIDA" };

                // B. Subir al Bunker de Activos (Supabase Storage)
                const filePath = `${dni}/${Date.now()}_${file_name}`;
                const buffer = Buffer.from(file_base64, 'base64');
                
                const { data: storageData, error: storageErr } = await supabase.storage
                    .from('contributions')
                    .upload(filePath, buffer, { contentType: 'image/webp', upsert: true });

                if (storageErr) throw storageErr;

                // C. Sellar en Tabla de Aportes
                const { data: contrib } = await supabase.from("sys_contributions").insert([{
                    actor_id: actor.id,
                    type: type,
                    content_url: filePath,
                    context_script: context
                }]).select().single();

                return { status: "SUCCESS", tx_id: contrib.id };
            } catch (e: any) {
                return { status: "ERROR", msg: e.message };
            }
        }

        if (action === "CHECK_IDENTITY") {
            const { data: actor } = await supabase.from("sys_registry").select("*").eq("dni", payload.dni).single();
            if (!actor) return { status: "DENIED" };
            return { status: "SUCCESS", user: actor };
        }

        return { status: "ERROR" };
    }
}
