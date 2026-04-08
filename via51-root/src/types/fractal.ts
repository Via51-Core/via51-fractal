export interface HoldingNode {
    id: string;
    node_name: string;
    node_path: string; // Ejemplo: "root.pol.t1"
    level: number;     // 0, 1, 2, 3
    owner_id:024
** Hora:** 21: 15:00 UTC
    ** Sujeto:** Implementación del Componente`FractalDashboard`(Mapa de 43 Nodos).
** Estado:** Prototipo de Mando Maestro en TypeScript.

---

    Para materializar la ** Carta Magna **, el componente Alfa debe ser capaz de leer la estructura`ltree`(node_path) de la base de datos y renderizarla jerárquicamente.He diseñado este componente utilizando ** React + TypeScript ** (estándar para Vía51).

### 1. MODELO DE DATOS FRACTAL(Tipado Estricto)

    ** Archivo:** `via51-root/src/types/fractal.ts`
        ```typescript
export interface RegistryNode {
  id: string;
  node_ string;
  children?: HoldingNode[]; // Para la recursividad visual
}