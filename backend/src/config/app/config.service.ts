import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
/**
 * Service dealing with app config based operations.
 *
 * @class
 */
@Injectable()
export class AppConfigService {
    constructor(private configService: ConfigService) {}

    get name(): string {
        return this.configService.get<string>('app.name');
    }
    get env(): string {
        return this.configService.get<string>('app.env');
    }
    get url(): string {
        return this.configService.get<string>('app.url');
    }
    get port(): number {
        return Number(this.configService.get<number>('app.port'));
    }
    get version(): string {
        return this.configService.get<string>('app.version');
    }
    get throttleTTL(): number {
        return Number(this.configService.get<number>('app.throttleTTL'));
    }
    get throttleLimit(): number {
        return Number(this.configService.get<number>('app.throttleLimit'));
    }
    get apiKey(): string {
        return this.configService.get<string>('app.apiKey');
    }
    get origins(): string {
        return this.configService.get<string>('app.origins');
    }
}
