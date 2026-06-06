import type { Meta, StoryObj } from '@storybook/svelte-vite'
import PlusIcon from '../Icons/IconComponents/PlusIcon.svelte'

import Button from './Button.svelte'

const meta = {
  title: 'Design System/Button',
  component: Button,
  tags: ['autodocs'],
  args: {
    label: '主要アクション',
    variant: 'primary',
    type: 'text',
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['primary', 'primary-outline', 'secondary', 'secondary-outline'],
    },
    type: {
      control: 'inline-radio',
      options: ['text', 'icon', 'icon-text', 'link-button'],
    },
  },
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const テキストのみ: Story = {
  args: {
    type: 'text',
    label: '主要アクション',
    variant: 'primary',
  },
}

export const アイコンのみ: Story = {
  args: {
    type: 'icon',
    icon: PlusIcon,
    'aria-label': '追加',
    variant: 'primary',
  },
}

export const アイコンテキスト: Story = {
  args: {
    type: 'icon-text',
    icon: PlusIcon,
    label: '追加する',
    variant: 'primary',
  },
}

export const リンクボタン: Story = {
  args: {
    type: 'link-button',
    label: '詳細を見る',
    variant: 'secondary-outline',
    href: '#',
  },
}

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
