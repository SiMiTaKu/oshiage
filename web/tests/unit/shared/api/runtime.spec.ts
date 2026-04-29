import { describe, it, expect, vi, beforeEach } from 'vitest'
import { customFetcher } from '../../../../src/shared/api/runtime'

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
    it('JSON レスポンスをパースして { data, headers, status } を返すこと', async () => {
      // Given
      const body = { id: 1, name: 'テスト' }
      mockFetch.mockResolvedValue(makeJsonResponse(body))

      // When
      const result = await customFetcher<{ data: typeof body; headers: Headers; status: number }>(
        '/api/test',
        undefined,
        mockFetch,
      )

      // Then
      expect(result.data).toEqual(body)
      expect(result.status).toBe(200)
      expect(result.headers).toBeInstanceOf(Headers)
    })

    it('Content-Type: application/json ヘッダーを付与してリクエストすること', async () => {
      // Given
      mockFetch.mockResolvedValue(makeJsonResponse({}))

      // When
      await customFetcher('/api/test', undefined, mockFetch)

      // Then
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/test',
        expect.objectContaining({
          headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
        }),
      )
    })

    it('options のヘッダーをマージしてリクエストすること', async () => {
      // Given
      mockFetch.mockResolvedValue(makeJsonResponse({}))
      const customHeaders = { Authorization: 'Bearer token' }

      // When
      await customFetcher('/api/test', { headers: customHeaders }, mockFetch)

      // Then
      expect(mockFetch).toHaveBeenCalledWith(
        '/api/test',
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            Authorization: 'Bearer token',
          }),
        }),
      )
    })

    it('指定された fetchFn を使うこと', async () => {
      // Given
      const altFetch = vi.fn().mockResolvedValue(makeJsonResponse({}))

      // When
      await customFetcher('/api/test', undefined, altFetch)

      // Then
      expect(altFetch).toHaveBeenCalledOnce()
      expect(mockFetch).not.toHaveBeenCalled()
    })
  })
  // #endregion

  // #region 正常系 - 非 JSON レスポンス
  describe('正常系 - 非JSON レスポンス', () => {
    it('Content-Type が application/json でない場合は data が undefined になること', async () => {
      // Given
      mockFetch.mockResolvedValue(makeTextResponse(200))

      // When
      const result = await customFetcher<{ data: undefined; headers: Headers; status: number }>(
        '/api/text',
        undefined,
        mockFetch,
      )

      // Then
      expect(result.data).toBeUndefined()
      expect(result.status).toBe(200)
    })
  })
  // #endregion

  // #region 異常系 - HTTPエラー
  describe('異常系 - HTTP エラー', () => {
    it('response.ok が false の場合、Error をスローすること', async () => {
      // Given
      mockFetch.mockResolvedValue(makeJsonResponse({}, 500))

      // When / Then
      await expect(customFetcher('/api/test', undefined, mockFetch)).rejects.toThrow(
        'API request failed: 500',
      )
    })

    it('404 の場合、Error をスローすること', async () => {
      // Given
      mockFetch.mockResolvedValue(makeJsonResponse({}, 404))

      // When / Then
      await expect(customFetcher('/api/not-found', undefined, mockFetch)).rejects.toThrow(
        'API request failed: 404',
      )
    })
  })
  // #endregion
})
