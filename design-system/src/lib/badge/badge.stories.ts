import type { Meta, StoryObj } from '@storybook/svelte-vite'
import { createRawSnippet } from 'svelte'

import Badge from './badge.svelte'

const makeChildren = (text: string) =>
  createRawSnippet(() => ({
    render: () => `<span>${text}</span>`,
  }))

const meta = {
  title: 'Design System/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    variant: 'default',
    children: makeChildren('Badge'),
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['default', 'secondary', 'outline', 'destructive', 'success', 'warning'],
    },
  },
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Success: Story = {
  args: {
    variant: 'success',
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
  },
}
