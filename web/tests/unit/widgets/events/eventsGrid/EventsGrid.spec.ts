import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import EventsGrid from '../../../../../src/widgets/events/eventsGrid/ui/EventsGrid.svelte'

describe('EventsGrid', () => {
  describe('正常系 - 表示', () => {
    it('イベントが空の場合、イベントが見つかりませんでしたメッセージが表示されること', () => {
      // #region Given
      render(EventsGrid, {
        props: {
          events: [],
          total: 0,
          page: 1,
          totalPages: 0,
          onPageChange: () => {},
        },
      })
      // #endregion

      // #region When
      const title = screen.getByText('イベントが見つかりませんでした')
      // #endregion

      // #region Then
      expect(title).toBeInTheDocument()
      // #endregion
    })

    it('イベントが存在する場合、イベントタイトルが表示されること', () => {
      // #region Given
      render(EventsGrid, {
        props: {
          events: [
            {
              id: 1,
              title: 'テスト大会',
              eventType: 'competition',
              startAt: '2026-06-14T00:00:00Z',
              place: '東京都',
              fee: 1000,
              description: 'テスト詳細',
            },
          ],
          total: 1,
          page: 1,
          totalPages: 1,
          onPageChange: () => {},
        },
      })
      // #endregion

      // #region When
      const eventTitle = screen.getByRole('heading', { name: 'テスト大会' })
      // #endregion

      // #region Then
      expect(eventTitle).toBeInTheDocument()
      // #endregion
    })
  })
})
