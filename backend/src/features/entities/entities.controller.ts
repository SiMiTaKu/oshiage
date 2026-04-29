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

@ApiTags('entities')
@Controller('entities')
export class EntitiesController {
  constructor(private readonly entitiesService: EntitiesService) {}

  @Get()
  @Version('1')
  @ApiOperation({ summary: 'Get a list of entities.' })
  @ApiOkResponse({ type: EntityListResponseDto })
  findAll(@Query() query: GetEntitiesQueryDto): Promise<EntityListResponseDto> {
    return this.entitiesService.findAll(query)
  }

  @Get(':id')
  @Version('1')
  @ApiOperation({ summary: 'Get an entity by id.' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: EntityResponseDto })
  @ApiNotFoundResponse({ description: 'Entity not found.' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<EntityResponseDto> {
    return this.entitiesService.findOne(id)
  }

  @Get(':id/revisions')
  @Version('1')
  @ApiOperation({ summary: 'Get revision history of an entity.' })
  @ApiParam({ name: 'id', type: Number })
  @ApiOkResponse({ type: EntityRevisionsResponseDto })
  @ApiNotFoundResponse({ description: 'Entity not found.' })
  findRevisions(@Param('id', ParseIntPipe) id: number): Promise<EntityRevisionsResponseDto> {
    return this.entitiesService.findRevisions(id)
  }
}
