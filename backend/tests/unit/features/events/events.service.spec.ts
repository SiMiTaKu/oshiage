import { NotFoundException } from '@nestjs/common'
import { EventsService } from '../../../../src/features/events/events.service'

const makeEvent = (
  override: Partial<{
    id: bigint
    title: string
    eventType: string
    startAt: Date
    endAt: Date | null
    place: string
    fee: unknown
    description: string | null
    createdAt: Date
    updatedAt: Date
  }> = {},
) => ({
  id: BigInt(1),
  title: 'テストイベント',
  eventType: 'competition',
  startAt: new Date('2026-06-01T10:00:00Z'),
  endAt: new Date('2026-06-01T18:00:00Z'),
  place: '東京体育館',
  fee: BigInt(1000),
  description: 'イベント説明',
  createdAt: new Date('2026-01-01T00:00:00Z'),
  updatedAt: new Date('2026-01-01T00:00:00Z'),
  ...override,
})

const makePrismaMock = (overrides: Record<string, unknown> = {}) => ({
  $transaction: jest.fn(),
  event: {
    findMany: jest.fn(),
    count: jest.fn(),
    findFirst: jest.fn(),
  },
  ...overrides,
})

describe('EventsService', () => {
  let service: EventsService
  let prismaMock: ReturnType<typeof makePrismaMock>

  beforeEach(() => {
    prismaMock = makePrismaMock()
    service = new EventsService(prismaMock as never)
  })

  // #region findAll
  describe('findAll', () => {
    describe('正常系', () => {
      it('ページネーションが適用されたイベント一覧を返すこと', async () => {
        // Given
        const events = [makeEvent()]
        prismaMock.$transaction.mockResolvedValue([events, 1])

        // When
        const result = await service.findAll({ page: 1, limit: 20 })

        // Then
        expect(result.total).toBe(1)
        expect(result.items).toHaveLength(1)
        expect(result.items[0].id).toBe(1)
        expect(result.items[0].title).toBe('テストイベント')
      })

      it('eventType フィルタが where 条件に渡されること', async () => {
        // Given
        prismaMock.$transaction.mockResolvedValue([[], 0])

        // When
        await service.findAll({ page: 1, limit: 20, eventType: 'competition' })

        // Then
        expect(prismaMock.$transaction).toHaveBeenCalledTimes(1)
      })

      it('page=2 の場合に skip=20 が計算されること', async () => {
        // Given
        prismaMock.$transaction.mockResolvedValue([[], 0])
        const findManySpy = jest.fn().mockResolvedValue([])
        const countSpy = jest.fn().mockResolvedValue(0)
        prismaMock.$transaction.mockImplementation((fns: Array<Promise<unknown>>) =>
          Promise.all(fns),
        )
        prismaMock.event.findMany.mockResolvedValue([])
        prismaMock.event.count.mockResolvedValue(0)
        service = new EventsService(prismaMock as never)

        // When
        await service.findAll({ page: 2, limit: 20 })

        // Then
        expect(prismaMock.event.findMany).toHaveBeenCalledWith(
          expect.objectContaining({ skip: 20, take: 20 }),
        )
      })

      it('イベントが 0 件の場合、空配列と total=0 を返すこと', async () => {
        // Given
        prismaMock.$transaction.mockResolvedValue([[], 0])

        // When
        const result = await service.findAll({})

        // Then
        expect(result.items).toHaveLength(0)
        expect(result.total).toBe(0)
      })
    })
  })
  // #endregion

  // #region findOne
  describe('findOne', () => {
    describe('正常系', () => {
      it('指定 ID のイベントを返すこと', async () => {
        // Given
        const event = makeEvent({ id: BigInt(42) })
        prismaMock.event.findFirst.mockResolvedValue(event)

        // When
        const result = await service.findOne(42)

        // Then
        expect(result.id).toBe(42)
        expect(result.title).toBe('テストイベント')
      })

      it('endAt が null の場合、DTO の endAt が null であること', async () => {
        // Given
        const event = makeEvent({ endAt: null })
        prismaMock.event.findFirst.mockResolvedValue(event)

        // When
        const result = await service.findOne(1)

        // Then
        expect(result.endAt).toBeNull()
      })

      it('fee が null の場合、DTO の fee が null であること', async () => {
        // Given
        const event = makeEvent({ fee: null })
        prismaMock.event.findFirst.mockResolvedValue(event)

        // When
        const result = await service.findOne(1)

        // Then
        expect(result.fee).toBeNull()
      })

      it('startAt が ISO 8601 文字列に変換されること', async () => {
        // Given
        const event = makeEvent({ startAt: new Date('2026-06-01T10:00:00Z') })
        prismaMock.event.findFirst.mockResolvedValue(event)

        // When
        const result = await service.findOne(1)

        // Then
        expect(result.startAt).toBe('2026-06-01T10:00:00.000Z')
      })
    })

    describe('異常系', () => {
      it('イベントが存在しない場合、NotFoundException をスローすること', async () => {
        // Given
        prismaMock.event.findFirst.mockResolvedValue(null)

        // When / Then
        await expect(service.findOne(999)).rejects.toThrow(NotFoundException)
      })
    })
  })
  // #endregion
})
