import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

/**
 * Prisma クライアントの接続ライフサイクルを管理するサービス。
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
