import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import EntitiesGrid from '../../../../../src/widgets/entities/entitiesGrid/ui/EntitiesGrid.svelte'

describe('EntitiesGrid', () => {
  describe('正常系 - 表示', () => {
    it('選手・チームが空の場合、該当する選手・チームがありませんメッセージが表示されること', () => {
      // #region Given
      render(EntitiesGrid, {
        props: {
          entities: [],
          total: 0,
          page: 1,
          totalPages: 0,
          onPageChange: () => {},
        },
      })
      // #endregion

      // #region When
      const title = screen.getByText('該当する選手・チームがありません')
      // #endregion

      // #region Then
      expect(title).toBeInTheDocument()
      // #endregion
    })

    it('選手・チームが存在する場合、名前が表示されること', () => {
      // #region Given
      render(EntitiesGrid, {
        props: {
          entities: [
            {
              id: 1,
              entityCategory: 'individual',
              activeStatus: 'active',
              createdAt: '2026-06-14T00:00:00Z',
              updatedAt: '2026-06-14T00:00:00Z',
              currentRevision: {
                id: 1,
                entityId: 1,
                revisionNo: 1,
                name: 'テスト太郎',
                sport: '男子新体操',
                area: '東京都',
                profile: 'テストプロフィール',
                reason: '新規作成',
                createdAt: '2026-06-14T00:00:00Z',
              },
            },
          ],
          total: 1,
          page: 1,
          totalPages: 1,
          onPageChange: () => {},
        },
      })
      // #endregion

      // #region When
      const name = screen.getByRole('heading', { name: 'テスト太郎' })
      // #endregion

      // #region Then
      expect(name).toBeInTheDocument()
      // #endregion
    })
  })
})
