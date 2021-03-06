import {
  Controller,
  Delete, ForbiddenException,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
  UnprocessableEntityException
} from '@nestjs/common';
import { Order } from '../../models/order.model';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '../../models/user.model';
import { CrudController } from '../crud.controller';
import { Roles } from '../../auth/roles.decorator';
import { Product } from '../../models/product.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { CurrentUser } from '../../auth/current-user.decorator';
import { ParseOptionalIntPipe } from '../../pipes/parse-optional-int.pipe';

@Controller('orders')
export class OrdersController extends CrudController<Order> {
  constructor(@InjectModel(Order) model, @InjectModel(Product) private productModel: ReturnModelType<typeof Product>) {
    super(model, Order);
  }

  @Get(':id')
  async findById_(@Param('id') id: string, @CurrentUser() currentUser: User) {
    const order = await super.findById(id);
    if (['ADMIN', 'SELLER'].includes(currentUser.role)
      || currentUser.role === 'CUSTOMER' && order.owner && order.owner.toString() === currentUser._id) {
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
      throw new ForbiddenException('Your Permissions are not enough to complete this operation');
    } else {
      if (!item._id || item.owner === currentUser) {
        item.owner = currentUser;
      }

      if (!item.orderLines || !item.orderLines.length) {
        throw new UnprocessableEntityException('Order should contains products');
      }

      for (let orderLine of item.orderLines) {
        if (typeof orderLine.product !== 'string') {
          throw new UnprocessableEntityException('Order contains invalid product');
        }
        if (typeof orderLine.quantity !== 'number') {
          throw new UnprocessableEntityException('Order contains invalid quantity');
        }
        const product = (await this.productModel.findById(orderLine.product));
        if (!product) {
          throw new UnprocessableEntityException('Order contains invalid product');
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
