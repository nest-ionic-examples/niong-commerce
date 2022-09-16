import { Body, Controller, Delete, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { Product } from '../../models/product.model';
import { InjectModel } from '@nestjs/mongoose';
import { CrudController } from '../crud.controller';
import { Roles } from '../../auth/roles.decorator';
import { User } from '../../models/user.model';
import { Page } from '../find.controller';
import { ParseOptionalIntPipe } from '../../pipes/parse-optional-int.pipe';
import { ParseStartOfDayPipe } from '../../pipes/parse-start-of-day.pipe';
import { ParseEndOfDayPipe } from '../../pipes/parse-end-of-day.pipe';
import { ParseNumberPipe } from '../../pipes/parse-number.pipe';
import { RolesMap } from '../../auth/roles-map.decorator';

@Controller('products')
@RolesMap({
  POST: 'SELLER',
  PUT: 'SELLER',
})
export class ProductsController extends CrudController<Product> {
  constructor(@InjectModel(Product.name) model) {
    super(model, Product);
  }

  @Get()
  async find_(@Query('page', ParseOptionalIntPipe) number: number = 1,
              @Query('size', ParseOptionalIntPipe) size: number = 20,
              @Query('sort') sort: string,
              @Query('search') search: string,
              @Query('min_price', ParseNumberPipe) min_price: number,
              @Query('max_price', ParseNumberPipe) max_price: number,
              @Query('created_after', ParseStartOfDayPipe) created_after: Date,
              @Query('created_before', ParseEndOfDayPipe) created_before: Date): Promise<Product[] | Page<Product> | Product> {
    const where = {
      ...(search && {$text: {$search: search}}),
      ...((min_price || max_price) && {price: {...{$gte: min_price}, ...{$lte: max_price}}}),
      ...((created_after || created_before) && {created: {...{$gte: created_after}, ...{$lte: created_before}}})
    };
    return super.find(number, size, sort, where);
    // if (search) {
    //  const result = await super.find(number, size, sort, {$text: {$search: search}}) as Page<Product>;
    //  if (result.items && result.items.length < size) {
    //    const searchRegExp = new RegExp(search, 'i');
    //    const where: any = {$or: [{title: searchRegExp}, {description: searchRegExp}]};
    //    if (result.items.length > 0) {
    //      where.$and = result.items.map(r => ({_id: {$ne: r._id}}))
    //    }
    //    const result2 = await super.find(number, size, sort, where) as Page<Product>;
    //    result.items = result.items.concat(result2.items);
    //    result.total += result2.total;
    //  }
    //  return result;
    // } else {
    //   return super.find(number, size, sort);
    // }
  }

  async saveOne(item: Product, currentUser?: User): Promise<Product> {
    if (currentUser.role === 'SELLER') {
      const prevItem = await this.model.findById(item._id).populate('owner');
      if (item._id && (currentUser._id !== (prevItem.owner as User)._id.toString())) {
        throw new HttpException('Your Permissions are not enough to complete this operation', HttpStatus.FORBIDDEN)
      } else {
        item.owner = currentUser._id;
      }
    }
    return super.saveOne(item, currentUser);
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
