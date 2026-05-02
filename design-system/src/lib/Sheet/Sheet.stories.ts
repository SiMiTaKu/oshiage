import type { Meta, StoryObj } from '@storybook/svelte-vite'
import { createRawSnippet } from 'svelte'

import Sheet from './Sheet.svelte'

const META = {
  title: 'Design System/Sheet',
  component: Sheet,
  tags: ['autodocs'],
  args: {
    side: 'left',
    children: createRawSnippet(() => ({
      render: () => `
        <div style="padding-right: 2rem; max-width: 280px;">
          <h3 style="margin: 0 0 0.75rem; font-size: 1rem;">絞り込み設定</h3>
          <p style="margin: 0; color: #4b5563; line-height: 1.5;">
            このシートから公開状態や表示順をまとめて変更できます。
          </p>
        </div>
      `,
    })),
  },
  argTypes: {
    side: {
      control: 'inline-radio',
      options: ['left', 'right', 'bottom'],
    },
  },
} satisfies Meta<typeof Sheet>

export default META

type Story = StoryObj<typeof META>

export const 左から表示: Story = {}

export const 右から表示: Story = {
  args: {
    side: 'right',
  },
}

export const 下から表示: Story = {
  args: {
    side: 'bottom',
  },
}
