import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from '../../shared/prisma/prisma.service'
import { EntityListResponseDto } from './dto/entity-list-response.dto'
import { EntityResponseDto, EntityRevisionDto } from './dto/entity-response.dto'
import { EntityRevisionsResponseDto } from './dto/entity-revisions-response.dto'
import { GetEntitiesQueryDto } from './dto/get-entities-query.dto'

type EntityRevisionRecord = {
  revisionNo: number
  name: string
  sport: string | null
  area: string | null
  profile: string | null
  reason: string | null
  createdAt: Date
}

type EntityRecord = {
  id: bigint
  entityCategory: string
  activeStatus: string
  currentRevisionNo: number
  createdAt: Date
  updatedAt: Date
  revisions: EntityRevisionRecord[]
}

/**
 * エンティティ関連のユースケースを提供するサービス。
 */
@Injectable()
export class EntitiesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * エンティティ一覧を取得する。
   * @param query - ページネーション・フィルター条件
   * @returns エンティティ一覧と総件数
   */
  async findAll(query: GetEntitiesQueryDto): Promise<EntityListResponseDto> {
    const { page = 1, limit = 20, category, activeStatus } = query
    const skip = (page - 1) * limit

    const where = {
      deletedAt: null,
      ...(category ? { entityCategory: category } : {}),
      ...(activeStatus ? { activeStatus } : {}),
    }

    const [entities, total] = await this.prisma.$transaction([
      this.prisma.entity.findMany({
        where,
        include: {
          revisions: {
            orderBy: { revisionNo: 'desc' },
            take: 1,
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      this.prisma.entity.count({ where }),
    ])

    return {
      items: entities.map((e) => this.toDto(e as EntityRecord)),
      total,
    }
  }

  /**
   * 指定IDのエンティティを取得する。
   * @param id - エンティティID
   * @returns エンティティ詳細
   * @throws NotFoundException 指定IDのエンティティが存在しない場合
   */
  async findOne(id: number): Promise<EntityResponseDto> {
    const entity = await this.prisma.entity.findFirst({
      where: { id, deletedAt: null },
      include: {
        revisions: {
          orderBy: { revisionNo: 'desc' },
          take: 1,
        },
      },
    })

    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`)
    }

    return this.toDto(entity as unknown as EntityRecord)
  }

  /**
   * 指定エンティティの改訂履歴を取得する。
   * @param id - エンティティID
   * @returns 改訂履歴一覧
   * @throws NotFoundException 指定IDのエンティティが存在しない場合
   */
  async findRevisions(id: number): Promise<EntityRevisionsResponseDto> {
    const entity = await this.prisma.entity.findFirst({
      where: { id, deletedAt: null },
    })

    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`)
    }

    const revisions = await this.prisma.entityRevision.findMany({
      where: { entityId: id },
      orderBy: { revisionNo: 'desc' },
    })

    return {
      revisions: revisions.map(this.toRevisionDto),
    }
  }

  /**
   * エンティティ改訂レコードをDTOに変換する。
   * @param revision - 改訂レコード
   * @returns 改訂DTO
   */
  private toRevisionDto(revision: EntityRevisionRecord): EntityRevisionDto {
    return {
      revisionNo: revision.revisionNo,
      name: revision.name,
      sport: revision.sport,
      area: revision.area,
      profile: revision.profile,
      reason: revision.reason,
      createdAt: revision.createdAt.toISOString(),
    }
  }

  /**
   * エンティティレコードをDTOに変換する。
   * @param entity - エンティティレコード
   * @returns エンティティDTO
   */
  private toDto(entity: EntityRecord): EntityResponseDto {
    const latest = entity.revisions[0]
    return {
      id: Number(entity.id),
      entityCategory: entity.entityCategory,
      activeStatus: entity.activeStatus,
      currentRevisionNo: entity.currentRevisionNo,
      currentRevision: this.toRevisionDto(latest),
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
    }
  }
}
