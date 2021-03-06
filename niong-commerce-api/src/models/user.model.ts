import { DocumentType, prop } from '@typegoose/typegoose';
import { ObjectId } from 'bson';
import { isEmail } from 'class-validator';

export class User {
  _id: ObjectId | string;

  @prop({
    required: true,
    maxlength: 20
  })
  firstName: string;

  @prop({
    required: true,
    maxlength: 20
  })
  lastName: string;

  @prop({
    required: true,
    maxlength: 20,
    minlength: 5,
    unique: true,
  })
  username: string;

  @prop({
    required: true,
    validate: isEmail
  })
  email: string;

  @prop({required: true})
  password: string;

  @prop()
  loggedIn: boolean;

  @prop({required: true, default: 'CUSTOMER'})
  role: string;

  @prop()
  address: {
    address?: string,
    coordinates?: {
      latitude: number,
      longitude: number,
    }
  } = null;

  @prop({default: Date.now})
  created: Date;

  @prop({default: () => true})
  enabled: boolean;

  @prop({default: () => false})
  deleted: boolean;

  toJSON(this: DocumentType<User>) {
    const obj = this.toObject();
    delete obj.password;
    return obj;
  }
}
