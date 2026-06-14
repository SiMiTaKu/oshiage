import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import type { NoticeResponseDto } from '@shared/api/generated/client'
import NoticeDetailPage from '../../../../src/pages/notices/ui/NoticeDetailPage.svelte'

const mockNotice: NoticeResponseDto = {
  id: 1,
  title: 'テストお知らせ',
  body: 'テストお知らせの本文です。',
  noticeType: 'maintenance',
  priority: 'medium',
  publishAt: '2024-01-01T00:00:00Z',
  createdAt: '2024-01-01T00:00:00Z',
}

describe('NoticeDetailPage', () => {
  describe('正常系 - お知らせ表示', () => {
    it('タイトルが表示されること', () => {
      // #region Given
      render(NoticeDetailPage, { notice: mockNotice })
      // #endregion

      // #region When
      const heading = screen.getByRole('heading', { name: 'テストお知らせ', level: 1 })
      // #endregion

      // #region Then
      expect(heading).toBeInTheDocument()
      // #endregion
    })

    it('本文が表示されること', () => {
      // #region Given
      render(NoticeDetailPage, { notice: mockNotice })
      // #endregion

      // #region When
      const body = screen.getByText('テストお知らせの本文です。')
      // #endregion

      // #region Then
      expect(body).toBeInTheDocument()
      // #endregion
    })

    it('お知らせ一覧に戻るリンクが表示されること', () => {
      // #region Given
      render(NoticeDetailPage, { notice: mockNotice })
      // #endregion

      // #region When
      const link = screen.getByRole('link', { name: /お知らせ一覧に戻る/ })
      // #endregion

      // #region Then
      expect(link).toHaveAttribute('href', '/notices')
      // #endregion
    })
  })

  describe('正常系 - 優先度表示', () => {
    it('優先度がhighの場合、優先度ラベルが表示されること', () => {
      // #region Given
      const highPriorityNotice: NoticeResponseDto = {
        ...mockNotice,
        priority: 'high',
      }
      render(NoticeDetailPage, { notice: highPriorityNotice })
      // #endregion

      // #region When
      const label = screen.getByText(/優先度:/)
      // #endregion

      // #region Then
      expect(label).toBeInTheDocument()
      // #endregion
    })

    it('優先度がlowの場合、優先度ラベルが表示されないこと', () => {
      // #region Given
      const lowPriorityNotice: NoticeResponseDto = {
        ...mockNotice,
        priority: 'low',
      }
      render(NoticeDetailPage, { notice: lowPriorityNotice })
      // #endregion

      // #region When
      const label = screen.queryByText(/優先度:/)
      // #endregion

      // #region Then
      expect(label).not.toBeInTheDocument()
      // #endregion
    })
  })
})
