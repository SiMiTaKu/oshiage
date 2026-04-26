import { ApiProperty } from '@nestjs/swagger'

export class UnsubscribeResponseDto {
  @ApiProperty({ type: Boolean })
  unsubscribed!: boolean
}
