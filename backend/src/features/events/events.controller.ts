import { Controller, Get, Param, ParseIntPipe, Query, Version } from '@nestjs/common'
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger'

import { EventListResponseDto } from './dto/event-list-response.dto'
import { EventResponseDto } from './dto/event-response.dto'
import { GetEventsQueryDto } from './dto/get-events-query.dto'
import { EventsService } from './events.service'

/**
 * イベント関連の API を提供するコントローラー。
 */
@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  /**
   * 条件を指定してイベント一覧を返す。
   *
   * @param query - 一覧取得クエリ
   * @returns イベント一覧レスポンス
   */
  @Get()
  @Version('1')
  @ApiOperation({ summary: 'イベント一覧を取得する' })
  @ApiOkResponse({ type: EventListResponseDto })
  findAll(@Query() query: GetEventsQueryDto): Promise<EventListResponseDto> {
    return this.eventsService.findAll(query)
  }

  /**
   * 指定IDのイベント詳細を返す。
   *
   * @param id - イベントID
   * @returns イベント詳細レスポンス
   */
  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'IDでイベント詳細を取得する' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: EventResponseDto })
  @ApiNotFoundResponse({ description: '指定したイベントが見つかりません' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<EventResponseDto> {
    return this.eventsService.findOne(id)
  }
}
