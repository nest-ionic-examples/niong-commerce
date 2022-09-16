import { User } from './user';

export class Product {
  _id?: string;
  owner?: User;
  title?: string;
  image?: string;
  description?: string;
  price?: number;
  created?: Date;
}
