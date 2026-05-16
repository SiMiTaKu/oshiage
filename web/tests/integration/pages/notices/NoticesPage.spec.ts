import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/svelte'
import type { NoticeResponseDto } from '../../../../src/shared/api/generated/client'

const { mockGoto } = vi.hoisted(() => ({ mockGoto: vi.fn() }))

vi.mock('$app/navigation', () => ({ goto: mockGoto }))

import NoticesPage from '../../../../src/pages/notices/ui/NoticesPage.svelte'

const mockNotice: NoticeResponseDto = {
  id: 1,
  title: 'テストお知らせ',
  body: 'テストお知らせの本文です。',
  noticeType: 'maintenance',
  priority: 'medium',
  publishAt: '2024-01-01T00:00:00Z',
  createdAt: '2024-01-01T00:00:00Z',
}

describe('NoticesPage', () => {
  beforeEach(() => {
    mockGoto.mockClear()
  })

  describe('正常系 - お知らせ表示', () => {
    it('お知らせがある場合、タイトルが表示されること', () => {
      // #region Given
      render(NoticesPage, { notices: [mockNotice], total: 1, page: 1, noticeType: '' })
      // #endregion

      // #region When
      const title = screen.getByText('テストお知らせ')
      // #endregion

      // #region Then
      expect(title).toBeInTheDocument()
      // #endregion
    })

    it('お知らせがない場合、「お知らせはありません」が表示されること', () => {
      // #region Given
      render(NoticesPage, { notices: [], total: 0, page: 1, noticeType: '' })
      // #endregion

      // #region When
      const msg = screen.getByText('お知らせはありません')
      // #endregion

      // #region Then
      expect(msg).toBeInTheDocument()
      // #endregion
    })

    it('合計件数が表示されること', () => {
      // #region Given
      render(NoticesPage, { notices: [mockNotice], total: 4, page: 1, noticeType: '' })
      // #endregion

      // #region When
      const count = screen.getByText('4 件')
      // #endregion

      // #region Then
      expect(count).toBeInTheDocument()
      // #endregion
    })
  })

  describe('正常系 - フィルター', () => {
    it('種別フィルターセレクトが表示されること', () => {
      // #region Given
      render(NoticesPage, { notices: [], total: 0, page: 1, noticeType: '' })
      // #endregion

      // #region When
      const select = screen.getByRole('combobox', { name: '種別' })
      // #endregion

      // #region Then
      expect(select).toBeInTheDocument()
      // #endregion
    })
  })

  describe('正常系 - ページネーション', () => {
    it('総ページ数が1の場合、ページネーションが表示されないこと', () => {
      // #region Given
      render(NoticesPage, { notices: [mockNotice], total: 20, page: 1, noticeType: '' })
      // #endregion

      // #region When
      const nextBtn = screen.queryByRole('button', { name: '次のページ' })
      // #endregion

      // #region Then
      expect(nextBtn).not.toBeInTheDocument()
      // #endregion
    })

    it('複数ページある場合、ページネーションが表示されること', () => {
      // #region Given
      render(NoticesPage, { notices: [mockNotice], total: 21, page: 1, noticeType: '' })
      // #endregion

      // #region When
      const nextBtn = screen.getByRole('button', { name: '次のページ' })
      // #endregion

      // #region Then
      expect(nextBtn).toBeInTheDocument()
      // #endregion
    })

    it('次のページボタンをクリックした場合、次のページへgotoが呼ばれること', async () => {
      // #region Given
      render(NoticesPage, { notices: [mockNotice], total: 21, page: 1, noticeType: '' })
      const nextBtn = screen.getByRole('button', { name: '次のページ' })
      // #endregion

      // #region When
      await fireEvent.click(nextBtn)
      // #endregion

      // #region Then
      expect(mockGoto).toHaveBeenCalledWith('/notices?page=2')
      // #endregion
    })
  })
})
