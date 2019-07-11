import { ModelType } from 'typegoose';
import { Get, Param } from '@nestjs/common';

export class FindByIdController<T> {

  protected constructor(protected model: ModelType<T>) {}

  @Get(':id')
  findById(@Param('id') id: string): Promise<T> {
    return this.model.findById(id).exec();
  }

}
