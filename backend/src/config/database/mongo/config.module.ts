import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoConfigService } from './config.service';
import configuration from './configuration';
/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
    exports: [ConfigService, MongoConfigService],
    imports: [
        ConfigModule.forRoot({
            load: [configuration],
            validationSchema: Joi.object({
                MONGO_URL: Joi.string().default('mongodb://localhost:27017/techza-dev'),
            }),
        }),
    ],
    providers: [ConfigService, MongoConfigService],
})
export class MongoConfigModule {}
