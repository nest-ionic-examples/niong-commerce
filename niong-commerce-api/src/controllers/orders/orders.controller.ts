import { Controller, Delete, Get, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import { Order } from '../../models/order.model';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '../../models/user.model';
import { CrudController } from '../crud.controller';
import { Roles } from '../../decorators/roles.decorator';
import { Product } from '../../models/product.model';
import { ModelType } from 'typegoose';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { ParseOptionalIntPipe } from '../../pipes/parse-optional-int.pipe';

@Controller('orders')
export class OrdersController extends CrudController<Order> {
  constructor(@InjectModel(Order) model, @InjectModel(Product) private productModel: ModelType<Product>) {
    super(model);
  }

  @Get(':id')
  async findById_(@Param('id') id: string, @CurrentUser() currentUser: User) {
    const order = await super.findById(id);
    if (['ADMIN', 'SELLER'].includes(currentUser.role)
      || currentUser.role === 'USER' && order.owner === currentUser._id) {
      return order;
    } else {
      throw new HttpException('Not Allowed', HttpStatus.FORBIDDEN)
    }
  }

  @Get()
  async find_(@Query('page', ParseOptionalIntPipe) number: number = 1,
              @Query('size', ParseOptionalIntPipe) size: number = 20,
              @Query('sort') sort: string,
              @CurrentUser() currentUser: User) {
    if (['ADMIN', 'SELLER'].includes(currentUser.role)) {
      return super.find(number, size, sort);
    } else {
      return super.find(number, size, sort, {owner: currentUser._id})
    }
  }

  async saveOne(item: Order, currentUser: User) {
    if (item._id && 'ADMIN' !== currentUser.role || 'SELLER' === currentUser.role) {
      throw new HttpException('Your Permissions are not enough to complete this operation', HttpStatus.FORBIDDEN);
    } else {
      item.owner = currentUser;

      for (let orderLine of item.orderLines) {
        if (typeof orderLine.product !== 'string') {
          throw new HttpException('Order contains invalid product', HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (typeof orderLine.quantity !== 'number') {
          throw new HttpException('Order contains invalid quantity', HttpStatus.UNPROCESSABLE_ENTITY);
        }
        const product = await this.productModel.findById(orderLine.product);
        if (!product) {
          throw new HttpException('Order contains invalid product', HttpStatus.UNPROCESSABLE_ENTITY);
        }
        orderLine.product = product;
      }
    }
    return super.saveOne(item);
  }

  @Delete(':id')
  @Roles('ADMIN')
  async removeById(id: string): Promise<{ _id: string }> {
    return super.removeById(id);
  }
}
