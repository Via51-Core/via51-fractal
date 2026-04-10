# ESPECIFICACIONES TÉCNICAS - HOLDING VÍA51

## 1. VERSIONES HOMOGENIZADAS (CORE)
- **Runtime:** Node.js v20.x o superior
- **Package Manager:** npm v10.x
- **Bundler:** Vite v6.0.0+ (Engine: Rolldown/Oxc)
- **Language:** TypeScript v5.5+
- **Library:** React v18.3+
- **Database/Auth:** Supabase JS v2.43+
- **Styling:** Tailwind CSS v3.4+

## 2. ARQUITECTURA DE CONFIGURACIÓN
El sistema utiliza "Configuration Inheritance" (Herencia de Configuración):
- **Base:** `C:/via51-fractal/tsconfig.base.json` (Reglas globales)
- **Extensión:** `[nodo]/tsconfig.json` (Implementación local)

## 3. REGLAS DE DESARROLLO
- **Strict Mode:** Activado (No se permiten `any` implícitos).
- **Format:** Pure TypeScript (.ts, .tsx). Prohibido el uso de .js residuales.
- **Ports:** Alfa (5173), Beta (5174), Gamma (5175).