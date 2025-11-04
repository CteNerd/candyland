import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/candyland/', // GitHub Pages base path
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@engine': path.resolve(__dirname, './engine')
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  },
  publicDir: 'public'
})
