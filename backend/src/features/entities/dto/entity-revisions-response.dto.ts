import { ApiProperty } from '@nestjs/swagger'

import { EntityRevisionDto } from './entity-response.dto'

export class EntityRevisionsResponseDto {
  @ApiProperty({ type: [EntityRevisionDto] })
  revisions!: EntityRevisionDto[]
}
