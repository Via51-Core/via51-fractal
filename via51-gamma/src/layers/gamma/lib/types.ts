// src/layers/gamma/lib/types.ts
export interface TenantConfig {
    id: string;
    slug: string;
    nombre_comercial: string;
    color_tema: string;
    payload: any;
    node_path?: string;
}

export interface NodeData {
    id: string;
    titulo_que: string;
    descripcion_como: string;
    url_media: string;
    tipo_media: 'video' | 'imagen';
}
