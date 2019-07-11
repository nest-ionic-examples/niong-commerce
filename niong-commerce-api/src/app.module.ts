import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { environment } from './environment';
import { UsersController } from './controllers/users/users.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { ProductsController } from './controllers/products/products.controller';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles.guard';
import { ModelsModule } from './models/models.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypegooseModule.forRoot(environment.MONGO_DB_URL),
    ModelsModule,
    AuthModule
  ],
  controllers: [
    AppController,
    UsersController,
    OrdersController,
    ProductsController
  ],
  providers: [
    AppService,
    {provide: APP_GUARD, useClass: RolesGuard}
  ],
})
export class AppModule {}

