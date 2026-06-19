import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import EventDetailHeader from '../../../../../src/widgets/events/eventDetailHeader/ui/EventDetailHeader.svelte'

describe('EventDetailHeader', () => {
  describe('正常系 - 表示', () => {
    it('イベントタイトルがヘッダーに表示されること', () => {
      // #region Given
      render(EventDetailHeader, {
        props: {
          event: {
            id: 1,
            title: 'テスト大会',
            eventType: 'competition',
            startAt: '2026-06-14T00:00:00Z',
            place: '東京都',
            fee: 1000,
            description: 'テスト詳細',
          },
        },
      })
      // #endregion

      // #region When
      const title = screen.getByRole('heading', { name: 'テスト大会' })
      // #endregion

      // #region Then
      expect(title).toBeInTheDocument()
      // #endregion
    })
  })
})
