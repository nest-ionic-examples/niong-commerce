import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from './auth.middleware';
import { ModelsModule } from '../models/models.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './roles.guard';
import { UnauthorizedErrorFilter } from './unauthorized-error.filter';

@Module({
  imports: [ModelsModule],
  controllers: [AuthController],
  providers: [
    {provide: APP_GUARD, useClass: RolesGuard},
    {provide: APP_FILTER, useClass: UnauthorizedErrorFilter}
  ]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
      .forRoutes('/');
  }
}
