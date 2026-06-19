import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import EntityDetailHeader from '../../../../../src/widgets/entities/entityDetailHeader/ui/EntityDetailHeader.svelte'

describe('EntityDetailHeader', () => {
  describe('正常系 - 表示', () => {
    it('選手名がヘッダーに表示されること', () => {
      // #region Given
      render(EntityDetailHeader, {
        props: {
          entity: {
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
