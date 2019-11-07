import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { CastError, Error } from 'mongoose';

@Catch(Error.CastError)
export class CastErrorFilter implements ExceptionFilter {
  catch(exception: CastError, host: ArgumentsHost) {
    host.switchToHttp().getResponse()
      .status(HttpStatus.UNPROCESSABLE_ENTITY)
      .json({message: 'The resource id is malformed'});
  }
}
