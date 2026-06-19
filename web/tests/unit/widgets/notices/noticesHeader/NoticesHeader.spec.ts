import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import NoticesHeader from '../../../../../src/widgets/notices/noticesHeader/ui/NoticesHeader.svelte'

describe('NoticesHeader', () => {
  describe('正常系 - 表示', () => {
    it('初期表示の場合、見出しテキストが表示されること', () => {
      // #region Given
      render(NoticesHeader)
      // #endregion

      // #region When
      const title = screen.getByRole('heading', { name: 'お知らせ' })
      // #endregion

      // #region Then
      expect(title).toBeInTheDocument()
      // #endregion
    })
  })
})
