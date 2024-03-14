import 'dotenv/config';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger: Logger;
  constructor() {
    this.logger = new Logger();
  }
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error development';

    let errorMessage = message;

    if (
      exception['response'] &&
      exception['response']['message'] != null &&
      exception['response']['message'] != ''
    ) {
      errorMessage = exception['response']['message'];
    } else if (
      exception['response'] &&
      exception['response']['message'] == undefined &&
      exception['response'] != ''
    ) {
      errorMessage = exception['response'];
    } else if (exception?.message) {
      errorMessage = exception?.message;
    }

    const errorResponse: {
      statusCode: number;
      error: string;
      message: string[];
    } = {
      statusCode,
      error: exception?.name,
      message: Array.isArray(errorMessage) ? errorMessage : [errorMessage],
    };

    this.logger.log(
      `request method: ${request.method} request url${request.url}`,
      JSON.stringify(errorResponse),
    );
    response.status(statusCode).json(errorResponse);
  }
}
