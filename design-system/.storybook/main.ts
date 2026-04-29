import type { StorybookConfig } from '@storybook/svelte-vite'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import { mergeConfig } from 'vite'

const currentDir = dirname(fileURLToPath(import.meta.url))

const config: StorybookConfig = {
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/svelte-vite',
    options: {},
  },
  stories: ['../src/**/*.stories.@(ts|svelte)'],
  async viteFinal(viteConfig) {
    return mergeConfig(viteConfig, {
      css: {
        preprocessorOptions: {
          scss: {
            loadPaths: [resolve(currentDir, '../src/lib/styles')],
          },
        },
      },
    })
  },
}

export default config
