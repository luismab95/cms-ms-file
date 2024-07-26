import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './shared/environments/load-env';

async function bootstrap() {
  const { port } = config.server;

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('ms-file');

  await app.listen(port);
  console.info(`MS-FILE iniciado en el puerto: ${port}`);
}
bootstrap();
