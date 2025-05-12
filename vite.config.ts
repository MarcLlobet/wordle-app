import { defineConfig, ViteUserConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: '/millor-primera-paraula-wordle/',
} as ViteUserConfig)
