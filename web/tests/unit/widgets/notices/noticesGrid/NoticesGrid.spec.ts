import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import NoticesGrid from '../../../../../src/widgets/notices/noticesGrid/ui/NoticesGrid.svelte'

describe('NoticesGrid', () => {
  describe('正常系 - 表示', () => {
    it('お知らせが空の場合、お知らせはありませんメッセージが表示されること', () => {
      // #region Given
      render(NoticesGrid, {
        props: {
          notices: [],
          total: 0,
          page: 1,
          totalPages: 0,
          selectedType: '',
          onTypeChange: () => {},
          onPageChange: () => {},
        },
      })
      // #endregion

      // #region When
      const title = screen.getByText('お知らせはありません')
      // #endregion

      // #region Then
      expect(title).toBeInTheDocument()
      // #endregion
    })

    it('お知らせが存在する場合、タイトルが表示されること', () => {
      // #region Given
      render(NoticesGrid, {
        props: {
          notices: [
            {
              id: 1,
              title: 'テストお知らせ',
              noticeType: 'specChange',
              priority: 'high',
              publishAt: '2026-06-14T00:00:00Z',
              body: 'テスト本文',
            },
          ],
          total: 1,
          page: 1,
          totalPages: 1,
          selectedType: '',
          onTypeChange: () => {},
          onPageChange: () => {},
        },
      })
      // #endregion

      // #region When
      const title = screen.getByText('テストお知らせ')
      // #endregion

      // #region Then
      expect(title).toBeInTheDocument()
      // #endregion
    })
  })
})
