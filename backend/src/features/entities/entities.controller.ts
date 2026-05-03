import { Controller, Get, Param, ParseIntPipe, Query, Version } from '@nestjs/common'
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger'

import { EntityListResponseDto } from './dto/entity-list-response.dto'
import { EntityResponseDto } from './dto/entity-response.dto'
import { EntityRevisionsResponseDto } from './dto/entity-revisions-response.dto'
import { GetEntitiesQueryDto } from './dto/get-entities-query.dto'
import { EntitiesService } from './entities.service'

/**
 * エンティティ関連の API を提供するコントローラー。
 */
@ApiTags('entities')
@Controller('entities')
export class EntitiesController {
  constructor(private readonly entitiesService: EntitiesService) {}

  /**
   * 条件を指定してエンティティ一覧を返す。
   *
   * @param query - 一覧取得クエリ
   * @returns エンティティ一覧レスポンス
   */
  @Get()
  @Version('1')
  @ApiOperation({ summary: 'エンティティ一覧を取得する' })
  @ApiOkResponse({ type: EntityListResponseDto })
  findAll(@Query() query: GetEntitiesQueryDto): Promise<EntityListResponseDto> {
    return this.entitiesService.findAll(query)
  }

  /**
   * 指定IDのエンティティ詳細を返す。
   *
   * @param id - エンティティID
   * @returns エンティティ詳細レスポンス
   */
  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'IDでエンティティ詳細を取得する' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: EntityResponseDto })
  @ApiNotFoundResponse({ description: '指定したエンティティが見つかりません' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<EntityResponseDto> {
    return this.entitiesService.findOne(id)
  }

  /**
   * 指定IDの改訂履歴を返す。
   *
   * @param id - エンティティID
   * @returns 改訂履歴レスポンス
   */
  @Get(':id/revisions')
  @Version('1')
  @ApiOperation({ summary: 'エンティティの改訂履歴を取得する' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: EntityRevisionsResponseDto })
  @ApiNotFoundResponse({ description: '指定したエンティティが見つかりません' })
  findRevisions(@Param('id', ParseIntPipe) id: number): Promise<EntityRevisionsResponseDto> {
    return this.entitiesService.findRevisions(id)
  }
}
