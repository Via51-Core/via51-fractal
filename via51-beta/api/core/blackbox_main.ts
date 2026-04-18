import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL || "", process.env.SUPABASE_SERVICE_ROLE_KEY || "");

export class Via51BlackBox {
    public static async handleSinapsis(pkg: any): Promise<any> {
        const { action, payload, v51_dna } = pkg;

        if (action === "GET_SMART_CANVAS") {
            return { status: "SUCCESS", config: { bg_img: "/ceo-lima.png", thoughts: ["Primero en calificaciones...", "Hay taita lindo..."], interval: 8000 } };
        }

        if (action === "CHECK_IDENTITY") {
            const { data: actor } = await supabase.from("sys_registry").select("*").eq("dni", payload.dni).single();
            if (!actor) return { status: "DENIED", msg: "NO_REGISTRADO" };
            return { status: "SUCCESS", user: actor };
        }

        if (action === "SUBMIT_CONTRIBUTION") {
            const { data: actor } = await supabase.from("sys_registry").select("id").eq("dni", payload.dni).single();
            if (!actor) return { status: "DENIED" };

            const { data, error } = await supabase.from("sys_contributions").insert([{
                actor_id: actor.id,
                type: payload.type,
                context_script: payload.context
            }]).select();

            if (error) return { status: "ERROR", msg: error.message };
            return { status: "SUCCESS", tx_id: data[0].id };
        }

        return { status: "ERROR", msg: "ACCION_INVALIDA" };
    }
}
