import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthAdapter } from './auth/auth.adapter';
import { UnauthorizedErrorFilter } from './filters/unauthorized-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.useGlobalFilters(new UnauthorizedErrorFilter());
  app.useWebSocketAdapter(new AuthAdapter(app));
  await app.listen(3000);
}

bootstrap();
