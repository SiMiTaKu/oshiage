import { ApiProperty } from '@nestjs/swagger'

import { EventResponseDto } from './event-response.dto'

/**
 * イベント一覧レスポンスオブジェクト。
 * @remarks ページネーション付きイベント一覧の取得結果を表す。
 */
export class EventListResponseDto {
  /** イベント一覧 */
  @ApiProperty({ type: [EventResponseDto] })
  items!: EventResponseDto[]

  /** 総件数 */
  @ApiProperty({ type: Number })
  total!: number
}
