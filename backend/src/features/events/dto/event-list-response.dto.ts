import { ApiProperty } from '@nestjs/swagger'

import { EventResponseDto } from './event-response.dto'

export class EventListResponseDto {
  @ApiProperty({ type: [EventResponseDto] })
  items!: EventResponseDto[]

  @ApiProperty({ type: Number })
  total!: number
}
