import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/svelte'
import type { EntityResponseDto } from '../../../../src/shared/api/generated/client'

const { mockGoto } = vi.hoisted(() => ({ mockGoto: vi.fn() }))

vi.mock('$app/navigation', () => ({ goto: mockGoto }))

import EntitiesPage from '../../../../src/pages/entities/ui/EntitiesPage.svelte'

const mockEntity: EntityResponseDto = {
  id: 1,
  entityCategory: 'individual',
  activeStatus: 'active',
  currentRevisionNo: 1,
  currentRevision: {
    revisionNo: 1,
    name: 'テスト選手',
    sport: '男子新体操',
    area: '東京',
    profile: 'プロフィールテキスト',
    createdAt: '2024-01-01T00:00:00Z',
  },
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
}

describe('EntitiesPage', () => {
  beforeEach(() => {
    mockGoto.mockClear()
  })

  describe('正常系 - エンティティ表示', () => {
    it('エンティティがある場合、エンティティ名が表示されること', () => {
      // #region Given
      render(EntitiesPage, {
        entities: [mockEntity],
        total: 1,
        page: 1,
        category: '',
        activeStatus: '',
      })
      // #endregion

      // #region When
      const heading = screen.getByRole('heading', { name: 'テスト選手' })
      // #endregion

      // #region Then
      expect(heading).toBeInTheDocument()
      // #endregion
    })

    it('エンティティがない場合、「該当する選手・チームがありません」が表示されること', () => {
      // #region Given
      render(EntitiesPage, {
        entities: [],
        total: 0,
        page: 1,
        category: '',
        activeStatus: '',
      })
      // #endregion

      // #region When
      const msg = screen.getByText('該当する選手・チームがありません')
      // #endregion

      // #region Then
      expect(msg).toBeInTheDocument()
      // #endregion
    })

    it('合計件数が表示されること', () => {
      // #region Given
      render(EntitiesPage, {
        entities: [mockEntity],
        total: 5,
        page: 1,
        category: '',
        activeStatus: '',
      })
      // #endregion

      // #region When
      const count = screen.getByText('5 件')
      // #endregion

      // #region Then
      expect(count).toBeInTheDocument()
      // #endregion
    })
  })

  describe('正常系 - フィルター', () => {
    it('種別フィルターセレクトが表示されること', () => {
      // #region Given
      render(EntitiesPage, {
        entities: [],
        total: 0,
        page: 1,
        category: '',
        activeStatus: '',
      })
      // #endregion

      // #region When
      const select = screen.getByRole('combobox', { name: '種別' })
      // #endregion

      // #region Then
      expect(select).toBeInTheDocument()
      // #endregion
    })

    it('状態フィルターセレクトが表示されること', () => {
      // #region Given
      render(EntitiesPage, {
        entities: [],
        total: 0,
        page: 1,
        category: '',
        activeStatus: '',
      })
      // #endregion

      // #region When
      const select = screen.getByRole('combobox', { name: '状態' })
      // #endregion

      // #region Then
      expect(select).toBeInTheDocument()
      // #endregion
    })
  })

  describe('正常系 - ページネーション', () => {
    it('総ページ数が1の場合、ページネーションが表示されないこと', () => {
      // #region Given
      render(EntitiesPage, {
        entities: [mockEntity],
        total: 20,
        page: 1,
        category: '',
        activeStatus: '',
      })
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
      render(EntitiesPage, {
        entities: [mockEntity],
        total: 21,
        page: 1,
        category: '',
        activeStatus: '',
      })
      // #endregion

      // #region When
      const nextBtn = screen.getByRole('button', { name: '次のページ' })
      // #endregion

      // #region Then
      expect(nextBtn).toBeInTheDocument()
      // #endregion
    })

    it('ページ1の場合、前のページボタンが無効であること', () => {
      // #region Given
      render(EntitiesPage, {
        entities: [mockEntity],
        total: 21,
        page: 1,
        category: '',
        activeStatus: '',
      })
      // #endregion

      // #region When
      const prevBtn = screen.getByRole('button', { name: '前のページ' })
      // #endregion

      // #region Then
      expect(prevBtn).toBeDisabled()
      // #endregion
    })

    it('次のページボタンをクリックした場合、次のページへgotoが呼ばれること', async () => {
      // #region Given
      render(EntitiesPage, {
        entities: [mockEntity],
        total: 21,
        page: 1,
        category: '',
        activeStatus: '',
      })
      const nextBtn = screen.getByRole('button', { name: '次のページ' })
      // #endregion

      // #region When
      await fireEvent.click(nextBtn)
      // #endregion

      // #region Then
      expect(mockGoto).toHaveBeenCalledWith('/entities?page=2')
      // #endregion
    })

    it('前のページボタンをクリックした場合、前のページへgotoが呼ばれること', async () => {
      // #region Given
      render(EntitiesPage, {
        entities: [mockEntity],
        total: 21,
        page: 2,
        category: '',
        activeStatus: '',
      })
      const prevBtn = screen.getByRole('button', { name: '前のページ' })
      // #endregion

      // #region When
      await fireEvent.click(prevBtn)
      // #endregion

      // #region Then
      expect(mockGoto).toHaveBeenCalledWith('/entities?page=1')
      // #endregion
    })
  })
})
