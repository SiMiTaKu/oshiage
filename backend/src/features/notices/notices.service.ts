import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from '../../shared/prisma/prisma.service'
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

@Injectable()
export class NoticesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: GetNoticesQueryDto): Promise<NoticeListResponseDto> {
    const { page = 1, limit = 20, noticeType } = query
    const skip = (page - 1) * limit
    const now = new Date()

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

  async findOne(id: number): Promise<NoticeResponseDto> {
    const now = new Date()
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
