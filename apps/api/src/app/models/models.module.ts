import { Module } from '@nestjs/common';
import { User } from './user.model';
import { Order } from './order.model';
import { Product } from './product.model';
import { Category } from './category.model';
import { TypegooseModule } from 'nestjs-typegoose';

const providers = TypegooseModule.forFeature([
  User,
  Order,
  Product,
  Category
]).providers;

@Module({
  providers,
  exports: providers
})
export class ModelsModule {
}
