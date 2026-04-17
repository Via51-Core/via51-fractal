import { CoreValidator } from "./validator.js";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.SUPABASE_URL || "", process.env.SUPABASE_SERVICE_ROLE_KEY || "");

export class Via51BlackBox {
    public static async handleSinapsis(pkg: any): Promise<any> {
        if (!CoreValidator.validate(pkg)) {
            return { status: "ERROR", msg: "ESTRUCTURA_INVALIDA" };
        }

        try {
            // 1. CONTRASTE EN REGISTRO MAESTRO
            const { data: actor, error: actorErr } = await supabase
                .from("sys_registry")
                .select("*")
                .eq("dni", pkg.payload.dni)
                .single();

            if (actorErr || !actor) {
                return { status: "DENIED", msg: "DNI_NO_ENCONTRADO" };
            }

            // 2. SELLADO SOBERANO
            const targetTable = (pkg.v51_dna.env === "LAB") ? "dev_sys_events" : "sys_events";
            const { data: event, error: eventErr } = await supabase
                .from(targetTable)
                .insert([{
                    actor_id: actor.id,
                    action_type: "SINAPSIS_VITALICIA",
                    payload: { dni: pkg.payload.dni, env: pkg.v51_dna.env, pulse: pkg.v51_dna.pulse }
                }])
                .select();

            if (eventErr) throw eventErr;

            return { 
                status: "SUCCESS", 
                tx_id: event[0].id, 
                user: { name: actor.full_name, role: actor.role, vitalicio: actor.is_vitalicio, auth: actor.auth_level } 
            };

        } catch (e: any) {
            return { status: "ERROR", msg: e.message };
        }
    }
}
