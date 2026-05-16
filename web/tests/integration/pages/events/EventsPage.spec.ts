import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/svelte'
import type { EventResponseDto } from '../../../../src/shared/api/generated/client'

const { mockGoto } = vi.hoisted(() => ({ mockGoto: vi.fn() }))

vi.mock('$app/navigation', () => ({ goto: mockGoto }))

import EventsPage from '../../../../src/pages/events/ui/EventsPage.svelte'

const mockEvent: EventResponseDto = {
  id: 1,
  title: 'テストイベント',
  eventType: 'competition',
  startAt: '2024-06-01T09:00:00Z',
  place: '東京体育館',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
}

describe('EventsPage', () => {
  beforeEach(() => {
    mockGoto.mockClear()
  })

  describe('正常系 - イベント表示', () => {
    it('イベントがある場合、イベントタイトルが表示されること', () => {
      // #region Given
      render(EventsPage, { props: { events: [mockEvent], total: 1, page: 1, eventType: '' } })
      // #endregion

      // #region When
      const heading = screen.getByRole('heading', { name: 'テストイベント' })
      // #endregion

      // #region Then
      expect(heading).toBeInTheDocument()
      // #endregion
    })

    it('イベントがない場合、「イベントが見つかりませんでした」が表示されること', () => {
      // #region Given
      render(EventsPage, { props: { events: [], total: 0, page: 1, eventType: '' } })
      // #endregion

      // #region When
      const msg = screen.getByText('イベントが見つかりませんでした')
      // #endregion

      // #region Then
      expect(msg).toBeInTheDocument()
      // #endregion
    })

    it('合計件数が表示されること', () => {
      // #region Given
      render(EventsPage, { props: { events: [mockEvent], total: 3, page: 1, eventType: '' } })
      // #endregion

      // #region When
      const count = screen.getByText('3 件のイベント')
      // #endregion

      // #region Then
      expect(count).toBeInTheDocument()
      // #endregion
    })
  })

  describe('正常系 - フィルター', () => {
    it('種別フィルターセレクトが表示されること', () => {
      // #region Given
      render(EventsPage, { props: { events: [], total: 0, page: 1, eventType: '' } })
      // #endregion

      // #region When
      const select = screen.getByRole('combobox', { name: '種別' })
      // #endregion

      // #region Then
      expect(select).toBeInTheDocument()
      // #endregion
    })
  })

  describe('正常系 - ページネーション', () => {
    it('総ページ数が1の場合、ページネーションが表示されないこと', () => {
      // #region Given
      render(EventsPage, { props: { events: [mockEvent], total: 20, page: 1, eventType: '' } })
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
      render(EventsPage, { props: { events: [mockEvent], total: 21, page: 1, eventType: '' } })
      // #endregion

      // #region When
      const nextBtn = screen.getByRole('button', { name: '次のページ' })
      // #endregion

      // #region Then
      expect(nextBtn).toBeInTheDocument()
      // #endregion
    })

    it('次のページボタンをクリックした場合、次のページへgotoが呼ばれること', async () => {
      // #region Given
      render(EventsPage, { props: { events: [mockEvent], total: 21, page: 1, eventType: '' } })
      const nextBtn = screen.getByRole('button', { name: '次のページ' })
      // #endregion

      // #region When
      await fireEvent.click(nextBtn)
      // #endregion

      // #region Then
      expect(mockGoto).toHaveBeenCalledWith('/events?page=2')
      // #endregion
    })
  })
})
