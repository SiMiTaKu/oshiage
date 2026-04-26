import { writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from '../../app.module';

async function main() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });

  try {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle('oshiage backend api')
        .setDescription('Code-first OpenAPI contract for the MVP backend.')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build(),
    );

    const outputPath = join(process.cwd(), '..', 'openapi', 'generated', 'openapi.json');

    await mkdir(join(process.cwd(), '..', 'openapi', 'generated'), {
      recursive: true,
    });
    await writeFile(outputPath, JSON.stringify(document, null, 2));
  } finally {
    await app.close();
  }
}

void main();
