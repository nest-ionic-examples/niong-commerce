import { Controller, Delete, HttpException, HttpStatus } from '@nestjs/common';
import { Order } from '../../models/order.model';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '../../models/user.model';
import { CrudController } from '../crud.controller';
import { Roles } from '../../decorators/roles.decorator';
import { Product } from '../../models/product.model';
import { ModelType } from 'typegoose';

@Controller('orders')
export class OrdersController extends CrudController<Order> {
  constructor(@InjectModel(Order) model, @InjectModel(Product) private productModel: ModelType<Product>) {
    super(model);
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
