/**
 * SOVEREIGN CONSTANTS: Final Production Schema
 * Mapea la lógica heredada a la infraestructura soberana.
 */
export const SCHEMA = {
  TABLES: {
    REGISTRY: 'sys_registry',
    ORGANIZATIONS: 'sys_registry', // Compatibilidad heredada
    EVENTS: 'sys_events',
    TELEMETRY: 'sys_events',       // Compatibilidad heredada
    VAULT: 'sys_payload_vault',
    CONFIG: 'sys_config',
    INTERACTIONS: 'sys_interactions',
    SECURITY: 'sys_security_rules',
    DATA: 'sys_payload_vault'      // Compatibilidad heredada
  },
  DATA_KEYS: {
    TREE: 'node_path',
    PAYLOAD: 'payload',
    VERSION: 'version'
  }
};
