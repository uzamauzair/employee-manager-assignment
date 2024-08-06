import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
    catch(exception: unknown, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const httpStatus =
            exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const message =
            exception instanceof HttpException
                ? exception.getResponse()['message']
                : 'Internal Server Error';

        const error =
            exception instanceof HttpException
                ? exception.getResponse()['error']
                : HttpStatus[httpStatus];

        const responseBody = {
            error,
            message,
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
            statusCode: httpStatus,
            timestamp: new Date().toISOString(),
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
}
