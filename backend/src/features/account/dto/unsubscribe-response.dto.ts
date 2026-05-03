import { ApiProperty } from '@nestjs/swagger'

/**
 * UnsubscribeResponseDto を表すクラス。
 */
export class UnsubscribeResponseDto {
  @ApiProperty({ type: Boolean })
  unsubscribed!: boolean
}
