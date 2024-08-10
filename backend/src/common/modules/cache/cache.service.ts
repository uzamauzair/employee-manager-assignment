import { CacheConfigService } from 'src/config/cache';
import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheService implements CacheOptionsFactory {
    constructor(private readonly configService: CacheConfigService) {}

    createCacheOptions(): CacheModuleOptions {
        const ttl = parseInt(this.configService.cacheTTL, 10);
        const max = parseInt(this.configService.cacheItems, 10);

        return {
            max,
            ttl,
        };
    }
}
