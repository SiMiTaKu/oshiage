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

@ApiTags('events')
@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get a list of events.' })
  @ApiOkResponse({ type: EventListResponseDto })
  findAll(@Query() query: GetEventsQueryDto): Promise<EventListResponseDto> {
    return this.eventsService.findAll(query)
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get an event by id.' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: EventResponseDto })
  @ApiNotFoundResponse({ description: 'Event not found.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<EventResponseDto> {
    return this.eventsService.findOne(id)
  }
}
