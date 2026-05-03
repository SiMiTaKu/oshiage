import { Controller, Get, Param, ParseIntPipe, Query, Version } from '@nestjs/common'
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger'

import { GetNoticesQueryDto } from './dto/get-notices-query.dto'
import { NoticeListResponseDto } from './dto/notice-list-response.dto'
import { NoticeResponseDto } from './dto/notice-response.dto'
import { NoticesService } from './notices.service'

/**
 * お知らせ関連の API を提供するコントローラー。
 */
@ApiTags('notices')
@Controller('notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  /**
   * 条件を指定して公開中お知らせ一覧を返す。
   *
   * @param query - 一覧取得クエリ
   * @returns お知らせ一覧レスポンス
   */
  @Get()
  @Version('1')
  @ApiOperation({ summary: '公開中のお知らせ一覧を取得する' })
  @ApiOkResponse({ type: NoticeListResponseDto })
  findAll(@Query() query: GetNoticesQueryDto): Promise<NoticeListResponseDto> {
    return this.noticesService.findAll(query)
  }

  /**
   * 指定IDのお知らせ詳細を返す。
   *
   * @param id - お知らせID
   * @returns お知らせ詳細レスポンス
   */
  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'IDでお知らせ詳細を取得する' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: NoticeResponseDto })
  @ApiNotFoundResponse({ description: '指定したお知らせが見つかりません' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<NoticeResponseDto> {
    return this.noticesService.findOne(id)
  }
}
