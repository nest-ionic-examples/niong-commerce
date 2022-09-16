import { Module } from '@nestjs/common';

import { UsersController } from './controllers/users.controller';
import { CategoriesController } from './controllers/categories.controller';
import { ProductsController } from './controllers/products.controller';
import { OrdersController } from './controllers/orders.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { ModelsModule } from './models/models.module';
import { AuthModule } from './auth/auth.module';
import { environment } from '../environments/environment';

@Module({
  imports: [
    TypegooseModule.forRoot(environment.mongoDbUrl),
    // ElasticsearchModule.register({
    //   host: process.env.ELASTICSEARCH_HOST,
    //   log: process.env.ELASTICSEARCH_LOG
    // }),
    ModelsModule,
    AuthModule
  ],
  controllers: [
    UsersController,
    OrdersController,
    ProductsController,
    CategoriesController
  ],
  providers: [],
})
export class AppModule {}
