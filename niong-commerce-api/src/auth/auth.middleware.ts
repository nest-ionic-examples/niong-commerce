import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../models/user.model';
import jwt = require('express-jwt');

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(@InjectModel(User) private readonly userModel: ReturnModelType<typeof User>) {
  } // <1>

  use(req, res, next) {
    jwt({ // <2>
      secret: process.env.JWT_SECRET_PASSWORD, // <3>
      isRevoked: async (req1, payload, done) => { // <4>
        if (!payload._id) {
          return done(new UnauthorizedException('The token contains invalid credentials or has expired'));
        }

        const user = await this.userModel.findById(payload._id).exec();
        if (!user || !user.loggedIn) return done(new UnauthorizedException('The user has been logged out'));

        done(null, false);
      },
    }).unless({path: ['/', '/login', '/sign-up']})(req, res, next); // <5>
  }
}
