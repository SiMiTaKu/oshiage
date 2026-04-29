import type { Meta, StoryObj } from '@storybook/svelte-vite'
import { createRawSnippet } from 'svelte'

import Select from './select.svelte'

const makeOptions = () =>
  createRawSnippet(() => ({
    render: () => `
      <option value="standard">Standard</option>
      <option value="premium">Premium</option>
      <option value="enterprise">Enterprise</option>
    `,
  }))

const meta = {
  title: 'Design System/Select',
  component: Select,
  tags: ['autodocs'],
  args: {
    id: 'plan',
    name: 'plan',
    label: 'Plan',
    placeholder: 'Choose a plan',
    hint: 'Select one option.',
    required: false,
    disabled: false,
    error: '',
    value: '',
    children: makeOptions(),
  },
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithError: Story = {
  args: {
    error: 'Please choose a plan.',
    hint: '',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'premium',
  },
}
