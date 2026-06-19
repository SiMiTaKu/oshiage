import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import EntitiesFilter from '../../../../../src/widgets/entities/entitiesFilter/ui/EntitiesFilter.svelte'

describe('EntitiesFilter', () => {
  describe('正常系 - 表示', () => {
    it('初期表示の場合、種別と状態のセレクトボックスが表示されること', () => {
      // #region Given
      render(EntitiesFilter, {
        props: {
          selectedCategory: '',
          selectedStatus: '',
          onchange: () => {},
        },
      })
      // #endregion

      // #region When
      const categorySelect = screen.getByRole('combobox', { name: '種別' })
      const statusSelect = screen.getByRole('combobox', { name: '状態' })
      // #endregion

      // #region Then
      expect(categorySelect).toBeInTheDocument()
      expect(statusSelect).toBeInTheDocument()
      // #endregion
    })
  })
})
