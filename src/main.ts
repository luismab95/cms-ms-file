import { NestFactory } from '@nestjs/core';
import { config as resourcesConfig } from 'cms-lib-resources';
import { config } from '@shared/environments/load-env.js';

import { AppModule } from './app.module.js';

async function bootstrap() {
  const { port } = config.server;
  const { corsOrigin } = resourcesConfig.server;

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: false,
  });
  app.setGlobalPrefix('ms-file');

  await app.listen(port!);
  console.info(`MS-FILE iniciado en el puerto: ${port}`);
}
await bootstrap();
