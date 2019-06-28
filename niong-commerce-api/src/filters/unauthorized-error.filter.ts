import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { UnauthorizedError } from 'express-jwt';

@Catch(UnauthorizedError)
export class UnauthorizedErrorFilter implements ExceptionFilter {
  catch(exception: UnauthorizedError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = exception.status;

    response
      .status(status)
      .json({
        statusCode: status,
        error: exception.code,
        message: exception.message,
      });
  }
}
