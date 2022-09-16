import { index, Prop } from '@typegoose/typegoose';
import { ObjectId } from 'bson';
import { User } from './user.model';
import { Category } from './category.model';
// import { Transform } from 'class-transformer';


@index({title: 'text', description: 'text'})
export class Product {
  _id: ObjectId | string;

  @Prop({type: ObjectId, ref: 'User'})
  owner: User | ObjectId | string;

  @Prop()
  title: string;

  @Prop()
  image: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop({default: Date.now})
  created: Date;

  @Prop({type: ObjectId, ref: () => 'Category'})
  categories: Category[] | string[];
}
