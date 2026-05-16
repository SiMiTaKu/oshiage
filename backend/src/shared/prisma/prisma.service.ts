import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

/**
 * Prisma クライアントの接続ライフサイクルを管理するサービス。
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  /** DB接続を確立する。 */
  async onModuleInit() {
    await this.$connect()
  }

  /** DB接続を切断する。 */
  async onModuleDestroy() {
    await this.$disconnect()
  }
}
