import { INestApplication, NotFoundException, ValidationPipe, VersioningType } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { EventsModule } from '../../../../src/features/events/events.module'
import { EventsService } from '../../../../src/features/events/events.service'

const mockEventsService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
}

describe('EventsController (integration)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [EventsModule],
    })
      .overrideProvider(EventsService)
      .useValue(mockEventsService)
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

  // #region GET /api/v1/events
  describe('GET /api/v1/events', () => {
    describe('正常系', () => {
      it('200 とイベント一覧を返すこと', async () => {
        // Given
        const payload = {
          items: [
            {
              id: 1,
              title: 'イベントA',
              eventType: 'competition',
              startAt: '2026-06-01T10:00:00.000Z',
              place: '東京',
              createdAt: '2026-01-01T00:00:00.000Z',
              updatedAt: '2026-01-01T00:00:00.000Z',
            },
          ],
          total: 1,
        }
        mockEventsService.findAll.mockResolvedValue(payload)

        // When
        const res = await request(app.getHttpServer()).get('/api/v1/events').expect(200)

        // Then
        expect(res.body.total).toBe(1)
        expect(res.body.items[0].title).toBe('イベントA')
      })

      it('クエリパラメータがサービスに渡されること', async () => {
        // Given
        mockEventsService.findAll.mockResolvedValue({ items: [], total: 0 })

        // When
        await request(app.getHttpServer())
          .get('/api/v1/events?page=2&limit=10&eventType=practice')
          .expect(200)

        // Then
        expect(mockEventsService.findAll).toHaveBeenCalledWith(
          expect.objectContaining({ page: 2, limit: 10, eventType: 'practice' }),
        )
      })
    })

    describe('境界値', () => {
      it('page に 0 を渡すと 400 を返すこと', async () => {
        // Given / When / Then
        await request(app.getHttpServer()).get('/api/v1/events?page=0').expect(400)
      })

      it('limit に 101 を渡すと 400 を返すこと', async () => {
        // Given / When / Then
        await request(app.getHttpServer()).get('/api/v1/events?limit=101').expect(400)
      })
    })
  })
  // #endregion

  // #region GET /api/v1/events/:id
  describe('GET /api/v1/events/:id', () => {
    describe('正常系', () => {
      it('200 と指定 ID のイベントを返すこと', async () => {
        // Given
        const event = {
          id: 1,
          title: 'イベントA',
          eventType: 'competition',
          startAt: '2026-06-01T10:00:00.000Z',
          place: '東京',
          createdAt: '2026-01-01T00:00:00.000Z',
          updatedAt: '2026-01-01T00:00:00.000Z',
        }
        mockEventsService.findOne.mockResolvedValue(event)

        // When
        const res = await request(app.getHttpServer()).get('/api/v1/events/1').expect(200)

        // Then
        expect(res.body.id).toBe(1)
      })
    })

    describe('異常系', () => {
      it('存在しない ID の場合、404 を返すこと', async () => {
        // Given
        mockEventsService.findOne.mockRejectedValue(new NotFoundException())

        // When / Then
        await request(app.getHttpServer()).get('/api/v1/events/999').expect(404)
      })

      it('id が数値でない場合、400 を返すこと', async () => {
        // Given / When / Then
        await request(app.getHttpServer()).get('/api/v1/events/abc').expect(400)
      })
    })
  })
  // #endregion
})
