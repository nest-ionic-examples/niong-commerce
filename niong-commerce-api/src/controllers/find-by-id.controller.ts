import { ReturnModelType } from '@typegoose/typegoose';
import { Get, Param } from '@nestjs/common';

export class FindByIdController<T> {

  protected constructor(protected model: ReturnModelType<any>) {}

  @Get(':id')
  findById(@Param('id') id: string): Promise<T> {
    return this.model.findById(id).exec();
  }

}
