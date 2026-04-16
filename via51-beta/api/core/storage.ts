/**
 * V51_DNA: { node: "CORE-BETA", type: "MECHANIC", seq: "M-04" }
 * MECANICA 04: GESTOR DE ALMACENAMIENTO LOCAL
 */

import fs from "fs";
import path from "path";

export class CoreStorage {
    private static DB_PATH = path.resolve("src/database/sys_nodes.json");

    /**
     * Lee la jerarquia fractal desde el disco duro.
     * Prioriza recursos locales segun Carta Magna.
     */
    public static getHierarchy(): any {
        try {
            const data = fs.readFileSync(this.DB_PATH, "utf8");
            return JSON.parse(data);
        } catch (error) {
            console.error("[STORAGE] CRITICAL ERROR: No se puede leer sys_nodes.");
            return null;
        }
    }

    /**
     * Verifica si un nodo existe y esta activo.
     */
    public static isNodeAuthorized(nodeId: string): boolean {
        const db = this.getHierarchy();
        if (!db) return false;

        // Logica de busqueda recursiva simple para validacion
        const flatNodes = this.flattenHierarchy(db.hierarchy.root);
        const target = flatNodes.find((n: any) => n.id === nodeId);

        return target ? target.status === "ACTIVE" : false;
    }

    private static flattenHierarchy(node: any): any[] {
        let nodes = [node];
        if (node.children) {
            node.children.forEach((child: any) => {
                nodes = nodes.concat(this.flattenHierarchy(child));
            });
        }
        return nodes;
    }
}
