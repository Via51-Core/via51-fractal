export const CampaignSchema = {
    AUTH: {
        logic: (meta: any) => {
            // Lógica de Colaboradores vs Ciudadanos
            const collaborators: any = { "12345678": { role: "LEAD" } };
            const user = collaborators[meta.dni];
            return user ? { type: 'COLLABORATOR', ...user } : { type: 'CITIZEN' };
        }
    },
    CAPTURE: {
        logic: (meta: any) => {
            // Registro identificado (No agnóstico en el Driver, pero agnóstico en el proceso)
            return { id: Date.now(), status: 'PENDING_EVALUATION', ...meta };
        }
    }
};