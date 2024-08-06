// Core NestJS imports
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

// Config modules
import { AppConfigModule } from './config/app';

// Application controllers and services
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Common modules
import { DatabaseModule } from './common/modules/database';

// Application-specific modules
import { EmployeeModule } from './modules/employee/employee.module';

// Middleware and interceptors
import {
  AllExceptionsFilter,
  ErrorsInterceptor,
  LoggingInterceptor,
  RequestLoggerMiddleware,
  TimeoutInterceptor,
  TransformInterceptor
} from './common';


@Module({
  controllers: [AppController],
  imports: [
    AppConfigModule,
    DatabaseModule,
    EmployeeModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TimeoutInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    AppService,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
