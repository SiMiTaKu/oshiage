import { AccountService } from '../../../../src/features/account/services/account.service'

describe('AccountService', () => {
  let service: AccountService

  beforeEach(() => {
    service = new AccountService()
  })

  describe('bootstrap', () => {
    describe('正常系', () => {
      it('固定のブートストラップレスポンスを返すこと', () => {
        // #region Given
        // サービスが初期化済み
        // #endregion

        // #region When - ブートストラップレスポンスを取得すること
        const result = service.bootstrap()
        // #endregion

        // #region Then - ブートストラップレスポンスが固定の値であること
        expect(result).toEqual({
          created: false,
          cognitoSub: 'placeholder-sub',
          userId: 1,
        })
        // #endregion
      })
    })
  })

  describe('getAccount', () => {
    describe('正常系', () => {
      it('アカウントプロフィールを返すこと', () => {
        // #region Given When - アカウントプロフィールを取得する
        const result = service.getAccount()
        // #endregion

        // #region Then - アカウントプロフィールの内容が正しいこと
        expect(result.userId).toBe(1)
        expect(result.email).toBe('user@example.com')
        expect(result.displayName).toBe('MVP User')
        expect(result.status).toBe('active')
        expect(typeof result.createdAt).toBe('string')
        expect(typeof result.updatedAt).toBe('string')
        // #endregion
      })

      it('createdAt・updatedAt が ISO 8601 形式であること', () => {
        // #region Given When - アカウントプロフィールを取得する
        const result = service.getAccount()
        // #endregion

        // #region Then - createdAt と updatedAt が ISO 8601 形式であること
        expect(() => new Date(result.createdAt).toISOString()).not.toThrow()
        expect(() => new Date(result.updatedAt).toISOString()).not.toThrow()
        // #endregion
      })
    })
  })

  describe('unsubscribe', () => {
    describe('正常系', () => {
      it('reason が指定されている場合、unsubscribed: true を返すこと', () => {
        // #region Given - 退会理由を含むリクエストを作成する
        const request = { reason: '  退会理由あり  ' }
        // #endregion

        // #region When - 退会処理を実行する
        const result = service.unsubscribe(request)
        // #endregion

        // #region Then - unsubscribed: true を返すこと
        expect(result).toEqual({ unsubscribed: true })
        // #endregion
      })

      it('reason が未指定の場合、unsubscribed: true を返すこと', () => {
        // #region Given - 退会理由を含まないリクエストを作成する
        const request = {}
        // #endregion

        // #region When - 退会処理を実行する
        const result = service.unsubscribe(request)
        // #endregion

        // #region Then - unsubscribed: true を返すこと
        expect(result).toEqual({ unsubscribed: true })
        // #endregion
      })
    })
  })
})
