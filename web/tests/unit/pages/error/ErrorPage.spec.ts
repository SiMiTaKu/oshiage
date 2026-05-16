import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/svelte'

const { mockPageStore } = vi.hoisted(() => ({
  mockPageStore: { subscribe: vi.fn() },
}))

vi.mock('$app/stores', () => ({ page: mockPageStore }))

import ErrorPage from '../../../../src/pages/error/ui/ErrorPage.svelte'

describe('ErrorPage', () => {
  describe('正常系 - 404エラー', () => {
    beforeEach(() => {
      mockPageStore.subscribe.mockImplementation((fn: (val: unknown) => void) => {
        fn({
          status: 404,
          error: null,
          url: new URL('http://localhost/'),
          params: {},
          route: { id: null },
          data: {},
        })
        return () => {}
      })
    })

    it('404ステータスの場合、エラーコード「404」が表示されること', () => {
      // #region Given
      render(ErrorPage)
      // #endregion

      // #region When
      const code = screen.getByText('404')
      // #endregion

      // #region Then
      expect(code).toBeInTheDocument()
      // #endregion
    })

    it('404ステータスの場合、「ページが見つかりません」タイトルが表示されること', () => {
      // #region Given
      render(ErrorPage)
      // #endregion

      // #region When
      const heading = screen.getByRole('heading', { name: 'ページが見つかりません' })
      // #endregion

      // #region Then
      expect(heading).toBeInTheDocument()
      // #endregion
    })

    it('404ステータスの場合、定義済みメッセージが表示されること', () => {
      // #region Given
      render(ErrorPage)
      // #endregion

      // #region When
      const message = screen.getByText('お探しのページは存在しないか、移動された可能性があります。')
      // #endregion

      // #region Then
      expect(message).toBeInTheDocument()
      // #endregion
    })
  })

  describe('正常系 - 未定義ステータス', () => {
    it('未定義ステータスの場合、デフォルトタイトルが表示されること', () => {
      // #region Given
      mockPageStore.subscribe.mockImplementation((fn: (val: unknown) => void) => {
        fn({
          status: 503,
          error: null,
          url: new URL('http://localhost/'),
          params: {},
          route: { id: null },
          data: {},
        })
        return () => {}
      })
      render(ErrorPage)
      // #endregion

      // #region When
      const heading = screen.getByRole('heading', { name: 'エラーが発生しました' })
      // #endregion

      // #region Then
      expect(heading).toBeInTheDocument()
      // #endregion
    })

    it('未定義ステータスかつカスタムエラーメッセージがある場合、そのメッセージが表示されること', () => {
      // #region Given
      mockPageStore.subscribe.mockImplementation((fn: (val: unknown) => void) => {
        fn({
          status: 503,
          error: { message: 'サービス利用不可' },
          url: new URL('http://localhost/'),
          params: {},
          route: { id: null },
          data: {},
        })
        return () => {}
      })
      render(ErrorPage)
      // #endregion

      // #region When
      const message = screen.getByText('サービス利用不可')
      // #endregion

      // #region Then
      expect(message).toBeInTheDocument()
      // #endregion
    })

    it('未定義ステータスかつエラーメッセージもない場合、デフォルトメッセージが表示されること', () => {
      // #region Given
      mockPageStore.subscribe.mockImplementation((fn: (val: unknown) => void) => {
        fn({
          status: 503,
          error: null,
          url: new URL('http://localhost/'),
          params: {},
          route: { id: null },
          data: {},
        })
        return () => {}
      })
      render(ErrorPage)
      // #endregion

      // #region When
      const message = screen.getByText(
        '予期しないエラーが発生しました。しばらく経ってから再度お試しください。',
      )
      // #endregion

      // #region Then
      expect(message).toBeInTheDocument()
      // #endregion
    })
  })

  describe('正常系 - アクションリンク', () => {
    beforeEach(() => {
      mockPageStore.subscribe.mockImplementation((fn: (val: unknown) => void) => {
        fn({
          status: 404,
          error: null,
          url: new URL('http://localhost/'),
          params: {},
          route: { id: null },
          data: {},
        })
        return () => {}
      })
    })

    it('初期表示の場合、トップページへ戻るリンクが表示されること', () => {
      // #region Given
      render(ErrorPage)
      // #endregion

      // #region When
      const link = screen.getByRole('link', { name: 'トップページへ戻る' })
      // #endregion

      // #region Then
      expect(link).toHaveAttribute('href', '/')
      // #endregion
    })

    it('初期表示の場合、イベントを探すリンクが表示されること', () => {
      // #region Given
      render(ErrorPage)
      // #endregion

      // #region When
      const link = screen.getByRole('link', { name: 'イベントを探す' })
      // #endregion

      // #region Then
      expect(link).toHaveAttribute('href', '/events')
      // #endregion
    })
  })
})
