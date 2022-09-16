import { Injectable } from '@nestjs/common';
import { Message } from '@niong-commerce/api-interfaces';

@Injectable()
export class AppService {
  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
