
import { AllExceptionsFilter } from '../filters';
import { ErrorsInterceptor, TimeoutInterceptor, TransformInterceptor } from '../interceptors';
import { AppConfigModule } from '../../config/app';
import { INestApplication, Injectable, Type, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Connection, Model, Schema, connect } from 'mongoose';
import { EmployeeModule } from '../../modules/employee/employee.module';

/**
 * This class is used to setup a test environment for a controller.
 * T is the type of the mongoose schema
 */
@Injectable()
export class TestSetup<T> {
    private mongod: MongoMemoryServer;
    private mongoConnection: Connection;
    model: Model<T>;
    private app: INestApplication;
    public invalidId = '64803e8e0b752a0f3a2f7234';

    constructor(
        private modelClass: Type<T>,
        private schema: Schema<T>,
    ) {}

    public async setup(): Promise<void> {
        this.mongod = await MongoMemoryServer.create();
        const uri = this.mongod.getUri();
        this.mongoConnection = (await connect(uri)).connection;
        this.model = this.mongoConnection.model<T>(this.modelClass.name, this.schema);

        const module: TestingModule = await Test.createTestingModule({
            imports: [
                AppConfigModule,
                EmployeeModule,
                MongooseModule.forRoot(uri),
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
                    provide: getModelToken(this.modelClass.name),
                    useValue: this.model,
                },
            ],
        }).compile();

        this.app = module.createNestApplication();
        this.app.useGlobalPipes(
            new ValidationPipe({
                forbidNonWhitelisted: true,
                transform: true,
                whitelist: true,
            }),
        );
        await this.app.init();
    }

    public async tearDown(): Promise<void> {
        await this.mongoConnection.dropDatabase();
        await this.mongoConnection.close();
        await this.mongod.stop();
        if (this.app) {
            await this.app.close();
        }
    }

    public async clearCollections(): Promise<void> {
        const collections = this.mongoConnection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany();
        }
    }

    public getHttpServer() {
        return this.app.getHttpServer();
    }
    public getApp(): INestApplication {
        return this.app;
    }
}
