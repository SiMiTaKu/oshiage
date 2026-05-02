import type { Meta, StoryObj } from '@storybook/svelte-vite'

import IconsGallery from './IconsGallery.svelte'

const meta = {
  title: 'Design System/Icons',
  component: IconsGallery,
  tags: ['autodocs'],
  args: {
    size: 24,
    color: 'primary',
  },
  argTypes: {
    size: {
      control: { type: 'range', min: 12, max: 48, step: 1 },
    },
    color: {
      control: 'inline-radio',
      options: ['primary', 'secondary', 'gray', 'error', 'white', 'success', 'warning'],
    },
  },
} satisfies Meta<typeof IconsGallery>

export default meta

type Story = StoryObj<typeof meta>

export const ギャラリー: Story = {}
