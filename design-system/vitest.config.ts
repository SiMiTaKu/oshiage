import { defineConfig } from 'vitest/config'
import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { svelteTesting } from '@testing-library/svelte/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [svelte({ hot: false, preprocess: vitePreprocess() }), svelteTesting()],
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['tests/**/*.spec.{ts,js}'],
    setupFiles: ['tests/setup.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/lib/**/*.{ts,svelte}'],
      exclude: ['src/lib/icons/**'],
      all: true,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [resolve(__dirname, 'src/styles')],
      },
    },
  },
})
