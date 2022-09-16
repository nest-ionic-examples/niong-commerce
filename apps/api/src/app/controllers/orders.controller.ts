import {
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Query,
  UnprocessableEntityException
} from '@nestjs/common';
import { Order } from '../models/order.model';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '../models/user.model';
import { CrudController } from '../base/controllers/crud.controller';
import { Roles } from '../auth/roles.decorator';
import { Product } from '../models/product.model';
import { Model } from 'mongoose';
import { CurrentUser } from '../auth/current-user.decorator';
import { ParseOptionalIntPipe } from '../pipes/parse-optional-int.pipe';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags("Orders")
@Controller('orders')
export class OrdersController extends CrudController<Order> {
  constructor(@InjectModel(Order) model: Model<Order>,
              @InjectModel(Product) private productModel: Model<Product>) {
    super(model, Order);
  }

  @Get(':id')
  async findById(@Param('id') id: string, @CurrentUser() currentUser: User) {
    const order = await super.findById(id);
    if (['ADMIN', 'SELLER'].includes(currentUser.role)
      || currentUser.role === 'CUSTOMER' && order.owner && order.owner.toString() === currentUser._id) {
      return order;
    } else {
      throw new ForbiddenException(`User not allowed to see the order ${id}`)
    }
  }

  @Get()
  @ApiQuery({name: '$page', required: false, type: Number})
  @ApiQuery({name: '$size', required: false, type: Number})
  @ApiQuery({name: '$sort', required: false, type: String})
  async find(@Query('$page', ParseOptionalIntPipe) number = 1,
              @Query('$size', ParseOptionalIntPipe) size = 20,
              @Query('$sort') sort = '',
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

      for (const orderLine of item.orderLines) {
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
    return super.saveOne(item, currentUser, false);
  }

  @Delete(':id')
  @Roles('ADMIN')
  async removeById(id: string): Promise<{ _id: string }> {
    return super.removeById(id);
  }
}
