import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger('RequestMiddleware');

    use(req: Request, res: Response, next: NextFunction) {

        res.on('finish', () => {
            const statusCode = res.statusCode;
            if (statusCode === 401 || statusCode === 404 || statusCode === 405) {
                this.logger.warn({
                    method: req.method,
                    statusCode: statusCode,
                    timestamp: new Date().toISOString(),
                    type: 'Request',
                    url: req.url,
                });
            }
        });
        next();
    }
}
