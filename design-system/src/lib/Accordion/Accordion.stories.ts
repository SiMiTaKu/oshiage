import type { Meta, StoryObj } from '@storybook/svelte-vite'
import { createRawSnippet } from 'svelte'

import Accordion from './Accordion.svelte'

const meta = {
  title: 'Design System/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  args: {
    id: 'faq-accordion',
    items: [
      {
        summary: '利用開始までの流れ',
        details: createRawSnippet(() => ({
          render: () => '<p>申請内容を確認後、担当者から 2 営業日以内にご連絡します。</p>',
        })),
      },
      {
        summary: 'サポート対応時間',
        details: createRawSnippet(() => ({
          render: () => '<p>平日 9:00 から 18:00 の間で順次対応します。</p>',
        })),
      },
      {
        summary: '契約変更の反映タイミング',
        details: createRawSnippet(() => ({
          render: () => '<p>変更内容は次回更新日の前日までに反映されます。</p>',
        })),
      },
    ],
  },
} satisfies Meta<typeof Accordion>

export default meta

type Story = StoryObj<typeof meta>

export const 標準: Story = {}
