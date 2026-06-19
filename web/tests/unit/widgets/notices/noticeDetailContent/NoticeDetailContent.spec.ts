import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import NoticeDetailContent from '../../../../../src/widgets/notices/noticeDetailContent/ui/NoticeDetailContent.svelte'

describe('NoticeDetailContent', () => {
  describe('正常系 - 表示', () => {
    it('お知らせ詳細が表示されること', () => {
      // #region Given
      render(NoticeDetailContent, {
        props: {
          notice: {
            id: 1,
            title: 'テストお知らせ',
            noticeType: 'specChange',
            priority: 'high',
            publishAt: '2026-06-14T00:00:00Z',
            body: 'テストお知らせ詳細本文です。',
          },
        },
      })
      // #endregion

      // #region When
      const title = screen.getByRole('heading', { name: 'テストお知らせ' })
      const body = screen.getByText('テストお知らせ詳細本文です。')
      // #endregion

      // #region Then
      expect(title).toBeInTheDocument()
      expect(body).toBeInTheDocument()
      // #endregion
    })
  })
})
