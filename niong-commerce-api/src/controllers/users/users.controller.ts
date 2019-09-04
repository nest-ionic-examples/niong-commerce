import { Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { User } from '../../models/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { Roles } from '../../decorators/roles.decorator';
import { Page } from '../find.controller';
import { ParseOptionalIntPipe } from '../../pipes/parse-optional-int.pipe';
import { CrudController } from '../crud.controller';

@Controller('users')
export class UsersController extends CrudController<User> {
  constructor(@InjectModel(User) model) {
    super(model);
  }

  @Get()
  @Roles('ADMIN', 'SELLER')
  async find(@Query('page', ParseOptionalIntPipe) number: number = 1,
             @Query('size', ParseOptionalIntPipe) size: number = 20,
             @Query('sort') sort: string): Promise<User[] | Page<User> | User> {
    return super.find(number, size, sort);
  }

  @Get(':id')
  @Roles('ADMIN', 'SELLER')
  findById(id: string): any {
    return super.findById(id);
  }

  @Post()
  @Roles('ADMIN')
  create(items: User[] | any | User, currentUser?: User): Promise<User[] | User> {
    return super.create(items, currentUser);
  }

  @Put()
  @Roles('ADMIN')
  update(items: User[] | any | User, currentUser?: User): Promise<User[] | User> {
    return super.update(items, currentUser);
  }

  @Delete(':id')
  @Roles('ADMIN')
  async removeById(id: string): Promise<{ _id: string }> {
    return super.removeById(id);
  }
}
