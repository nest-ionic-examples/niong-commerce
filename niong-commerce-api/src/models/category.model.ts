import { Prop, Schema } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import { Product } from './product.model';

@Schema()
export class Category {
  _id: string | ObjectId;

  @Prop({unique: true, maxlength: 100, required: true})
  name: string;

  @Prop({maxlength: 1000})
  description: string;

  // @arrayProp({ref: 'Product'})
  // products: Ref<Product[]> | Product[] | string[];
}
