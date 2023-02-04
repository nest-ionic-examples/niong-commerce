import { Body, Controller, Get, Post, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '../models/user.model';
import { Model } from 'mongoose';
import { sign } from 'jsonwebtoken';
import { compare, hash } from 'bcrypt';
import { CurrentUser } from './current-user.decorator';
import { environment } from '../../environments/environment';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Auth")
@Controller()
export class AuthController {
  constructor(@InjectModel(User) private userModel: Model<User>) {}

  @Post('login')
  async login(@Body() credentials) {
    // console.log('credentials: ', credentials)
    const user = await this.userModel.findOne({username: credentials.username}).exec();
    if (!user) throw new UnauthorizedException('The username/password combination is invalid');

    const isMatch = await compare(credentials.password, user.password);
    if (!isMatch) throw new UnauthorizedException('The username/password combination is invalid');

    user.loggedIn = true;

    await user.save();

    return {
      token: sign({
        _id: user._id,
        username: user.username,
        role: user.role
      }, environment.jwtSecretPassword, {expiresIn: environment.jwtExpirationTime})
    };
  }

  @Get('me')
  me(@CurrentUser() user) {
    return this.userModel.findById(user._id);
  }

  @Post('logout')
  async logout(@CurrentUser() user) {
    await this.userModel.findByIdAndUpdate(user._id, {loggedIn: false});
    return {message: 'Logout Successfully'};
  }

  @Post('sign-up')
  async signup(@Body() signupCredentials) {
    signupCredentials.password = await hash(signupCredentials.password, 10);
    await this.userModel.create(signupCredentials);
    return {message: 'User Created Successfully'};
  }
}
