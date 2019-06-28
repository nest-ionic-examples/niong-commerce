import { ModelType } from 'typegoose';
import { Get, Query } from '@nestjs/common';
import { ParseOptionalIntPipe } from '../pipes/parse-optional-int.pipe';

export interface Page<T> {
  number: number;
  size: number;
  total: number;
  items: T[];
}

export class FindController<T> {

  protected constructor(protected model: ModelType<T>) {}

  @Get()
  async find(@Query('page', ParseOptionalIntPipe) number: number = 1,
             @Query('size', ParseOptionalIntPipe) size: number = 20,
             @Query('sort') sort: string,
             where?): Promise<T | T[] | Page<T>> {
    if (size === 1) {
      return this.model.findOne(where);
    }

    let query;

    if (size >= 0) {
      query = this.model.find(where);
    }

    if (size > 1) {
      query = query.limit(size);
      if (number) {
        query = query.skip((number - 1) * size);
        return {
          number,
          size,
          total: await this.model.find(where).count(),
          items: await query,
        };
      }
    }

    return query.exec();
  }
}
