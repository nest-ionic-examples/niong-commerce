import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { UnauthorizedError } from 'express-jwt';

@Catch(UnauthorizedError)
export class UnauthorizedErrorFilter implements ExceptionFilter {
  catch(exception: UnauthorizedError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const status = exception.status;

    const message = exception.message === 'jwt expired'
      ? 'Your session has expired please login again'
      : exception.message;
    response
      .status(status)
      .json({
        statusCode: status,
        error: exception.code,
        message,
      });
  }
}
