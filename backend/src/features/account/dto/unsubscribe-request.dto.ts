import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsOptional, IsString, MaxLength } from 'class-validator'

/**
 * 退会リクエストオブジェクト。
 * @remarks ユーザーが退会を申請する際のリクエストボディを表す。
 */
export class UnsubscribeRequestDto {
  /** 退会理由（任意、最大1000文字） */
  @ApiPropertyOptional({ maxLength: 1000 })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  reason?: string
}
