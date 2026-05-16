/** エラーステータスコード定数 */
export const ERROR_STATUS = {
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const

/** ステータスコードに対応するページタイトル */
export const ERROR_PAGE_TITLE: Record<number, string> = {
  [ERROR_STATUS.NOT_FOUND]: 'ページが見つかりません',
}

/** ステータスコードに対応しない場合のデフォルトタイトル */
export const ERROR_PAGE_DEFAULT_TITLE = 'エラーが発生しました'

/** ステータスコードに対応するユーザー向けメッセージ */
export const ERROR_PAGE_MESSAGE: Record<number, string> = {
  [ERROR_STATUS.NOT_FOUND]: 'お探しのページは存在しないか、移動された可能性があります。',
}

/** ステータスコードに対応しない場合のデフォルトメッセージ */
export const ERROR_PAGE_DEFAULT_MESSAGE =
  '予期しないエラーが発生しました。しばらく経ってから再度お試しください。'
