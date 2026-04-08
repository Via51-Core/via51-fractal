export type SysRegistry = {
    id: string;
    node_name: string;
    node_path: string; // Ltree para jerarquía fractal
    level: number;     // 0, 1, 2, 3
    owner_id: string;
};

export type UserPermission = {
    id: string;
    email: string;
    access_role: 'SuperPropietario' | 'Supervisor' | 'Colaborador';
    hierarchy_level: number;
    is_immutable: boolean;
};