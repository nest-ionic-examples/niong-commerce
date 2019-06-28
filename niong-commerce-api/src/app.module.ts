import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { environment } from './environment';
import { User } from './models/user.model';
import { UsersController } from './controllers/users/users.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { ProductsController } from './controllers/products/products.controller';
import { Order } from './models/order.model';
import { Product } from './models/product.model';
import { AuthController } from './auth/auth.controller';
import { AuthMiddleware } from './auth/auth.middleware';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';

@Module({
  imports: [
    TypegooseModule.forRoot(environment.MONGO_DB_URL),
    TypegooseModule.forFeature([User, Order, Product]),
  ],
  controllers: [
    AppController,
    AuthController,
    UsersController,
    OrdersController,
    ProductsController
  ],
  providers: [
    AppService,
    {provide: APP_GUARD, useClass: RolesGuard}
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware)
      .forRoutes('/');
  }
}

