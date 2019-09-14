import { User } from './user';
import { Product } from './product';

export interface Order {
  _id: string;
  owner: User;
  total: number;
  orderLines: {product: Product, quantity: number}[];
  created: Date;
}
