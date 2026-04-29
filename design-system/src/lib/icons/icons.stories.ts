import type { Meta, StoryObj } from '@storybook/svelte-vite'

import IconsGallery from './icons-gallery.svelte'

const meta = {
  title: 'Design System/Icons',
  component: IconsGallery,
  tags: ['autodocs'],
  args: {
    size: 24,
    color: '#111827',
    strokeWidth: 2,
  },
  argTypes: {
    size: {
      control: { type: 'range', min: 12, max: 48, step: 1 },
    },
    strokeWidth: {
      control: { type: 'range', min: 1, max: 4, step: 0.25 },
    },
    color: {
      control: 'color',
    },
  },
} satisfies Meta<typeof IconsGallery>

export default meta

type Story = StoryObj<typeof meta>

export const Gallery: Story = {}
