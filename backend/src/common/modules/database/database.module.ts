import { MongoConfigModule, MongoConfigService } from 'src/config/database/mongo';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongooseAutopopulate from 'mongoose-autopopulate';
@Module({
    imports: [
        MongoConfigModule,
        MongooseModule.forRootAsync({
            imports: [MongoConfigModule],
            inject: [MongoConfigService],
            useFactory: async (mongoConfigService: MongoConfigService) => ({
                connectionFactory: (connection) => {
                    connection.plugin(mongooseAutopopulate);
                    return connection;
                },
                uri: mongoConfigService.mongoUrl,
            }),
        }),
    ],
})
export class DatabaseModule {}
