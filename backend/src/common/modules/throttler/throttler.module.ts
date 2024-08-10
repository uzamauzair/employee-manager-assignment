import { AppConfigModule, AppConfigService } from '../../../config/app';
import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
@Module({
    imports: [
        AppConfigModule,
        ThrottlerModule.forRootAsync({
            imports: [AppConfigModule],
            inject: [AppConfigService],
            useFactory: (config: AppConfigService) => [
                {
                    limit: config.throttleLimit,
                    ttl: config.throttleTTL,
                },
            ],
        }),
    ],
})
export class ThrottlerConfigModule {}
