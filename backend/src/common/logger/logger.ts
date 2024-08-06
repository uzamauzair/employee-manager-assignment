import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import { createLogger, format, transports } from 'winston';
import DailyRotateFile = require('winston-daily-rotate-file');

export const loggerConfig = createLogger({
    transports: [
        new DailyRotateFile({
            datePattern: 'YYYY-MM-DD',
            filename: 'logs/errors/%DATE%-error.log',
            format: format.combine(format.timestamp(), format.json()),
            level: 'error',
            maxFiles: '30d',
            zippedArchive: false,
        }),
        // same for all levels
        new DailyRotateFile({
            datePattern: 'YYYY-MM-DD',
            filename: 'logs/combined/%DATE%-combined.log',
            format: format.combine(format.timestamp(), format.json()),
            maxFiles: '30d',
            zippedArchive: false,
        }),
        new transports.Console({
            format: format.combine(
                format.timestamp(),
                format.ms(),
                nestWinstonModuleUtilities.format.nestLike('App', {
                    colors: true,
                    prettyPrint: true,
                }),
            ),
        }),
    ],
});
