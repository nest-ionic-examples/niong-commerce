import { Get, Query } from '@nestjs/common';
import { ParseOptionalIntPipe } from '../../pipes/parse-optional-int.pipe';
import { Model } from 'mongoose';
import { ApiQuery } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export interface Page<T> {
  number: number;
  size: number;
  total: number;
  items: T[];
}

export class FindController<T> {

  protected constructor(protected model: Model<T>) {}

  @Get()
  @ApiQuery({name: '$page', required: false, type: Number})
  @ApiQuery({name: '$size', required: false, type: Number})
  @ApiQuery({name: '$sort', required: false, type: String})
  // @ApiQuery({name: '$where', required: false, type: String})
  async find(@Query('$page', ParseOptionalIntPipe) number = 1,
             @Query('$size', ParseOptionalIntPipe) size = 20,
             @Query('$sort') sort = '',
             ...extraArgs): Promise<T | T[] | Page<T>> {
    const [where] = extraArgs;
    if (size === 1) {
      return this.model.findOne(where);
    }

    let query: mongoose.Query<T[], T>;

    if (size >= 0) {
      query = this.model.find(where);
    }

    if (sort) query = query.sort(sort)

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
