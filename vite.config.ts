import path from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
    host: 'localhost',
  },
})
