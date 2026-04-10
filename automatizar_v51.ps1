$nodos = @(
    @{ name="via51-alfa"; port=5173 },
    @{ name="via51-beta"; port=5174 },
    @{ name="via51-gamma"; port=5175 }
)

$tsconfigBase = @'
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  }
}
'@

Set-Content -Path "tsconfig.base.json" -Value $tsconfigBase

foreach ($nodo in $nodos) {
    $path = $nodo.name
    
    if (Test-Path $path) {
        $tsconfigNode = @"
{
  "extends": "../tsconfig.base.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
"@
        Set-Content -Path "$path\tsconfig.json" -Value $tsconfigNode

        $viteConfig = @"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: $($nodo.port),
    strictPort: true,
    host: true
  },
  build: {
    target: 'esnext'
  }
})
"@
        Set-Content -Path "$path\vite.config.ts" -Value $viteConfig

        Write-Host "Nodo $($nodo.name) estandarizado en puerto $($nodo.port)" -ForegroundColor Green
    }
}