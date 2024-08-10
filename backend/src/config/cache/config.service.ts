import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class CacheConfigService {
    constructor(private configService: ConfigService) {}

    get cacheTTL(): string {
        return this.configService.get<string>('cache.cacheTTL');
    }
    get cacheItems(): string {
        return this.configService.get<string>('cache.cacheItems');
    }
}
