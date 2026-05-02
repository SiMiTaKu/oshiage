import type { Meta, StoryObj } from '@storybook/svelte-vite'
import { createRawSnippet } from 'svelte'

import TabsRoot from './TabsRoot.svelte'

const meta = {
  title: 'Design System/TabsRoot',
  component: TabsRoot,
  tags: ['autodocs'],
  args: {
    tabs: [
      { id: 'overview', label: '概要' },
      { id: 'metrics', label: '指標' },
      { id: 'activity', label: '履歴' },
    ],
    panelChildren: {
      overview: createRawSnippet(() => ({ render: () => '<p>概要を表示します。</p>' })),
      metrics: createRawSnippet(() => ({ render: () => '<p>指標を表示します。</p>' })),
      activity: createRawSnippet(() => ({ render: () => '<p>更新履歴を表示します。</p>' })),
    },
  },
} satisfies Meta<typeof TabsRoot>

export default meta

type Story = StoryObj<typeof meta>

export const 標準: Story = {}
