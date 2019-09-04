import { Body, Controller, Delete, HttpException, HttpStatus, Post, Put } from '@nestjs/common';
import { Product } from '../../models/product.model';
import { InjectModel } from 'nestjs-typegoose';
import { CrudController } from '../crud.controller';
import { Roles } from '../../decorators/roles.decorator';
import { User } from '../../models/user.model';
import { CurrentUser } from '../../decorators/current-user.decorator';

@Controller('products')
export class ProductsController extends CrudController<Product> {
  constructor(@InjectModel(Product) model) {
    super(model);
  }

  @Post()
  @Roles('SELLER')
  create(@Body() items, @CurrentUser() currentUser?: User) {
    return super.create(items, currentUser);
  }

  @Put()
  @Roles('SELLER')
  update(@Body() items, @CurrentUser() currentUser?: User) {
    return super.create(items, currentUser);
  }

  async saveOne(item: any | Product, currentUser?: User): Promise<Product> {
    if (currentUser.role === 'SELLER') {
      const prevItem = await this.model.findById(item._id).populate('owner');
      if (item._id && (currentUser._id !== prevItem.owner._id.toString())) {
        throw new HttpException('You do not have enough permissions to do this operation', HttpStatus.FORBIDDEN)
      } else {
        item.owner = currentUser;
      }
    }
    return super.saveOne(item, currentUser);
  }

  @Delete(':id')
  @Roles('SELLER')
  removeById(id: string) {
    return super.removeById(id);
  }

  @Delete()
  @Roles('SELLER')
  remove(@Body() body) {
    const conditions: any = {};
    if (body.ids && body.ids instanceof Array) {
      conditions._id = {$in: body.ids};
      return this.model.remove(conditions);
    }

    throw new HttpException('The submitted conditions are incorrect', HttpStatus.UNPROCESSABLE_ENTITY)
  }
}
