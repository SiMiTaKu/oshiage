import type { Meta, StoryObj } from '@storybook/svelte-vite'
import { createRawSnippet } from 'svelte'

import Sheet from './sheet.svelte'

const makeChildren = () =>
  createRawSnippet(() => ({
    render: () => `
      <div style="padding-right: 2rem; max-width: 280px;">
        <h3 style="margin: 0 0 0.75rem; font-size: 1rem;">Filter Settings</h3>
        <p style="margin: 0; color: #4b5563; line-height: 1.5;">
          Update your filter preferences from this panel.
        </p>
      </div>
    `,
  }))

const meta = {
  title: 'Design System/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  args: {
    open: true,
    side: 'left',
    children: makeChildren(),
  },
  argTypes: {
    side: {
      control: 'inline-radio',
      options: ['left', 'right', 'bottom'],
    },
  },
} satisfies Meta<typeof Sheet>

export default meta

type Story = StoryObj<typeof meta>

export const Left: Story = {}

export const Right: Story = {
  args: {
    side: 'right',
  },
}

export const Bottom: Story = {
  args: {
    side: 'bottom',
  },
}
