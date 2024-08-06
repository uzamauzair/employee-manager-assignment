import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class MongoConfigService {
    constructor(private configService: ConfigService) {}

    get mongoUrl(): string {
        return this.configService.get<string>('mongo.mongoUrl');
    }
}
