import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default {
  preprocess: vitePreprocess({
    style: {
      css: {
        preprocessorOptions: {
          scss: {
            loadPaths: [resolve(currentDir, 'src/styles')],
          },
        },
      },
    },
  }),
}
