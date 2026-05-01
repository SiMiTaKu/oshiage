import type { Meta, StoryObj } from '@storybook/svelte-vite'
import { createRawSnippet } from 'svelte'

import Tabs from './Tabs.svelte'

const meta = {
  title: 'Design System/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  args: {
    children: createRawSnippet(() => ({
      render: () => `
        <div style="padding: 0.75rem 1rem; border: 1px solid #d1d5db; border-radius: 0.5rem;">
          タブ全体のラッパーコンテンツ
        </div>
      `,
    })),
  },
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>

export const 標準: Story = {}
