import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.model';
import { Order } from './order.model';
import { Product } from './product.model';
import { Category } from './category.model';

const providers = MongooseModule.forFeature([
  { name: User.name, schema: SchemaFactory.createForClass(User) },
  { name: Order.name, schema: SchemaFactory.createForClass(Order) },
  { name: Product.name, schema: SchemaFactory.createForClass(Product) },
  { name: Category.name, schema: SchemaFactory.createForClass(Category) },
]).providers;

@Module({
  providers,
  exports: providers
})
export class ModelsModule {
}
