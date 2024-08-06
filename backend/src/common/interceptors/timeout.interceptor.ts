import {
    CallHandler,
    ExecutionContext,
    HttpStatus,
    Injectable,
    Logger,
    NestInterceptor,
    RequestTimeoutException,
} from '@nestjs/common';
import { Observable, TimeoutError, throwError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
    private readonly logger = new Logger('LoggingInterceptor');

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();

        return next.handle().pipe(
            timeout(5000),
            catchError((err) => {
                if (err instanceof TimeoutError) {
                    this.logger.warn({
                        method: request.method,
                        statusCode: HttpStatus.REQUEST_TIMEOUT,
                        timestamp: new Date().toISOString(),
                        type: HttpStatus[HttpStatus.REQUEST_TIMEOUT],
                        url: request.url,
                    });
                    return throwError(() => new RequestTimeoutException());
                }
                return throwError(() => err);
            }),
        );
    }
}
