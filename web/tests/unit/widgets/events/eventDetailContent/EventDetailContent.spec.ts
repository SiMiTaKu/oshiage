import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import EventDetailContent from '../../../../../src/widgets/events/eventDetailContent/ui/EventDetailContent.svelte'

describe('EventDetailContent', () => {
  describe('正常系 - 表示', () => {
    it('イベント詳細と開催情報が表示されること', () => {
      // #region Given
      render(EventDetailContent, {
        props: {
          event: {
            id: 1,
            title: 'テスト大会',
            eventType: 'competition',
            startAt: '2026-06-14T00:00:00Z',
            place: '東京都',
            fee: 1000,
            description: 'テスト詳細内容です',
          },
        },
      })
      // #endregion

      // #region When
      const desc = screen.getByText('テスト詳細内容です')
      const place = screen.getByText('東京都')
      // #endregion

      // #region Then
      expect(desc).toBeInTheDocument()
      expect(place).toBeInTheDocument()
      // #endregion
    })
  })
})
