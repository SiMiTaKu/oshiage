import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

/**
 * NoticeResponseDto を表すクラス。
 */
export class NoticeResponseDto {
  @ApiProperty({ type: Number })
  id!: number

  @ApiProperty({ type: String })
  title!: string

  @ApiProperty({ type: String })
  body!: string

  @ApiProperty({ type: String, enum: ['specChange', 'maintenance', 'incident'] })
  noticeType!: string

  @ApiProperty({ type: String, enum: ['low', 'medium', 'high'] })
  priority!: string

  @ApiProperty({ type: String, format: 'date-time' })
  publishAt!: string

  @ApiPropertyOptional({ type: String, format: 'date-time' })
  unpublishAt?: string | null

  @ApiProperty({ type: String, format: 'date-time' })
  createdAt!: string
}
