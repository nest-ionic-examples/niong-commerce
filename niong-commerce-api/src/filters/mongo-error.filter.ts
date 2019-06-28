import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoErrorFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    if (exception.code === 11000) {
      host.switchToHttp().getResponse()
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .json({message: 'Resource Already Exist'});
    } else {
      host.switchToHttp().getResponse()
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .json({message: exception.message});
    }
  }
}
