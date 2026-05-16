import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/svelte'
import type { EventResponseDto } from '../../../../src/shared/api/generated/client'
import EventDetailPage from '../../../../src/pages/events/ui/EventDetailPage.svelte'

const mockEvent: EventResponseDto = {
  id: 1,
  title: 'テストイベント',
  eventType: 'competition',
  startAt: '2024-06-01T09:00:00Z',
  place: '東京体育館',
  fee: 3000,
  description: 'テストイベントの詳細説明です。',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
}

describe('EventDetailPage', () => {
  describe('正常系 - イベント表示', () => {
    it('イベントタイトルが表示されること', () => {
      // #region Given
      render(EventDetailPage, { event: mockEvent })
      // #endregion

      // #region When
      const heading = screen.getByRole('heading', { name: 'テストイベント', level: 1 })
      // #endregion

      // #region Then
      expect(heading).toBeInTheDocument()
      // #endregion
    })

    it('イベント一覧に戻るリンクが表示されること', () => {
      // #region Given
      render(EventDetailPage, { event: mockEvent })
      // #endregion

      // #region When
      const link = screen.getByRole('link', { name: /イベント一覧に戻る/ })
      // #endregion

      // #region Then
      expect(link).toHaveAttribute('href', '/events')
      // #endregion
    })

    it('開催情報セクションが表示されること', () => {
      // #region Given
      render(EventDetailPage, { event: mockEvent })
      // #endregion

      // #region When
      const heading = screen.getByRole('heading', { name: '開催情報' })
      // #endregion

      // #region Then
      expect(heading).toBeInTheDocument()
      // #endregion
    })
  })

  describe('正常系 - 参加費表示', () => {
    it('料金がある場合、¥付きの金額が表示されること', () => {
      // #region Given
      render(EventDetailPage, { event: mockEvent })
      // #endregion

      // #region When
      const fees = screen.getAllByText('¥3,000')
      // #endregion

      // #region Then
      expect(fees.length).toBeGreaterThan(0)
      // #endregion
    })

    it('料金がない場合、「無料 / 要確認」が表示されること', () => {
      // #region Given
      const freeEvent: EventResponseDto = {
        ...mockEvent,
        fee: undefined,
      }
      render(EventDetailPage, { event: freeEvent })
      // #endregion

      // #region When
      const fee = screen.getByText('無料 / 要確認')
      // #endregion

      // #region Then
      expect(fee).toBeInTheDocument()
      // #endregion
    })
  })
})
