import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './user.model';
import { Order } from './order.model';
import { Product } from './product.model';

const providers = TypegooseModule.forFeature([User, Order, Product]).providers;

@Module({
  providers,
  exports: providers
})
export class ModelsModule { }
