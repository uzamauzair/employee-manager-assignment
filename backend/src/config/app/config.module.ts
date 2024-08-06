import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from './config.service';
import configuration from './configuration';
/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
    exports: [ConfigService, AppConfigService],
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            validationSchema: Joi.object({
                APP_API_KEY: Joi.string().default('secretKey'),
                APP_ENV: Joi.string().valid('dev', 'staging', 'production').default('dev'),
                APP_NAME: Joi.string().default('Employee-Manager'),
                APP_ORIGINS: Joi.string().default('http://localhost:3000'),
                APP_PORT: Joi.number().default(3001),
                APP_URL: Joi.string().default('http://localhost:3001'),
                APP_VERSION: Joi.string().default('1.0'),
                THROTTLE_LIMIT: Joi.number().default(10),
                THROTTLE_TTL: Joi.number().default(60),
            }),
        }),
    ],
    providers: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
