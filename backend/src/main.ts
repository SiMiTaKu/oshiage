import 'dotenv/config'
import 'reflect-metadata'

import { ValidationPipe, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'

/**
 * バックエンドアプリケーションを起動する。
 *
 * @returns 起動完了を表す Promise
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: true,
    }),
  )

  const document = SwaggerModule.createDocument(
    app,
    new DocumentBuilder()
      .setTitle('oshiage backend api')
      .setDescription('MVP向けバックエンドのCode-first OpenAPI契約')
      .setVersion('1.0.0')
      .addBearerAuth()
      .build(),
  )

  SwaggerModule.setup('api/docs', app, document)

  await app.listen(process.env.PORT ?? 3000)
}

void bootstrap()
