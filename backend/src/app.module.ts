import { Module } from '@nestjs/common'

import { AccountModule } from './features/account/account.module'
import { EntitiesModule } from './features/entities/entities.module'
import { EventsModule } from './features/events/events.module'
import { NoticesModule } from './features/notices/notices.module'
import { PrismaModule } from './shared/prisma/prisma.module'

/**
 * アプリケーション全体の機能モジュールを束ねるルートモジュール。
 */
@Module({
  imports: [PrismaModule, AccountModule, EventsModule, EntitiesModule, NoticesModule],
})
export class AppModule {}
