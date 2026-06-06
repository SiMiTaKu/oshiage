import type { Handle } from '@sveltejs/kit'

/**
 * カスタムハンドラー
 * @param input - ハンドラーの入力オブジェクト
 * @returns - レスポンス
 */
export const handle: Handle = async (input) => {
  const { event, resolve } = input
  const userAgent = event.request.headers.get('user-agent') || ''
  const isMobile =
    /Mobile|Android|iP(hone|od|ad)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/i.test(
      userAgent,
    )
  event.locals.isMobile = isMobile

  return resolve(event)
}
