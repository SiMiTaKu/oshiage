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

@ApiTags('notices')
@Controller('notices')
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get a list of published notices.' })
  @ApiOkResponse({ type: NoticeListResponseDto })
  findAll(@Query() query: GetNoticesQueryDto): Promise<NoticeListResponseDto> {
    return this.noticesService.findAll(query)
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get a notice by id.' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: NoticeResponseDto })
  @ApiNotFoundResponse({ description: 'Notice not found.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<NoticeResponseDto> {
    return this.noticesService.findOne(id)
  }
}
