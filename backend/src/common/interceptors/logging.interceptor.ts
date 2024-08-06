import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CONSTANTS } from '../constants';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new Logger('LoggingInterceptor');
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        this.logger.log({
            method: request.method,
            timestamp: new Date().toISOString(),
            type: CONSTANTS.REQUEST,
            url: request.url,
        });
        const now = Date.now();

        return next.handle().pipe(
            tap(() =>
                this.logger.log({
                    method: request.method,
                    responseTime: Date.now() - now,
                    timestamp: new Date().toISOString(),
                    type: CONSTANTS.RESPONSE,
                    url: request.url,
                }),
            ),
        );
    }
}
