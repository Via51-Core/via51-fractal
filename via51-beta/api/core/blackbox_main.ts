import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL || "", process.env.SUPABASE_SERVICE_ROLE_KEY || "");

export class Via51BlackBox {
    public static async handleSinapsis(pkg: any): Promise<any> {
        const { action, payload, v51_dna } = pkg;

        // ACCION: OBTENER GUION DE PORTADA
        if (action === "GET_SMART_CANVAS") {
            return {
                status: "SUCCESS",
                config: {
                    bg_img: "/ceo-lima.png",
                    thoughts: [
                        "Primero en calificaciones y al fondo de la cedula para moverles el piso a los corruptos.",
                        "Hay taita lindo, hasta que al fin te revelaste como morado, taitita es peruano."
                    ],
                    interval: 9000
                }
            };
        }

        // ACCION: VALIDAR DNI Y REGISTRAR
        if (action === "CHECK_IDENTITY") {
            const { data: actor } = await supabase.from("sys_registry").select("*").eq("dni", payload.dni).single();
            if (!actor) return { status: "DENIED", msg: "NO_REGISTRADO" };

            const targetTable = (v51_dna.env === "LAB") ? "dev_sys_events" : "sys_events";
            const { data: event } = await supabase.from(targetTable).insert([{
                actor_id: actor.id,
                action_type: "SINAPSIS_LIENZO",
                payload: { dni: payload.dni }
            }]).select();

            return { status: "SUCCESS", user: actor.full_name, tx_id: event?.[0].id };
        }

        return { status: "ERROR", msg: "ACCION_NO_RECONOCIDA" };
    }
}
