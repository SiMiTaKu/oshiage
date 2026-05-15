import { ApiProperty } from '@nestjs/swagger'

/**
 * 退会処理レスポンスオブジェクト。
 * @remarks 退会処理の実行結果を表す。
 */
export class UnsubscribeResponseDto {
  /** 退会処理が正常に完了したかどうか */
  @ApiProperty({ type: Boolean })
  unsubscribed!: boolean
}
