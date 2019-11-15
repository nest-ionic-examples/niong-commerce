import { ElasticsearchModule } from "@nestjs/elasticsearch";
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { UsersController } from './controllers/users/users.controller';
import { OrdersController } from './controllers/orders/orders.controller';
import { ProductsController } from './controllers/products/products.controller';
import { ModelsModule } from './models/models.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesController } from './controllers/categories/categories.controller';

require('dotenv').config({path: `environments/${process.env.NODE_ENV || 'local'}.env`});

@Module({
  imports: [
    TypegooseModule.forRoot(process.env.MONGO_DB_URL),
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
  providers: [
    AppService,
  ],
})
export class AppModule {
}

