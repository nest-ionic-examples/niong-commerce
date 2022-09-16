import { Prop, Ref } from '@typegoose/typegoose';
import { ObjectId } from 'bson';
import { Product } from './product.model';

export class Category {
  _id: string | ObjectId;

  @Prop({unique: true, maxlength: 100, required: true})
  name: string;

  @Prop({maxlength: 1000})
  description: string;

  @Prop({ref: 'Product'})
  products: Ref<Product>[] | Product[] | string[];
}
