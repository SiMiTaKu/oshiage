import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

/**
 * エンティティ改訂履歴オブジェクト。
 * @remarks 1件分の改訂内容（名前・競技・地域・プロフィール等）を表す。
 */
export class EntityRevisionDto {
  /** 改訂番号 */
  @ApiProperty({ type: Number })
  revisionNo!: number

  /** エンティティ名 */
  @ApiProperty({ type: String })
  name!: string

  /** 競技名（任意） */
  @ApiPropertyOptional({ type: String })
  sport?: string | null

  /** 出身地・活動地域（任意） */
  @ApiPropertyOptional({ type: String })
  area?: string | null

  /** プロフィール（任意） */
  @ApiPropertyOptional({ type: String })
  profile?: string | null

  /** 改訂理由（任意） */
  @ApiPropertyOptional({ type: String })
  reason?: string | null

  /** 改訂日時（ISO 8601形式） */
  @ApiProperty({ type: String, format: 'date-time' })
  createdAt!: string
}

/**
 * エンティティ詳細レスポンスオブジェクト。
 * @remarks エンティティの基本情報と最新改訂内容を含む取得結果を表す。
 */
export class EntityResponseDto {
  /** エンティティID */
  @ApiProperty({ type: Number })
  id!: number

  /** エンティティカテゴリ（individual / group） */
  @ApiProperty({ type: String, enum: ['individual', 'group'] })
  entityCategory!: string

  /** 活動ステータス（active / retired / inactive） */
  @ApiProperty({ type: String, enum: ['active', 'retired', 'inactive'] })
  activeStatus!: string

  /** 現在の改訂番号 */
  @ApiProperty({ type: Number })
  currentRevisionNo!: number

  /** 現在の改訂内容 */
  @ApiProperty({ type: EntityRevisionDto })
  currentRevision!: EntityRevisionDto

  /** 作成日時（ISO 8601形式） */
  @ApiProperty({ type: String, format: 'date-time' })
  createdAt!: string

  /** 最終更新日時（ISO 8601形式） */
  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt!: string
}
