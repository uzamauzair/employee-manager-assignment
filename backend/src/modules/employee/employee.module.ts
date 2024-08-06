import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { Employee, EmployeeSchema } from './entities';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from 'src/config/app';

@Module({
  controllers: [EmployeeController],
  imports: [
    MongooseModule.forFeature([
      {
        name: Employee.name,
        schema: EmployeeSchema,
      },
    ]),
    AppConfigModule,
  ],
  providers: [EmployeeService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
