import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './controllers/users/users.controller';
import { CategoriesController } from './controllers/categories/categories.controller';
import { ProductsController } from './controllers/products/products.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ModelsModule } from './models/models.module';
import { AuthModule } from './auth/auth.module';
import { environment } from '../environments/environment';

@Module({
  imports: [
    MongooseModule.forRoot(environment.mongoDbUrl),
    // ElasticsearchModule.register({
    //   host: process.env.ELASTICSEARCH_HOST,
    //   log: process.env.ELASTICSEARCH_LOG
    // }),
    ModelsModule,
    AuthModule
  ],
  controllers: [
    AppController,
    UsersController,
    OrdersController,
    ProductsController,
    CategoriesController
  ],
  providers: [AppService],
})
export class AppModule {}
