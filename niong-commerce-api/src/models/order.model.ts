import { prop } from '@typegoose/typegoose';
import { ObjectId } from 'bson';
import { User } from './user.model';
import { Product } from './product.model';
import isNotEmpty = require('is-not-empty');

export class Order {
  _id: ObjectId | string;

  @prop({ref: User})
  owner: User | string;

  @prop({default: 0})
  total: number;

  @prop({required: true})
  orderLines: { product: Product, quantity: number }[];

  @prop({default: Date.now})
  created: Date;
}
