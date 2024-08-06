// Core NestJS imports
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

// Swagger module imports
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// Other external imports
import * as compression from 'compression';
import { WinstonModule } from 'nest-winston';

// Application-specific modules and configurations
import { AppModule } from './app.module';
import { loggerConfig } from './common';
import { AppConfigService } from './config/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(loggerConfig),
  });

  const appConfig: AppConfigService = app.get(AppConfigService);

  // Set the global prefix
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  // Configure Swagger
  const config = new DocumentBuilder()
    .setTitle('Backend Service')
    .setDescription('The API description')
    .setVersion('1.0')
    .setBasePath(globalPrefix)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`/${globalPrefix}/swagger`, app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
      whitelist: true,
    }),
  );

  app.enableCors({
    allowedHeaders: 'Content-Type, Accept, Authorization',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    origin: appConfig.origins.split(','),
  });

  app.use(compression());

  await app.listen(appConfig.port);

  const logger = new Logger(appConfig.name);
  logger.log(`Application is running on: ${appConfig.port}`);
}
bootstrap();
