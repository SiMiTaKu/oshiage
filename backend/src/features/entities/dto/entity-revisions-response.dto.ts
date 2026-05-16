import { ApiProperty } from '@nestjs/swagger'

import { EntityRevisionDto } from './entity-response.dto'

/**
 * エンティティ改訂履歴レスポンスオブジェクト。
 * @remarks 指定エンティティの全改訂履歴の取得結果を表す。
 */
export class EntityRevisionsResponseDto {
  /** 改訂履歴の一覧 */
  @ApiProperty({ type: [EntityRevisionDto] })
  revisions!: EntityRevisionDto[]
}
