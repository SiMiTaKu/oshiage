import { INestApplication, NotFoundException, ValidationPipe, VersioningType } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { NoticesModule } from '../../../../src/features/notices/notices.module'
import { NoticesService } from '../../../../src/features/notices/notices.service'

const mockNoticesService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
}

const makeNoticeDto = (override = {}) => ({
  id: 1,
  title: 'テストお知らせ',
  body: '本文',
  noticeType: 'specChange',
  priority: 'medium',
  publishAt: '2026-01-01T00:00:00.000Z',
  unpublishAt: null,
  createdAt: '2026-01-01T00:00:00.000Z',
  ...override,
})

describe('NoticesController (integration)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [NoticesModule],
    })
      .overrideProvider(NoticesService)
      .useValue(mockNoticesService)
      .compile()

    app = module.createNestApplication()
    app.setGlobalPrefix('api')
    app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' })
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  // #region GET /api/v1/notices
  describe('GET /api/v1/notices', () => {
    describe('正常系', () => {
      it('200 とお知らせ一覧を返すこと', async () => {
        // Given
        mockNoticesService.findAll.mockResolvedValue({ items: [makeNoticeDto()], total: 1 })

        // When
        const res = await request(app.getHttpServer()).get('/api/v1/notices').expect(200)

        // Then
        expect(res.body.total).toBe(1)
        expect(res.body.items[0].title).toBe('テストお知らせ')
      })

      it('noticeType クエリがサービスに渡されること', async () => {
        // Given
        mockNoticesService.findAll.mockResolvedValue({ items: [], total: 0 })

        // When
        await request(app.getHttpServer()).get('/api/v1/notices?noticeType=maintenance').expect(200)

        // Then
        expect(mockNoticesService.findAll).toHaveBeenCalledWith(
          expect.objectContaining({ noticeType: 'maintenance' }),
        )
      })
    })

    describe('境界値', () => {
      it('page=0 は 400 を返すこと', async () => {
        await request(app.getHttpServer()).get('/api/v1/notices?page=0').expect(400)
      })

      it('limit=101 は 400 を返すこと', async () => {
        await request(app.getHttpServer()).get('/api/v1/notices?limit=101').expect(400)
      })
    })
  })
  // #endregion

  // #region GET /api/v1/notices/:id
  describe('GET /api/v1/notices/:id', () => {
    describe('正常系', () => {
      it('200 と指定 ID のお知らせを返すこと', async () => {
        // Given
        mockNoticesService.findOne.mockResolvedValue(makeNoticeDto({ id: 5 }))

        // When
        const res = await request(app.getHttpServer()).get('/api/v1/notices/5').expect(200)

        // Then
        expect(res.body.id).toBe(5)
      })
    })

    describe('異常系', () => {
      it('存在しない ID の場合、404 を返すこと', async () => {
        // Given
        mockNoticesService.findOne.mockRejectedValue(new NotFoundException())

        // When / Then
        await request(app.getHttpServer()).get('/api/v1/notices/999').expect(404)
      })

      it('id が数値でない場合、400 を返すこと', async () => {
        await request(app.getHttpServer()).get('/api/v1/notices/abc').expect(400)
      })
    })
  })
  // #endregion
})
