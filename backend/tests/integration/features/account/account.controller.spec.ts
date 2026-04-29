import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { AccountModule } from '../../../../src/features/account/account.module'

describe('AccountController (integration)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AccountModule],
    }).compile()

    app = module.createNestApplication()
    app.setGlobalPrefix('api')
    app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' })
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  // #region POST /api/v1/account/bootstrap
  describe('POST /api/v1/account/bootstrap', () => {
    describe('正常系', () => {
      it('201 とブートストラップレスポンスを返すこと', async () => {
        // Given / When
        const res = await request(app.getHttpServer()).post('/api/v1/account/bootstrap').expect(201)

        // Then
        expect(res.body).toMatchObject({
          created: false,
          cognitoSub: 'placeholder-sub',
          userId: 1,
        })
      })
    })
  })
  // #endregion

  // #region GET /api/v1/account
  describe('GET /api/v1/account', () => {
    describe('正常系', () => {
      it('200 とアカウントプロフィールを返すこと', async () => {
        // Given / When
        const res = await request(app.getHttpServer()).get('/api/v1/account').expect(200)

        // Then
        expect(res.body).toMatchObject({
          userId: 1,
          email: 'user@example.com',
          status: 'active',
        })
        expect(typeof res.body.createdAt).toBe('string')
      })
    })
  })
  // #endregion

  // #region POST /api/v1/account/unsubscribe
  describe('POST /api/v1/account/unsubscribe', () => {
    describe('正常系', () => {
      it('reason ありで 200 と unsubscribed: true を返すこと', async () => {
        // Given
        const body = { reason: '利用しなくなった' }

        // When
        const res = await request(app.getHttpServer())
          .post('/api/v1/account/unsubscribe')
          .send(body)
          .expect(200)

        // Then
        expect(res.body).toEqual({ unsubscribed: true })
      })

      it('reason なしでも 200 と unsubscribed: true を返すこと', async () => {
        // Given / When
        const res = await request(app.getHttpServer())
          .post('/api/v1/account/unsubscribe')
          .send({})
          .expect(200)

        // Then
        expect(res.body).toEqual({ unsubscribed: true })
      })
    })
  })
  // #endregion
})
