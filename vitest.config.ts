import { defineConfig, ViteUserConfig } from 'vitest/config'

export default defineConfig({
    test: {
        coverage: {
            reporter: ['text', 'html'],
        },
        threads: false,
    },
    assetsInclude: ['**/*.txt'],
} as ViteUserConfig)
