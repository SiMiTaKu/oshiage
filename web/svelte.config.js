import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { fileURLToPath } from 'url'
import { resolve } from 'path'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

export default {
  preprocess: vitePreprocess({
    style: {
      configFile: false,
      css: {
        preprocessorOptions: {
          scss: {
            loadPaths: [resolve(__dirname, '../design-system/src/lib/styles')],
          },
        },
      },
    },
  }),
  kit: {
    adapter: adapter(),
  },
}
