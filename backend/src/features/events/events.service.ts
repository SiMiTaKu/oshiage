import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from '../../shared/prisma/prisma.service'
import { EventListResponseDto } from './dto/event-list-response.dto'
import { EventResponseDto } from './dto/event-response.dto'
import { GetEventsQueryDto } from './dto/get-events-query.dto'

/**
 * イベント関連のユースケースを提供するサービス。
 */
@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: GetEventsQueryDto): Promise<EventListResponseDto> {
    const { page = 1, limit = 20, eventType } = query
    const skip = (page - 1) * limit

    const where = {
      deletedAt: null,
      ...(eventType ? { eventType } : {}),
    }

    const [items, total] = await this.prisma.$transaction([
      this.prisma.event.findMany({
        where,
        orderBy: { startAt: 'asc' },
        skip,
        take: limit,
      }),
      this.prisma.event.count({ where }),
    ])

    return {
      items: items.map(this.toDto),
      total,
    }
  }

  async findOne(id: number): Promise<EventResponseDto> {
    const event = await this.prisma.event.findFirst({
      where: { id, deletedAt: null },
    })

    if (!event) {
      throw new NotFoundException(`Event with id ${id} not found`)
    }

    return this.toDto(event)
  }

  private toDto(event: {
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
  }): EventResponseDto {
    return {
      id: Number(event.id),
      title: event.title,
      eventType: event.eventType,
      startAt: event.startAt.toISOString(),
      endAt: event.endAt?.toISOString() ?? null,
      place: event.place,
      fee: event.fee != null ? Number(event.fee) : null,
      description: event.description,
      createdAt: event.createdAt.toISOString(),
      updatedAt: event.updatedAt.toISOString(),
    }
  }
}
