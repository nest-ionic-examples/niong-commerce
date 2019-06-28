import { prop, Ref, Typegoose } from 'typegoose';
import { ObjectId } from 'bson';
import { User } from './user.model';

export class Product extends Typegoose {
  _id: ObjectId | string;

  @prop({ref: User})
  owner: User | Ref<User> | any;

  @prop()
  title: string;

  @prop()
  image: string;

  @prop()
  description: string;

  @prop()
  price: number;

  @prop({default: Date.now})
  created: Date;
}
