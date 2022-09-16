import { Model } from 'mongoose';
import { Get, Param } from '@nestjs/common';

export class FindByIdController<T> {

  protected constructor(protected model: Model<T>) {}

  @Get(':id')
  findById(@Param('id') id: string, ...extraArgs): Promise<T> {
    return this.model.findById(id).exec();
  }

}
