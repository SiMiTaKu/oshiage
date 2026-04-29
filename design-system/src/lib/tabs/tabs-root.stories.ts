import type { Meta, StoryObj } from '@storybook/svelte-vite'
import { createRawSnippet } from 'svelte'

import TabsRoot from './tabs-root.svelte'

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'metrics', label: 'Metrics' },
  { id: 'activity', label: 'Activity' },
]

const panelChildren = {
  overview: createRawSnippet(() => ({ render: () => '<p>Overview content.</p>' })),
  metrics: createRawSnippet(() => ({ render: () => '<p>Metrics content.</p>' })),
  activity: createRawSnippet(() => ({ render: () => '<p>Activity content.</p>' })),
}

const meta = {
  title: 'Design System/TabsRoot',
  component: TabsRoot,
  tags: ['autodocs'],
  args: {
    tabs,
    activeTab: 'overview',
    panelChildren,
  },
} satisfies Meta<typeof TabsRoot>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const MetricsActive: Story = {
  args: {
    activeTab: 'metrics',
  },
}
