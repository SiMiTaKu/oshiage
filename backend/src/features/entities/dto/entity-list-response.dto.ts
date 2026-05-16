import { ApiProperty } from '@nestjs/swagger'

import { EntityResponseDto } from './entity-response.dto'

/**
 * エンティティ一覧レスポンスオブジェクト。
 * @remarks ページネーション付きエンティティ一覧の取得結果を表す。
 */
export class EntityListResponseDto {
  /** エンティティ一覧 */
  @ApiProperty({ type: [EntityResponseDto] })
  items!: EntityResponseDto[]

  /** 総件数 */
  @ApiProperty({ type: Number })
  total!: number
}
