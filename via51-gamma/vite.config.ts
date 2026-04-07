import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@alfa': path.resolve(__dirname, './src/layers/alfa'),
      '@beta': path.resolve(__dirname, './src/layers/beta'),
      '@gamma': path.resolve(__dirname, './src/layers/gamma'),
      '@ui': path.resolve(__dirname, './src/layers/ui'),
      '@kernel': path.resolve(__dirname, './src/layers/gamma/kernel'),
      '@middleware': path.resolve(__dirname, './src/layers/gamma/middleware'),
    },
  },
})

