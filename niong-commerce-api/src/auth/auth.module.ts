import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthMiddleware } from './auth.middleware';
import { ModelsModule } from '../models/models.module';

@Module({
  imports: [ModelsModule],
  controllers: [AuthController]
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
      .forRoutes('/');
  }
}
