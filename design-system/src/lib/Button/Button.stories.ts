import type { Meta, StoryObj } from '@storybook/svelte-vite'

import Button from './Button.svelte'

const meta = {
  title: 'Design System/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    label: '主要アクション',
    variant: 'primary',
    type: 'button',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'primary-outline', 'secondary', 'secondary-outline'],
    },
    type: {
      control: 'inline-radio',
      options: ['button', 'submit'],
    },
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const プライマリ: Story = {}

export const プライマリアウトライン: Story = {
  args: {
    label: '確認する',
    variant: 'primary-outline',
  },
}

export const セカンダリ: Story = {
  args: {
    label: '補助アクション',
    variant: 'secondary',
  },
}

export const セカンダリアウトライン: Story = {
  args: {
    label: '戻る',
    variant: 'secondary-outline',
  },
}
