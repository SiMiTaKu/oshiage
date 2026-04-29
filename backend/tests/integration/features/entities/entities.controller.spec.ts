import { INestApplication, NotFoundException, ValidationPipe, VersioningType } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { EntitiesModule } from '../../../../src/features/entities/entities.module'
import { EntitiesService } from '../../../../src/features/entities/entities.service'

const mockEntitiesService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  findRevisions: jest.fn(),
}

const makeEntityDto = (override = {}) => ({
  id: 1,
  entityCategory: 'individual',
  activeStatus: 'active',
  currentRevisionNo: 1,
  currentRevision: {
    revisionNo: 1,
    name: 'テスト選手',
    sport: '男子新体操',
    area: '東京',
    profile: null,
    reason: null,
    createdAt: '2026-01-01T00:00:00.000Z',
  },
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
  ...override,
})

describe('EntitiesController (integration)', () => {
  let app: INestApplication

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [EntitiesModule],
    })
      .overrideProvider(EntitiesService)
      .useValue(mockEntitiesService)
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

  // #region GET /api/v1/entities
  describe('GET /api/v1/entities', () => {
    describe('正常系', () => {
      it('200 とエンティティ一覧を返すこと', async () => {
        // Given
        mockEntitiesService.findAll.mockResolvedValue({ items: [makeEntityDto()], total: 1 })

        // When
        const res = await request(app.getHttpServer()).get('/api/v1/entities').expect(200)

        // Then
        expect(res.body.total).toBe(1)
        expect(res.body.items[0].entityCategory).toBe('individual')
      })

      it('category クエリがサービスに渡されること', async () => {
        // Given
        mockEntitiesService.findAll.mockResolvedValue({ items: [], total: 0 })

        // When
        await request(app.getHttpServer()).get('/api/v1/entities?category=group').expect(200)

        // Then
        expect(mockEntitiesService.findAll).toHaveBeenCalledWith(
          expect.objectContaining({ category: 'group' }),
        )
      })

      it('activeStatus クエリがサービスに渡されること', async () => {
        // Given
        mockEntitiesService.findAll.mockResolvedValue({ items: [], total: 0 })

        // When
        await request(app.getHttpServer()).get('/api/v1/entities?status=active').expect(200)
      })
    })

    describe('境界値', () => {
      it('page=0 は 400 を返すこと', async () => {
        await request(app.getHttpServer()).get('/api/v1/entities?page=0').expect(400)
      })

      it('limit=101 は 400 を返すこと', async () => {
        await request(app.getHttpServer()).get('/api/v1/entities?limit=101').expect(400)
      })
    })
  })
  // #endregion

  // #region GET /api/v1/entities/:id
  describe('GET /api/v1/entities/:id', () => {
    describe('正常系', () => {
      it('200 と指定 ID のエンティティを返すこと', async () => {
        // Given
        mockEntitiesService.findOne.mockResolvedValue(makeEntityDto({ id: 3 }))

        // When
        const res = await request(app.getHttpServer()).get('/api/v1/entities/3').expect(200)

        // Then
        expect(res.body.id).toBe(3)
      })
    })

    describe('異常系', () => {
      it('存在しない ID の場合、404 を返すこと', async () => {
        // Given
        mockEntitiesService.findOne.mockRejectedValue(new NotFoundException())

        // When / Then
        await request(app.getHttpServer()).get('/api/v1/entities/999').expect(404)
      })

      it('id が数値でない場合、400 を返すこと', async () => {
        await request(app.getHttpServer()).get('/api/v1/entities/abc').expect(400)
      })
    })
  })
  // #endregion

  // #region GET /api/v1/entities/:id/revisions
  describe('GET /api/v1/entities/:id/revisions', () => {
    describe('正常系', () => {
      it('200 とリビジョン一覧を返すこと', async () => {
        // Given
        mockEntitiesService.findRevisions.mockResolvedValue({
          revisions: [
            {
              revisionNo: 2,
              name: 'テスト選手B',
              sport: null,
              area: null,
              profile: null,
              reason: '改名',
              createdAt: '2026-02-01T00:00:00.000Z',
            },
            {
              revisionNo: 1,
              name: 'テスト選手A',
              sport: null,
              area: null,
              profile: null,
              reason: null,
              createdAt: '2026-01-01T00:00:00.000Z',
            },
          ],
        })

        // When
        const res = await request(app.getHttpServer())
          .get('/api/v1/entities/1/revisions')
          .expect(200)

        // Then
        expect(res.body.revisions).toHaveLength(2)
        expect(res.body.revisions[0].revisionNo).toBe(2)
      })
    })

    describe('異常系', () => {
      it('存在しない Entity ID の場合、404 を返すこと', async () => {
        // Given
        mockEntitiesService.findRevisions.mockRejectedValue(new NotFoundException())

        // When / Then
        await request(app.getHttpServer()).get('/api/v1/entities/999/revisions').expect(404)
      })
    })
  })
  // #endregion
})
