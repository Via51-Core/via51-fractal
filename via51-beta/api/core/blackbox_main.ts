import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL || "", process.env.SUPABASE_SERVICE_ROLE_KEY || "");

export class Via51BlackBox {
    public static async handleSinapsis(pkg: any, ip: string): Promise<any> {
        const { action, payload, v51_dna } = pkg;

        if (action === "GET_SMART_CANVAS") {
            return { status: "SUCCESS", config: { bg_img: "/ceo-lima.png", thoughts: ["Primero en calificaciones...", "Hay taita lindo..."], interval: 8000 } };
        }

        if (action === "SIGN_PROTOCOL") {
            const { dni, whatsapp } = payload;
            
            let { data: actor } = await supabase.from("sys_registry").select("*").eq("dni", dni).single();

            if (!actor) {
                const { data: newActor } = await supabase.from("sys_registry").insert([{
                    dni: dni,
                    full_name: "Ciudadano por Validar",
                    role: "CITIZEN",
                    hierarchy_level: 1,
                    auth_status: "POR_VERIFICAR"
                }]).select().single();
                actor = newActor;
            }

            await supabase.from((v51_dna.env === "LAB" ? "dev_sys_events" : "sys_events")).insert([{
                actor_id: actor.id,
                action_type: "ACEPTACION_PROTOCOL_VINCULANTE",
                payload: { dni, whatsapp, ip, timestamp: new Date().toISOString() }
            }]);

            return { status: "SUCCESS", user: actor };
        }
        return { status: "ERROR" };
    }
}
