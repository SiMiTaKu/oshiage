import { Module } from '@nestjs/common';

import { AccountModule } from './features/account/account.module';
import { PrismaModule } from './shared/prisma/prisma.module';

@Module({
  imports: [PrismaModule, AccountModule],
})
export class AppModule {}
