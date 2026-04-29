import { NotFoundException } from '@nestjs/common'
import { EntitiesService } from '../../../../src/features/entities/entities.service'

const makeRevision = (
  override: Partial<{
    revisionNo: number
    name: string
    sport: string | null
    area: string | null
    profile: string | null
    reason: string | null
    createdAt: Date
  }> = {},
) => ({
  revisionNo: 1,
  name: 'テスト選手',
  sport: '男子新体操',
  area: '東京',
  profile: 'プロフィールテキスト',
  reason: null,
  createdAt: new Date('2026-01-01T00:00:00Z'),
  ...override,
})

const makeEntity = (
  override: Partial<{
    id: bigint
    entityCategory: string
    activeStatus: string
    currentRevisionNo: number
    createdAt: Date
    updatedAt: Date
    revisions: ReturnType<typeof makeRevision>[]
  }> = {},
) => ({
  id: BigInt(1),
  entityCategory: 'individual',
  activeStatus: 'active',
  currentRevisionNo: 1,
  createdAt: new Date('2026-01-01T00:00:00Z'),
  updatedAt: new Date('2026-01-01T00:00:00Z'),
  revisions: [makeRevision()],
  ...override,
})

const makePrismaMock = () => ({
  $transaction: jest.fn(),
  entity: {
    findMany: jest.fn(),
    count: jest.fn(),
    findFirst: jest.fn(),
  },
  entityRevision: {
    findMany: jest.fn(),
  },
})

describe('EntitiesService', () => {
  let service: EntitiesService
  let prismaMock: ReturnType<typeof makePrismaMock>

  beforeEach(() => {
    prismaMock = makePrismaMock()
    service = new EntitiesService(prismaMock as never)
  })

  // #region findAll
  describe('findAll', () => {
    describe('正常系', () => {
      it('エンティティ一覧と total を返すこと', async () => {
        // Given
        const entities = [makeEntity()]
        prismaMock.$transaction.mockResolvedValue([entities, 1])

        // When
        const result = await service.findAll({ page: 1, limit: 20 })

        // Then
        expect(result.total).toBe(1)
        expect(result.items).toHaveLength(1)
        expect(result.items[0].id).toBe(1)
        expect(result.items[0].entityCategory).toBe('individual')
      })

      it('エンティティが 0 件の場合、空配列と total=0 を返すこと', async () => {
        // Given
        prismaMock.$transaction.mockResolvedValue([[], 0])

        // When
        const result = await service.findAll({})

        // Then
        expect(result.items).toHaveLength(0)
        expect(result.total).toBe(0)
      })

      it('page=2 の場合に skip=20 が計算されること', async () => {
        // Given
        prismaMock.$transaction.mockImplementation((fns: Array<Promise<unknown>>) =>
          Promise.all(fns),
        )
        prismaMock.entity.findMany.mockResolvedValue([])
        prismaMock.entity.count.mockResolvedValue(0)
        service = new EntitiesService(prismaMock as never)

        // When
        await service.findAll({ page: 2, limit: 20 })

        // Then
        expect(prismaMock.entity.findMany).toHaveBeenCalledWith(
          expect.objectContaining({ skip: 20, take: 20 }),
        )
      })
    })
  })
  // #endregion

  // #region findOne
  describe('findOne', () => {
    describe('正常系', () => {
      it('指定 ID のエンティティを返すこと', async () => {
        // Given
        prismaMock.entity.findFirst.mockResolvedValue(makeEntity({ id: BigInt(5) }))

        // When
        const result = await service.findOne(5)

        // Then
        expect(result.id).toBe(5)
        expect(result.currentRevision.name).toBe('テスト選手')
      })

      it('revision の sport・area が null の場合、DTO にも null が含まれること', async () => {
        // Given
        const entity = makeEntity({
          revisions: [makeRevision({ sport: null, area: null })],
        })
        prismaMock.entity.findFirst.mockResolvedValue(entity)

        // When
        const result = await service.findOne(1)

        // Then
        expect(result.currentRevision.sport).toBeNull()
        expect(result.currentRevision.area).toBeNull()
      })
    })

    describe('異常系', () => {
      it('エンティティが存在しない場合、NotFoundException をスローすること', async () => {
        // Given
        prismaMock.entity.findFirst.mockResolvedValue(null)

        // When / Then
        await expect(service.findOne(999)).rejects.toThrow(NotFoundException)
      })
    })
  })
  // #endregion

  // #region findRevisions
  describe('findRevisions', () => {
    describe('正常系', () => {
      it('リビジョン履歴を返すこと', async () => {
        // Given
        prismaMock.entity.findFirst.mockResolvedValue(makeEntity())
        prismaMock.entityRevision.findMany.mockResolvedValue([
          makeRevision({ revisionNo: 2, reason: '名前変更' }),
          makeRevision({ revisionNo: 1 }),
        ])

        // When
        const result = await service.findRevisions(1)

        // Then
        expect(result.revisions).toHaveLength(2)
        expect(result.revisions[0].revisionNo).toBe(2)
        expect(result.revisions[0].reason).toBe('名前変更')
      })

      it('createdAt が ISO 8601 文字列に変換されること', async () => {
        // Given
        prismaMock.entity.findFirst.mockResolvedValue(makeEntity())
        prismaMock.entityRevision.findMany.mockResolvedValue([
          makeRevision({ createdAt: new Date('2026-03-15T09:00:00Z') }),
        ])

        // When
        const result = await service.findRevisions(1)

        // Then
        expect(result.revisions[0].createdAt).toBe('2026-03-15T09:00:00.000Z')
      })
    })

    describe('異常系', () => {
      it('エンティティが存在しない場合、NotFoundException をスローすること', async () => {
        // Given
        prismaMock.entity.findFirst.mockResolvedValue(null)

        // When / Then
        await expect(service.findRevisions(999)).rejects.toThrow(NotFoundException)
      })
    })
  })
  // #endregion
})
