import type { Meta, StoryObj } from '@storybook/svelte-vite'

import Input from './input.svelte'

const meta = {
  title: 'Design System/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    id: 'email',
    name: 'email',
    label: 'Email',
    placeholder: 'name@example.com',
    hint: 'We will never share your email.',
    required: false,
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

export const Default: Story = {}

export const WithError: Story = {
  args: {
    error: 'Please enter a valid email address.',
    hint: '',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'disabled@example.com',
  },
}
