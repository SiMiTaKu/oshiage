import { Module } from '@nestjs/common'

import { EntitiesController } from './entities.controller'
import { EntitiesService } from './entities.service'

/**
 * EntitiesModule を表すクラス。
 */
@Module({
  controllers: [EntitiesController],
  providers: [EntitiesService],
})
export class EntitiesModule {}
