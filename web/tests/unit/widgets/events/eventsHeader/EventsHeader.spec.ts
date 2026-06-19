import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import EventsHeader from '../../../../../src/widgets/events/eventsHeader/ui/EventsHeader.svelte'

describe('EventsHeader', () => {
  describe('正常系 - 表示', () => {
    it('初期表示の場合、見出しテキストが表示されること', () => {
      // #region Given
      render(EventsHeader)
      // #endregion

      // #region When
      const title = screen.getByRole('heading', { name: 'イベント一覧' })
      // #endregion

      // #region Then
      expect(title).toBeInTheDocument()
      // #endregion
    })
  })
})
