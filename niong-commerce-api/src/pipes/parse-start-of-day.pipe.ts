import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import moment = require('moment');

@Injectable()
export class ParseStartOfDayPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value && moment(value, 'Y-M-D').startOf('d').toDate() || null;
  }
}
