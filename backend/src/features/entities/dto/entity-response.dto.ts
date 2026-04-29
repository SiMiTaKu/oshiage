import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class EntityRevisionDto {
  @ApiProperty({ type: Number })
  revisionNo!: number

  @ApiProperty({ type: String })
  name!: string

  @ApiPropertyOptional({ type: String })
  sport?: string | null

  @ApiPropertyOptional({ type: String })
  area?: string | null

  @ApiPropertyOptional({ type: String })
  profile?: string | null

  @ApiPropertyOptional({ type: String })
  reason?: string | null

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt!: string
}

export class EntityResponseDto {
  @ApiProperty({ type: Number })
  id!: number

  @ApiProperty({ type: String, enum: ['individual', 'group'] })
  entityCategory!: string

  @ApiProperty({ type: String, enum: ['active', 'retired', 'inactive'] })
  activeStatus!: string

  @ApiProperty({ type: Number })
  currentRevisionNo!: number

  @ApiProperty({ type: EntityRevisionDto })
  currentRevision!: EntityRevisionDto

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt!: string

  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt!: string
}
