import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import EntityDetailContent from '../../../../../src/widgets/entities/entityDetailContent/ui/EntityDetailContent.svelte'

describe('EntityDetailContent', () => {
  describe('正常系 - 表示', () => {
    it('プロフィール情報と基本情報が表示されること', () => {
      // #region Given
      render(EntityDetailContent, {
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
              profile: 'テストプロフィール内容です',
              reason: '新規作成',
              createdAt: '2026-06-14T00:00:00Z',
            },
          },
          revisions: [],
        },
      })
      // #endregion

      // #region When
      const profileText = screen.getByText('テストプロフィール内容です')
      const area = screen.getByText('東京都')
      // #endregion

      // #region Then
      expect(profileText).toBeInTheDocument()
      expect(area).toBeInTheDocument()
      // #endregion
    })
  })
})
