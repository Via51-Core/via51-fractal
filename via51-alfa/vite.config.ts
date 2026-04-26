import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    cors: true,
    headers: {
      "Content-Security-Policy": "frame-ancestors *",
      "X-Frame-Options": "ALLOWALL"
    }
  }
})