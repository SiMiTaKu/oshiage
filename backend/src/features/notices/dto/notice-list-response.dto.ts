import { ApiProperty } from '@nestjs/swagger'

import { NoticeResponseDto } from './notice-response.dto'

export class NoticeListResponseDto {
  @ApiProperty({ type: [NoticeResponseDto] })
  items!: NoticeResponseDto[]

  @ApiProperty({ type: Number })
  total!: number
}
