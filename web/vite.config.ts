import { sveltekit } from '@sveltejs/kit/vite'
import { resolve } from 'path'
import { defineConfig } from 'vite'
import { imagetools } from 'vite-imagetools'

export default defineConfig({
  plugins: [sveltekit(), imagetools()],
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [resolve(__dirname, '../design-system/src/styles')],
      },
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
