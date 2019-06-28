import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Error } from 'mongoose';
import ValidationError = Error.ValidationError;

@Catch(ValidationError)
export class ValidationErrorFilter implements ExceptionFilter {
  catch(exception: ValidationError, host: ArgumentsHost) {
    host.switchToHttp().getResponse()
      .status(HttpStatus.UNPROCESSABLE_ENTITY)
      .json({message: exception.message});
  }
}
