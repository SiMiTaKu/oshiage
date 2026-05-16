import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

/**
 * お知らせ詳細レスポンスオブジェクト。
 * @remarks 1件のお知らせの詳細情報を表す。
 */
export class NoticeResponseDto {
  /** お知らせID */
  @ApiProperty({ type: Number })
  id!: number

  /** タイトル */
  @ApiProperty({ type: String })
  title!: string

  /** 本文 */
  @ApiProperty({ type: String })
  body!: string

  /** お知らせ種別（specChange / maintenance / incident） */
  @ApiProperty({ type: String, enum: ['specChange', 'maintenance', 'incident'] })
  noticeType!: string

  /** 優先度（low / medium / high） */
  @ApiProperty({ type: String, enum: ['low', 'medium', 'high'] })
  priority!: string

  /** 公開開始日時（ISO 8601形式） */
  @ApiProperty({ type: String, format: 'date-time' })
  publishAt!: string

  /** 公開終了日時（ISO 8601形式、未設定は null） */
  @ApiPropertyOptional({ type: String, format: 'date-time' })
  unpublishAt?: string | null

  /** 作成日時（ISO 8601形式） */
  @ApiProperty({ type: String, format: 'date-time' })
  createdAt!: string
}
