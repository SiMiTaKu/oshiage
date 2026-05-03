import { ApiProperty } from '@nestjs/swagger'

import { EntityRevisionDto } from './entity-response.dto'

/**
 * EntityRevisionsResponseDto を表すクラス。
 */
export class EntityRevisionsResponseDto {
  @ApiProperty({ type: [EntityRevisionDto] })
  revisions!: EntityRevisionDto[]
}
