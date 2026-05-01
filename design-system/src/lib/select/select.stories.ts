import type { Meta, StoryObj } from '@storybook/svelte-vite'

import Select from './Select.svelte'

const meta = {
  title: 'Design System/Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    id: 'plan',
    name: 'plan',
    label: 'プラン',
    placeholder: 'プランを選択してください',
    required: true,
    disabled: false,
    error: '',
    value: '',
    items: [
      { label: '通常プラン', value: 'standard' },
      { label: '優先プラン', value: 'premium' },
      { label: '法人プラン', value: 'enterprise' },
    ],
  },
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

export const 標準: Story = {}

export const エラー表示: Story = {
  args: {
    error: 'プランを選択してください。',
  },
}

export const 無効状態: Story = {
  args: {
    disabled: true,
    value: 'premium',
  },
}
