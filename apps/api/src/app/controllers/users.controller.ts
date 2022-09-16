import { Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { User } from '../models/user.model';
import { Roles } from '../auth/roles.decorator';
import { Page } from '../base/controllers/find.controller';
import { ParseOptionalIntPipe } from '../pipes/parse-optional-int.pipe';
import { CrudController } from '../base/controllers/crud.controller';
import { InjectModel } from 'nestjs-typegoose';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags("Users")
@Controller('users')
export class UsersController extends CrudController<User> {
  constructor(@InjectModel(User) model) {
    super(model, User);
  }

  @Get()
  @Roles('ADMIN', 'SELLER')
  @ApiQuery({name: '$page', required: false, type: Number})
  @ApiQuery({name: '$size', required: false, type: Number})
  @ApiQuery({name: '$sort', required: false, type: String})
  // @ApiQuery({name: '$where', required: false, type: String})
  async find(@Query('$page', ParseOptionalIntPipe) page = 1,
             @Query('$size', ParseOptionalIntPipe) size = 20,
             @Query('$sort') sort: string): Promise<User[] | Page<User> | User> {
    return super.find(page, size, sort);
  }

  @Get(':id')
  @Roles('ADMIN', 'SELLER')
  findById(id: string): Promise<User> {
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
