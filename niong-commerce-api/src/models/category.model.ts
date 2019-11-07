import { arrayProp, prop, Ref } from '@typegoose/typegoose';
import { ObjectId } from 'bson';
import { Product } from './product.model';

export class Category {
  _id: string | ObjectId;

  @prop({unique: true, maxlength: 100, required: true})
  name: string;

  @prop({maxlength: 1000})
  description: string;

  // @arrayProp({ref: 'Product'})
  // products: Ref<Product[]> | Product[] | string[];
}
