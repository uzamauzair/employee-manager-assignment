import {
    BadRequestException,
    CallHandler,
    ConflictException,
    ExecutionContext,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    Logger,
    NestInterceptor,
    NotFoundException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
    private readonly logger = new Logger('LoggingInterceptor');

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();

        return next.handle().pipe(
            catchError((err) => {
                if (err instanceof NotFoundException) {
                    this.logger.error({
                        method: request.method,
                        statusCode: HttpStatus.NOT_FOUND,
                        timestamp: new Date().toISOString(),
                        type: HttpStatus[HttpStatus.NOT_FOUND],
                        url: request.url,
                    });
                    return throwError(() => err);
                } else if (err instanceof ConflictException) {
                    this.logger.error({
                        method: request.method,
                        statusCode: HttpStatus.CONFLICT,
                        timestamp: new Date().toISOString(),
                        type: HttpStatus[HttpStatus.CONFLICT],
                        url: request.url,
                    });
                    return throwError(() => err);
                } else if (err instanceof BadRequestException) {
                    this.logger.error({
                        method: request.method,
                        statusCode: HttpStatus.BAD_REQUEST,
                        timestamp: new Date().toISOString(),
                        type: HttpStatus[HttpStatus.BAD_REQUEST],
                        url: request.url,
                    });
                    return throwError(() => err);
                } else {
                    this.logger.error({
                        method: request.method,
                        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                        timestamp: new Date().toISOString(),
                        url: request.url,
                    });
                    return throwError(() => new InternalServerErrorException());
                }
            }),
        );
    }
}
