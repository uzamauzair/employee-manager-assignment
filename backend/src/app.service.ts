import { AppConfigService } from "./config/app";
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly configService: AppConfigService) {}
  getHealthStatus(): object {
    return {
      APP_NAME: this.configService.name,
      APP_VERSION: this.configService.version,
      TIMESTAMP: new Date().toISOString(),
    };
  }
}
