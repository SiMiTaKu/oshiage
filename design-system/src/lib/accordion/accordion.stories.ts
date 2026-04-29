import type { Meta, StoryObj } from '@storybook/svelte-vite'
import { createRawSnippet } from 'svelte'

import Accordion from './accordion.svelte'

const makeContent = (text: string) =>
  createRawSnippet(() => ({
    render: () => `<p>${text}</p>`,
  }))

const items = [
  {
    id: 'shipping',
    title: 'Shipping options',
    content: makeContent('Standard delivery takes 3 to 5 business days.'),
  },
  {
    id: 'returns',
    title: 'Return policy',
    content: makeContent('You can return items within 30 days of delivery.'),
  },
  {
    id: 'support',
    title: 'Support hours',
    content: makeContent('Support is available from 9:00 to 18:00 on weekdays.'),
  },
]

const meta = {
  title: 'Design System/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  args: {
    items,
    allowMultiple: false,
  },
} satisfies Meta<typeof Accordion>

export default meta

type Story = StoryObj<typeof meta>

export const SingleOpen: Story = {}

export const MultipleOpen: Story = {
  args: {
    allowMultiple: true,
  },
}
