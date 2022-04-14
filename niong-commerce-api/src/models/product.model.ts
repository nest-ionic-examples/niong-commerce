import { Prop, Schema } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import { User } from './user.model';
import { Category } from './category.model';
import mongoose from 'mongoose';
import { Transform } from 'class-transformer';

// @index({title: 'text', description: 'text'})
const {Types} = mongoose.Schema;

@Schema()
export class Product {
  _id: ObjectId | string;

  @Prop({type: Types.ObjectId, ref: 'User'})
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

  @Prop({type: Types.ObjectId, ref: () => 'Category'})
  categories: Category[] | string[];
}
