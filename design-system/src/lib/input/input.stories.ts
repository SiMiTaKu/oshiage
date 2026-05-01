import type { Meta, StoryObj } from '@storybook/svelte-vite'

import Input from './Input.svelte'

const meta = {
  title: 'Design System/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    id: 'email',
    name: 'email',
    label: 'メールアドレス',
    placeholder: 'sample@example.com',
    required: true,
    disabled: false,
    error: '',
    type: 'email',
    value: '',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'search', 'tel', 'url'],
    },
  },
} satisfies Meta<typeof Input>

export default meta

type Story = StoryObj<typeof meta>

export const 標準: Story = {}

export const エラー表示: Story = {
  args: {
    error: 'メールアドレスの形式が正しくありません。',
  },
}

export const 無効状態: Story = {
  args: {
    disabled: true,
    value: 'disabled@example.com',
  },
}
