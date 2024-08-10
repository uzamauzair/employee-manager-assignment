import { CacheConfigModule } from 'src/config/cache/config.module';
import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { CacheService } from './cache.service';
import { CacheConfigService } from 'src/config/cache';

@Module({
    exports: [NestCacheModule],
    imports: [
        CacheConfigModule,
        NestCacheModule.registerAsync({
            imports: [CacheConfigModule],
            inject: [CacheConfigService],
            useClass: CacheService,
        }),
    ],
})
export class CacheModule {}
