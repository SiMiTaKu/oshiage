import { ApiProperty } from '@nestjs/swagger'

import { EntityResponseDto } from './entity-response.dto'

export class EntityListResponseDto {
  @ApiProperty({ type: [EntityResponseDto] })
  items!: EntityResponseDto[]

  @ApiProperty({ type: Number })
  total!: number
}
