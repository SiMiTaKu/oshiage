import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/svelte'
import type { EntityResponseDto, EntityRevisionDto } from '@shared/api/generated/client'
import EntityDetailPage from '../../../../src/pages/entities/ui/EntityDetailPage.svelte'

const mockRevision: EntityRevisionDto = {
  revisionNo: 1,
  name: 'テスト選手',
  sport: '男子新体操',
  area: '東京',
  profile: 'プロフィールテキスト',
  createdAt: '2024-01-01T00:00:00Z',
}

const mockEntity: EntityResponseDto = {
  id: 1,
  entityCategory: 'individual',
  activeStatus: 'active',
  currentRevisionNo: 1,
  currentRevision: mockRevision,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
}

describe('EntityDetailPage', () => {
  describe('正常系 - エンティティ表示', () => {
    it('エンティティ名が表示されること', () => {
      // #region Given
      render(EntityDetailPage, { entity: mockEntity, revisions: [mockRevision] })
      // #endregion

      // #region When
      const heading = screen.getByRole('heading', { name: 'テスト選手', level: 1 })
      // #endregion

      // #region Then
      expect(heading).toBeInTheDocument()
      // #endregion
    })

    it('選手・チーム一覧に戻るリンクが表示されること', () => {
      // #region Given
      render(EntityDetailPage, { entity: mockEntity, revisions: [] })
      // #endregion

      // #region When
      const link = screen.getByRole('link', { name: /選手・チーム一覧に戻る/ })
      // #endregion

      // #region Then
      expect(link).toHaveAttribute('href', '/entities')
      // #endregion
    })
  })

  describe('正常系 - タブ切り替え', () => {
    it('初期状態の場合、プロフィールタブがアクティブであること', () => {
      // #region Given
      render(EntityDetailPage, { entity: mockEntity, revisions: [mockRevision] })
      // #endregion

      // #region When
      const profileTab = screen.getByRole('button', { name: 'プロフィール' })
      // #endregion

      // #region Then
      expect(profileTab).toHaveClass('active')
      // #endregion
    })

    it('変更履歴タブをクリックした場合、変更履歴が表示されること', async () => {
      // #region Given
      render(EntityDetailPage, { entity: mockEntity, revisions: [mockRevision] })
      const revisionsTab = screen.getByRole('button', { name: /変更履歴/ })
      // #endregion

      // #region When
      await fireEvent.click(revisionsTab)
      // #endregion

      // #region Then
      expect(screen.getByText('第 1 版')).toBeInTheDocument()
      // #endregion
    })

    it('変更履歴が空の場合、変更履歴タブクリックで「変更履歴がありません」が表示されること', async () => {
      // #region Given
      render(EntityDetailPage, { entity: mockEntity, revisions: [] })
      const revisionsTab = screen.getByRole('button', { name: /変更履歴/ })
      // #endregion

      // #region When
      await fireEvent.click(revisionsTab)
      // #endregion

      // #region Then
      expect(screen.getByText('変更履歴がありません')).toBeInTheDocument()
      // #endregion
    })
  })
})
