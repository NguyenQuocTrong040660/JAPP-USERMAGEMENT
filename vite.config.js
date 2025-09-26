import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Tương đương PUBLIC_URL
  build: {
    sourcemap: false, // Tương đương GENERATE_SOURCEMAP=false
    outDir: 'dist',
  },
  server: {
    port: 4001,
    open: true
  },
  optimizeDeps: {
    exclude: ['react-notifications']
  },
  define: {
    global: 'globalThis',
  }
})