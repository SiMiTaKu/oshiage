import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import EventPreview from '../../../../../src/widgets/home/eventPreview/ui/EventPreview.svelte'

describe('EventPreview', () => {
  describe('正常系 - 表示', () => {
    it('初期表示の場合、見出しテキストが表示されること', () => {
      // #region Given
      render(EventPreview)
      // #endregion

      // #region When
      const heading = screen.getByRole('heading', { name: '注目のイベント' })
      // #endregion

      // #region Then
      expect(heading).toBeInTheDocument()
      // #endregion
    })

    it('すべて見るリンクが正しいhrefで表示されること', () => {
      // #region Given
      render(EventPreview)
      // #endregion

      // #region When
      const link = screen.getByRole('link', { name: /すべて見る/ })
      // #endregion

      // #region Then
      expect(link).toHaveAttribute('href', '/events')
      // #endregion
    })
  })
})
