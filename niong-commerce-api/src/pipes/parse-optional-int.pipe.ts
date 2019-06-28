import { ArgumentMetadata, Injectable, ParseIntPipe } from '@nestjs/common';

@Injectable()
export class ParseOptionalIntPipe extends ParseIntPipe {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) { return; }

    return super.transform(value, metadata);
  }
}
