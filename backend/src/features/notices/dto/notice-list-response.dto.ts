import { ApiProperty } from '@nestjs/swagger'

import { NoticeResponseDto } from './notice-response.dto'

/**
 * お知らせ一覧レスポンスオブジェクト。
 * @remarks ページネーション付きお知らせ一覧の取得結果を表す。
 */
export class NoticeListResponseDto {
  /** お知らせ一覧 */
  @ApiProperty({ type: [NoticeResponseDto] })
  items!: NoticeResponseDto[]

  /** 総件数 */
  @ApiProperty({ type: Number })
  total!: number
}
