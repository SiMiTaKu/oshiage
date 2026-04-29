import { defineConfig } from 'vitest/config'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { svelteTesting } from '@testing-library/svelte/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [svelte({ hot: false }), svelteTesting()],
  test: {
    environment: 'happy-dom',
    globals: true,
    include: ['tests/**/*.spec.{ts,js}'],
    setupFiles: ['tests/setup.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,svelte}'],
      exclude: ['src/shared/api/generated/**', 'src/app/**'],
      all: true,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [resolve(__dirname, '../design-system/src/lib/styles')],
      },
    },
  },
})
