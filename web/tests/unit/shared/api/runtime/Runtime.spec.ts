import { describe, it, expect, vi, beforeEach } from 'vitest'
import { customFetcher } from '../../../../../src/shared/api/runtime'

const makeJsonResponse = (body: unknown, status = 200): Response => {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: new Headers({ 'content-type': 'application/json' }),
    json: vi.fn().mockResolvedValue(body),
  } as unknown as Response
}

const makeTextResponse = (status = 200): Response => {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: new Headers({ 'content-type': 'text/plain' }),
  } as unknown as Response
}

describe('customFetcher', () => {
  let mockFetch: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockFetch = vi.fn()
  })

  // #region 正常系 - JSON レスポンス
  describe('正常系 - JSON レスポンス', () => {
    it('JSON レスポンスを受け取った場合、{ data, headers, status } を返すこと', async () => {
      // #region Given
      const body = { id: 1, name: 'テスト' }
      mockFetch.mockResolvedValue(makeJsonResponse(body))
      // #endregion

      // #region When
      const result = await customFetcher<{ data: typeof body; headers: Headers; status: number }>(
        '/api/test',
        undefined,
        mockFetch,
      )
      // #endregion

      // #region Then
      expect(result.data).toEqual(body)
      expect(result.status).toBe(200)
      expect(result.headers).toBeInstanceOf(Headers)
      // #endregion
    })

    it('customFetcher を呼び出した場合、Content-Type: application/json ヘッダーを付与してリクエストすること', async () => {
      // #region Given
      mockFetch.mockResolvedValue(makeJsonResponse({}))
      // #endregion

      // #region When
      await customFetcher('/api/test', undefined, mockFetch)
      // #endregion

      // #region Then
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/test',
        expect.objectContaining({
          headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
        }),
      )
      // #endregion
    })

    it('options.headers を渡した場合、Content-Type とマージしてリクエストすること', async () => {
      // #region Given
      mockFetch.mockResolvedValue(makeJsonResponse({}))
      const customHeaders = { Authorization: 'Bearer token' }
      // #endregion

      // #region When
      await customFetcher('/api/test', { headers: customHeaders }, mockFetch)
      // #endregion

      // #region Then
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/test',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            Authorization: 'Bearer token',
          }),
        }),
      )
      // #endregion
    })

    it('fetchFn を指定した場合、指定した fetchFn が使われること', async () => {
      // #region Given
      const altFetch = vi.fn().mockResolvedValue(makeJsonResponse({}))
      // #endregion

      // #region When
      await customFetcher('/api/test', undefined, altFetch)
      // #endregion

      // #region Then
      expect(altFetch).toHaveBeenCalledOnce()
      expect(mockFetch).not.toHaveBeenCalled()
      // #endregion
    })
  })
  // #endregion

  // #region 正常系 - 非 JSON レスポンス
  describe('正常系 - 非JSON レスポンス', () => {
    it('Content-Type が application/json でない場合、data が undefined になること', async () => {
      // #region Given
      mockFetch.mockResolvedValue(makeTextResponse(200))
      // #endregion

      // #region When
      const result = await customFetcher<{ data: undefined; headers: Headers; status: number }>(
        '/api/text',
        undefined,
        mockFetch,
      )
      // #endregion

      // #region Then
      expect(result.data).toBeUndefined()
      expect(result.status).toBe(200)
      // #endregion
    })
  })
  // #endregion

  // #region 異常系 - HTTPエラー
  describe('異常系 - HTTP エラー', () => {
    it('response.ok が false の場合、Error をスローすること', async () => {
      // #region Given
      mockFetch.mockResolvedValue(makeJsonResponse({}, 500))
      // #endregion

      // #region When / Then
      await expect(customFetcher('/api/test', undefined, mockFetch)).rejects.toThrow(
        'API request failed: 500',
      )
      // #endregion
    })

    it('404 を受け取った場合、Error をスローすること', async () => {
      // #region Given
      mockFetch.mockResolvedValue(makeJsonResponse({}, 404))
      // #endregion

      // #region When / Then
      await expect(customFetcher('/api/not-found', undefined, mockFetch)).rejects.toThrow(
        'API request failed: 404',
      )
      // #endregion
    })
  })
  // #endregion
})
