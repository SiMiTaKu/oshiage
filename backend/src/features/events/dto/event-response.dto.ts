import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

/**
 * EventResponseDto を表すクラス。
 */
export class EventResponseDto {
  @ApiProperty({ type: Number })
  id!: number

  @ApiProperty({ type: String })
  title!: string

  @ApiProperty({ type: String })
  eventType!: string

  @ApiProperty({ type: String, format: 'date-time' })
  startAt!: string

  @ApiPropertyOptional({ type: String, format: 'date-time' })
  endAt?: string | null

  @ApiProperty({ type: String })
  place!: string

  @ApiPropertyOptional({ type: Number })
  fee?: number | null

  @ApiPropertyOptional({ type: String })
  description?: string | null

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt!: string

  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt!: string
}
