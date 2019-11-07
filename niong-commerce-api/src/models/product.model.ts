import { arrayProp, index, prop, Ref } from '@typegoose/typegoose';
import { ObjectId } from 'bson';
import { User } from './user.model';
import { Category } from './category.model';

@index({title: 'text', description: 'text'})
export class Product {
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

  @arrayProp({ref: Category})
  categories: Ref<Category[]> | Category[] | string[];
}
