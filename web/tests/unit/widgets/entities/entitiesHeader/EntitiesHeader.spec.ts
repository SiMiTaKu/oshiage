import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import EntitiesHeader from '../../../../../src/widgets/entities/entitiesHeader/ui/EntitiesHeader.svelte'

describe('EntitiesHeader', () => {
  describe('正常系 - 表示', () => {
    it('初期表示の場合、見出しテキストが表示されること', () => {
      // #region Given
      render(EntitiesHeader)
      // #endregion

      // #region When
      const title = screen.getByRole('heading', { name: '選手・チーム一覧' })
      // #endregion

      // #region Then
      expect(title).toBeInTheDocument()
      // #endregion
    })
  })
})
