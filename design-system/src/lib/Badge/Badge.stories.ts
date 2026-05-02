import type { Meta, StoryObj } from '@storybook/svelte-vite'

import Badge from './Badge.svelte'

const meta = {
  title: 'Design System/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: {
    variant: 'primary',
    text: '募集中',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: [
        'primary',
        'secondary',
        'primary-outline',
        'secondary-outline',
        'destructive',
        'success',
        'warning',
      ],
    },
  },
} satisfies Meta<typeof Badge>

export default meta

type Story = StoryObj<typeof meta>

export const プライマリ: Story = {}

export const セカンダリ: Story = {
  args: {
    variant: 'secondary',
    text: '公開中',
  },
}

export const プライマリアウトライン: Story = {
  args: {
    variant: 'primary-outline',
    text: '下書き',
  },
}

export const セカンダリアウトライン: Story = {
  args: {
    variant: 'secondary-outline',
    text: '確認中',
  },
}

export const 成功: Story = {
  args: {
    variant: 'success',
    text: '完了',
  },
}

export const 注意: Story = {
  args: {
    variant: 'warning',
    text: '確認必要',
  },
}
