import { ApiProperty } from '@nestjs/swagger'

/**
 * AccountBootstrapResponseDto を表すクラス。
 */
export class AccountBootstrapResponseDto {
  @ApiProperty({ type: Number })
  userId!: number

  @ApiProperty({ type: String })
  cognitoSub!: string

  @ApiProperty({ type: Boolean })
  created!: boolean
}
