import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Vite 8/Rolldown specific optimization
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor-react';
            if (id.includes('framer-motion')) return 'vendor-ui-motion';
            if (id.includes('lucide-react')) return 'vendor-ui-icons';
            return 'vendor-others';
          }
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
})
