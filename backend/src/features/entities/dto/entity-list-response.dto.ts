import { ApiProperty } from '@nestjs/swagger'

import { EntityResponseDto } from './entity-response.dto'

/**
 * EntityListResponseDto を表すクラス。
 */
export class EntityListResponseDto {
  @ApiProperty({ type: [EntityResponseDto] })
  items!: EntityResponseDto[]

  @ApiProperty({ type: Number })
  total!: number
}
