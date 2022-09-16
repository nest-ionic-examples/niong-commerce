import { Prop, Schema } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import { User } from './user.model';
import { Product } from './product.model';
// import isNotEmpty = require('is-not-empty');
import mongoose from 'mongoose';
import Types = mongoose.Schema.Types

@Schema()
export class Order {
  _id: ObjectId | string;

  @Prop({ref: 'User', type: Types.ObjectId})
  owner: User | string;

  @Prop({default: 0})
  total: number;

  @Prop({required: true})
  orderLines: { product: Product, quantity: number }[];

  @Prop({default: Date.now})
  created: Date;
}
