import { prop, Typegoose } from 'typegoose';
import { ObjectId } from 'bson';
import { User } from './user.model';
import { Product } from './product.model';
import isNotEmpty = require('is-not-empty');

export class Order extends Typegoose {
  _id: ObjectId | string;

  @prop({ref: User})
  owner: User;

  @prop({default: 0})
  total: number;

  @prop({required: true, validate: isNotEmpty.array})
  orderLines: {product: Product, quantity: number}[];

  @prop({default: Date.now})
  created: Date;
}
