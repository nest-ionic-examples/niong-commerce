import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthAdapter } from './auth/auth.adapter';
import { UnauthorizedErrorFilter } from './filters/unauthorized-error.filter';
import { ValidationErrorFilter } from './filters/validation-error.filter';
import { MongoErrorFilter } from './filters/mongo-error.filter';
import { CastErrorFilter } from './filters/cast-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.useGlobalFilters(
    new UnauthorizedErrorFilter(),
    new ValidationErrorFilter(),
    new MongoErrorFilter(),
    new CastErrorFilter()
  );
  app.useWebSocketAdapter(new AuthAdapter(app));
  await app.listen(3000);
}

bootstrap();
