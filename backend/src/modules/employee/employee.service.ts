import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Employee } from './entities';
import { Model } from 'mongoose';
import { GetAllQueryParams, GetAllResponseDto, MONGODB_ERRORS } from 'src/common';

@Injectable()
export class EmployeeService {
  private readonly logger = new Logger(EmployeeService.name);

  constructor(@InjectModel(Employee.name) private readonly employeeModel: Model<Employee>) {}

  async getAllUsers(queryParams?: GetAllQueryParams): Promise<GetAllResponseDto<Employee>> {
    try {
      this.logger.log('getAllEmploees()');
      let query = this.employeeModel.find({ isDeleted: false });

      if (queryParams) {
        if (queryParams.start !== undefined) {
          query = query.skip(queryParams.start);
        }
        if (queryParams.limit !== undefined) {
          query = query.limit(queryParams.limit);
        }
        if (queryParams.sort) {
          const sortOptions = queryParams.sort.split(',').map((field) => field.trim());
          query = query.sort(sortOptions.join(' '));
        }
      }

      const items = await query.lean().exec();
      const count = await this.employeeModel.countDocuments({
        isDeleted: false,

      });
      return { count, items };
    } catch (error) {
      throw error;
    }
  }

  async createEmployee(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    try {
      this.logger.log('createEmployee()');
      const res = await this.employeeModel.deleteOne({ email: createEmployeeDto.email, isDeleted: true }).lean().exec();

      const employee = await this.employeeModel.findOne({ email: createEmployeeDto.email }).lean().exec();
      console.log("empl", employee);

      if (employee) {
        return employee;
      }
      const newUser = new this.employeeModel(createEmployeeDto);
      return await newUser.save();
    } catch (error) {
      if (error.code === MONGODB_ERRORS.DUPLICATE_KEY_ERROR) {
        throw new ConflictException();
      }
      throw error;
    }
  }

  async updateEmployee(employeeId: string, updateEmployeeDto: UpdateEmployeeDto): Promise<Employee | null> {
    try {
      this.logger.log('updateEmployee()');
      const updatedEmployee = await this.employeeModel
        .findByIdAndUpdate(employeeId, updateEmployeeDto, {
          new: true,
        })
        .lean()
        .exec();

      return updatedEmployee;
    } catch (error) {
      throw error;
    }
  }

  async deleteEmployee(employeeId: string): Promise<Employee> {
    try {
      this.logger.log('deleteEmployee()');
      const deletedEmployee = await this.employeeModel
        .findByIdAndUpdate(employeeId, { isDeleted: true }, { new: true })
        .lean()
        .exec();
      return deletedEmployee;
    } catch (error) {
      throw error;
    }
  }

}
