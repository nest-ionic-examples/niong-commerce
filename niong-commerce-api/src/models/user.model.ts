import { Prop, raw, Schema } from '@nestjs/mongoose';
import { ObjectId } from 'bson';
import { isEmail } from 'class-validator';
import mongoose from 'mongoose';

const {String, Mixed} = mongoose.Schema.Types;

@Schema({
  toJSON: {
    transform: doc => {
        const obj = doc.toObject();
        delete obj.password;
        return obj;
    }
  }
})
export class User {
  _id: ObjectId | string;

  @Prop({
    required: true,
    maxlength: 20
  })
  firstName: string;

  @Prop({
    required: true,
    maxlength: 20
  })
  lastName: string;

  @Prop({
    required: true,
    maxlength: 20,
    minlength: 5,
    unique: true,
  })
  username: string;

  @Prop({
    required: true,
    validate: isEmail
  })
  email: string;

  @Prop({required: true})
  password: string;

  @Prop()
  loggedIn: boolean;

  @Prop({required: true, default: 'CUSTOMER'})
  role: string;

  @Prop(raw({
    address: { type: String },
    coordinates: { type: Mixed },
  }))
  address: {
    address?: string,
    coordinates?: {
      latitude: number,
      longitude: number,
    }
  } = null;

  @Prop({default: Date.now})
  created: Date;

  @Prop({default: true})
  enabled: boolean;

  @Prop({default: false})
  deleted: boolean;
}
