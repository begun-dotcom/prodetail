import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
/* export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ]
  
}) */

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0', // или '0.0.0.0' — доступ с телефона
    proxy: {
      '/api': {
        target: 'http://localhost:8000', // ваш бэкенд
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
