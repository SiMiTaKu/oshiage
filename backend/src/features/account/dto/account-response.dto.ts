import { ApiProperty } from '@nestjs/swagger'

/**
 * AccountResponseDto を表すクラス。
 */
export class AccountResponseDto {
  @ApiProperty({ type: Number })
  userId!: number

  @ApiProperty({ type: String })
  email!: string

  @ApiProperty({ type: String })
  displayName!: string

  @ApiProperty({ type: String })
  status!: string

  @ApiProperty({ type: String })
  createdAt!: string

  @ApiProperty({ type: String })
  updatedAt!: string
}
