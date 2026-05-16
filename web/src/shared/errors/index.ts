/**
 * フロントエンド全体で使用するアプリケーションエラー基底クラス
 *
 * @remarks
 * HTTP ステータスコードとユーザー向けメッセージを型として保持する抽象クラス。
 * このクラスを継承して各種エラーを定義することで、instanceof チェックや
 * status フィールドによる分岐が型安全に行える。
 */
export abstract class AppError extends Error {
  /**
   * @param status - HTTP ステータスコード（例: 404, 500）
   * @param message - ユーザー向けエラーメッセージ
   */
  constructor(
    public readonly status: number,
    message: string,
  ) {
    super(message)
    this.name = new.target.name
  }
}

/**
 * 404 Not Found エラー
 *
 * @remarks
 * リクエストされたリソースが存在しない場合に使用する。
 */
export class NotFoundError extends AppError {
  /**
   * @param message - ユーザー向けエラーメッセージ（省略時はデフォルト文言を使用）
   */
  constructor(message = 'ページが見つかりません') {
    super(404, message)
  }
}

/**
 * 500 Internal Server Error
 *
 * @remarks
 * サーバー側の予期しないエラーが発生した場合に使用する。
 */
export class InternalServerError extends AppError {
  /**
   * @param message - ユーザー向けエラーメッセージ（省略時はデフォルト文言を使用）
   */
  constructor(message = '予期しないエラーが発生しました。しばらく経ってから再度お試しください。') {
    super(500, message)
  }
}
