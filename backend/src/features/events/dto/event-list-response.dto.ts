import { ApiProperty } from '@nestjs/swagger'

import { EventResponseDto } from './event-response.dto'

/**
 * EventListResponseDto を表すクラス。
 */
export class EventListResponseDto {
  @ApiProperty({ type: [EventResponseDto] })
  items!: EventResponseDto[]

  @ApiProperty({ type: Number })
  total!: number
}
