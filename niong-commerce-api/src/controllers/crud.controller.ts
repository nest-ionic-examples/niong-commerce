import { Model } from 'mongoose';
import { Body, Delete, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ReadController } from './read.controller';
import { User } from '../models/user.model';
import { CurrentUser } from '../auth/current-user.decorator';
import { ClassConstructor, plainToInstance } from 'class-transformer';

export abstract class CrudController<T> extends ReadController<T> {
  protected constructor(protected model: Model<T>, protected type: ClassConstructor<T>) {
    super(model);
  }

  @Post()
  create(@Body() items: T | T[] | any, @CurrentUser() currentUser?: User): Promise<T[] | T> {
    if (items instanceof Array) {
      return Promise.all(items.map(item => this.saveOne(item, currentUser)));
    } else {
      return this.saveOne(items, currentUser);
    }
  }

  @Put()
  update(@Body() items: T | T[] | any, @CurrentUser() currentUser?: User): Promise<T[] | T> {
    return this.create(items, currentUser);
  }

  saveOne(item: T | any, currentUser?: User, transformPlainToClass = true): Promise<T> {
    if (transformPlainToClass) item = plainToInstance(this.type, item);
    if (item._id) {
      return this.model.findByIdAndUpdate(item._id, item, {new: true}).exec();
    } else {
      return this.model.create(item);
    }
  }

  @Delete(':id')
  async removeById(@Param('id') id: string): Promise<{ _id: string }> {
    const item = await this.model.findByIdAndDelete(id);
    if (!item) {
      throw new HttpException('Item does not exist or was already deleted', HttpStatus.UNPROCESSABLE_ENTITY)
    }
    return {_id: item._id};
  }

}

