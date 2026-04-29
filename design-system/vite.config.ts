import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [svelte()],
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [resolve(__dirname, 'src/lib/styles')],
      },
    },
  },
  build: {
    lib: {
      entry: 'src/lib/index.ts',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['svelte'],
    },
  },
})
