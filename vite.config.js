import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000
    },
    build: {
        outDir: 'dist'
    },
    base: process.env.NODE_ENV === 'production' ? process.env.BASENAME || '/' : '/'
})