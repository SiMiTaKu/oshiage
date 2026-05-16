import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

/**
 * イベント詳細レスポンスオブジェクト。
 * @remarks 1件のイベントの詳細情報を表す。
 */
export class EventResponseDto {
  /** イベントID */
  @ApiProperty({ type: Number })
  id!: number

  /** イベント名 */
  @ApiProperty({ type: String })
  title!: string

  /** イベント種別 */
  @ApiProperty({ type: String })
  eventType!: string

  /** 開始日時（ISO 8601形式） */
  @ApiProperty({ type: String, format: 'date-time' })
  startAt!: string

  /** 終了日時（ISO 8601形式、未設定は null） */
  @ApiPropertyOptional({ type: String, format: 'date-time' })
  endAt?: string | null

  /** 開催場所 */
  @ApiProperty({ type: String })
  place!: string

  /** 参加費（任意） */
  @ApiPropertyOptional({ type: Number })
  fee?: number | null

  /** 詳細説明（任意） */
  @ApiPropertyOptional({ type: String })
  description?: string | null

  /** 作成日時（ISO 8601形式） */
  @ApiProperty({ type: String, format: 'date-time' })
  createdAt!: string

  /** 最終更新日時（ISO 8601形式） */
  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt!: string
}
