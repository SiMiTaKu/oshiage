import type { StorybookConfig } from '@storybook/svelte-vite'

const config: StorybookConfig = {
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/svelte-vite',
    options: {},
  },
  stories: ['../src/**/*.stories.@(ts|svelte)'],
}

export default config
