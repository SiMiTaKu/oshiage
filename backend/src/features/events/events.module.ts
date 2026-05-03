import { Module } from '@nestjs/common'

import { EventsController } from './events.controller'
import { EventsService } from './events.service'

/**
 * EventsModule を表すクラス。
 */
@Module({
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
