import { Module } from '@nestjs/common'

import { AccountController } from './controllers/account.controller'
import { AccountService } from './services/account.service'

/**
 * AccountModule を表すクラス。
 */
@Module({
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
