import { AccountService } from '../../../../src/features/account/services/account.service'

describe('AccountService', () => {
  let service: AccountService

  beforeEach(() => {
    service = new AccountService()
  })

  // #region bootstrap
  describe('bootstrap', () => {
    describe('正常系', () => {
      it('固定のブートストラップレスポンスを返すこと', () => {
        // Given: サービスが初期化済み
        // When
        const result = service.bootstrap()

        // Then
        expect(result).toEqual({
          created: false,
          cognitoSub: 'placeholder-sub',
          userId: 1,
        })
      })
    })
  })
  // #endregion

  // #region getAccount
  describe('getAccount', () => {
    describe('正常系', () => {
      it('アカウントプロフィールを返すこと', () => {
        // Given
        // When
        const result = service.getAccount()

        // Then
        expect(result.userId).toBe(1)
        expect(result.email).toBe('user@example.com')
        expect(result.displayName).toBe('MVP User')
        expect(result.status).toBe('active')
        expect(typeof result.createdAt).toBe('string')
        expect(typeof result.updatedAt).toBe('string')
      })

      it('createdAt・updatedAt が ISO 8601 形式であること', () => {
        // Given
        // When
        const result = service.getAccount()

        // Then
        expect(() => new Date(result.createdAt).toISOString()).not.toThrow()
        expect(() => new Date(result.updatedAt).toISOString()).not.toThrow()
      })
    })
  })
  // #endregion

  // #region unsubscribe
  describe('unsubscribe', () => {
    describe('正常系', () => {
      it('reason が指定されている場合、unsubscribed: true を返すこと', () => {
        // Given
        const request = { reason: '  退会理由あり  ' }

        // When
        const result = service.unsubscribe(request)

        // Then
        expect(result).toEqual({ unsubscribed: true })
      })

      it('reason が未指定の場合、unsubscribed: true を返すこと', () => {
        // Given
        const request = {}

        // When
        const result = service.unsubscribe(request)

        // Then
        expect(result).toEqual({ unsubscribed: true })
      })
    })
  })
  // #endregion
})
