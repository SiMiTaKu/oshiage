import type { Meta, StoryObj } from '@storybook/svelte-vite'

import Button from './button.svelte'

const meta = {
  title: 'Design System/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    label: '主要アクション',
    tone: 'primary',
  },
  argTypes: {
    tone: {
      control: 'inline-radio',
      options: ['primary', 'secondary'],
    },
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {}

export const Secondary: Story = {
  args: {
    label: '補助アクション',
    tone: 'secondary',
  },
}
