import { NotFoundException } from '@nestjs/common'
import { NoticesService } from '../../../../src/features/notices/notices.service'

const makeNotice = (
  override: Partial<{
    id: bigint
    title: string
    body: string
    noticeType: string
    priority: string
    publishAt: Date
    unpublishAt: Date | null
    createdAt: Date
  }> = {},
) => ({
  id: BigInt(1),
  title: 'テストお知らせ',
  body: '本文テキスト',
  noticeType: 'specChange',
  priority: 'medium',
  publishAt: new Date('2026-01-01T00:00:00Z'),
  unpublishAt: null,
  createdAt: new Date('2026-01-01T00:00:00Z'),
  ...override,
})

const makePrismaMock = () => ({
  $transaction: jest.fn(),
  notice: {
    findMany: jest.fn(),
    count: jest.fn(),
    findFirst: jest.fn(),
  },
})

describe('NoticesService', () => {
  let service: NoticesService
  let prismaMock: ReturnType<typeof makePrismaMock>

  beforeEach(() => {
    prismaMock = makePrismaMock()
    service = new NoticesService(prismaMock as never)
  })

  // #region findAll
  describe('findAll', () => {
    describe('正常系', () => {
      it('公開中のお知らせ一覧と total を返すこと', async () => {
        // Given
        const notices = [makeNotice()]
        prismaMock.$transaction.mockResolvedValue([notices, 1])

        // When
        const result = await service.findAll({ page: 1, limit: 20 })

        // Then
        expect(result.total).toBe(1)
        expect(result.items).toHaveLength(1)
        expect(result.items[0].id).toBe(1)
        expect(result.items[0].title).toBe('テストお知らせ')
      })

      it('お知らせが 0 件の場合、空配列と total=0 を返すこと', async () => {
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
        prismaMock.notice.findMany.mockResolvedValue([])
        prismaMock.notice.count.mockResolvedValue(0)
        service = new NoticesService(prismaMock as never)

        // When
        await service.findAll({ page: 2, limit: 20 })

        // Then
        expect(prismaMock.notice.findMany).toHaveBeenCalledWith(
          expect.objectContaining({ skip: 20, take: 20 }),
        )
      })
    })
  })
  // #endregion

  // #region findOne
  describe('findOne', () => {
    describe('正常系', () => {
      it('指定 ID のお知らせを返すこと', async () => {
        // Given
        const notice = makeNotice({ id: BigInt(7) })
        prismaMock.notice.findFirst.mockResolvedValue(notice)

        // When
        const result = await service.findOne(7)

        // Then
        expect(result.id).toBe(7)
        expect(result.title).toBe('テストお知らせ')
      })

      it('unpublishAt が null の場合、DTO の unpublishAt が null であること', async () => {
        // Given
        prismaMock.notice.findFirst.mockResolvedValue(makeNotice({ unpublishAt: null }))

        // When
        const result = await service.findOne(1)

        // Then
        expect(result.unpublishAt).toBeNull()
      })

      it('unpublishAt が日付の場合、ISO 8601 文字列に変換されること', async () => {
        // Given
        prismaMock.notice.findFirst.mockResolvedValue(
          makeNotice({ unpublishAt: new Date('2026-12-31T23:59:59Z') }),
        )

        // When
        const result = await service.findOne(1)

        // Then
        expect(result.unpublishAt).toBe('2026-12-31T23:59:59.000Z')
      })

      it('publishAt が ISO 8601 文字列に変換されること', async () => {
        // Given
        prismaMock.notice.findFirst.mockResolvedValue(
          makeNotice({ publishAt: new Date('2026-03-01T09:00:00Z') }),
        )

        // When
        const result = await service.findOne(1)

        // Then
        expect(result.publishAt).toBe('2026-03-01T09:00:00.000Z')
      })
    })

    describe('異常系', () => {
      it('公開済みお知らせが存在しない場合、NotFoundException をスローすること', async () => {
        // Given
        prismaMock.notice.findFirst.mockResolvedValue(null)

        // When / Then
        await expect(service.findOne(999)).rejects.toThrow(NotFoundException)
      })
    })
  })
  // #endregion
})
