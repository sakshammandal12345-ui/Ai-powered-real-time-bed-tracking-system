import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,        // expose on 0.0.0.0 → accessible from any browser / device
    port: 5173,
    strictPort: false, // find next available port if 5173 is busy
  },
})
