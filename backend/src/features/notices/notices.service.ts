import dayjs from 'dayjs'
import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from '@shared/prisma/prisma.service'
import { GetNoticesQueryDto } from './dto/get-notices-query.dto'
import { NoticeListResponseDto } from './dto/notice-list-response.dto'
import { NoticeResponseDto } from './dto/notice-response.dto'

type NoticeRecord = {
  id: bigint
  title: string
  body: string
  noticeType: string
  priority: string
  publishAt: Date
  unpublishAt: Date | null
  createdAt: Date
}

/**
 * お知らせ関連のユースケースを提供するサービス。
 */
@Injectable()
export class NoticesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * 公開中のお知らせ一覧を取得する。
   * @param query - ページネーション・フィルター条件
   * @returns お知らせ一覧と総件数
   */
  async findAll(query: GetNoticesQueryDto): Promise<NoticeListResponseDto> {
    const { page = 1, limit = 20, noticeType } = query
    const skip = (page - 1) * limit
    const now = dayjs().toDate()

    const where = {
      publishAt: { lte: now },
      OR: [{ unpublishAt: null }, { unpublishAt: { gt: now } }],
      ...(noticeType ? { noticeType } : {}),
    }

    const [items, total] = await this.prisma.$transaction([
      this.prisma.notice.findMany({
        where,
        orderBy: [{ priority: 'desc' }, { publishAt: 'desc' }],
        skip,
        take: limit,
      }),
      this.prisma.notice.count({ where }),
    ])

    return {
      items: items.map(this.toDto),
      total,
    }
  }

  /**
   * 指定IDのお知らせを取得する。
   * @param id - お知らせID
   * @returns お知らせ詳細
   * @throws NotFoundException 指定IDのお知らせが公開状態で存在しない場合
   */
  async findOne(id: number): Promise<NoticeResponseDto> {
    const now = dayjs().toDate()
    const notice = await this.prisma.notice.findFirst({
      where: {
        id,
        publishAt: { lte: now },
        OR: [{ unpublishAt: null }, { unpublishAt: { gt: now } }],
      },
    })

    if (!notice) {
      throw new NotFoundException(`Notice with id ${id} not found`)
    }

    return this.toDto(notice as NoticeRecord)
  }

  /**
   * お知らせレコードをDTOに変換する。
   * @param notice - お知らせレコード
   * @returns お知らせDTO
   */
  private toDto(notice: NoticeRecord): NoticeResponseDto {
    return {
      id: Number(notice.id),
      title: notice.title,
      body: notice.body,
      noticeType: notice.noticeType,
      priority: notice.priority,
      publishAt: notice.publishAt.toISOString(),
      unpublishAt: notice.unpublishAt?.toISOString() ?? null,
      createdAt: notice.createdAt.toISOString(),
    }
  }
}
