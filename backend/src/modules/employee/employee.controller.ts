import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
  Query,
  ConflictException,
  NotFoundException,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, UpdateEmployeeDto } from './dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiGetAllResponse, ERRORS, GetAllQueryParams, GetAllResponseDto, MONGODB_ERRORS } from 'src/common';
import { Employee } from './entities';
import { EMPLOYEE_CONSTANTS } from './constants';

@Controller('employee')
@ApiTags('employee')
export class EmployeeController {
  private readonly logger = new Logger(EmployeeController.name);

  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  @ApiQuery({ name: 'start', required: false })
  @ApiQuery({ name: 'limit', required: false })
  @ApiQuery({ name: 'sort', required: false })
  @ApiGetAllResponse(Employee)
  async getAllEmployees(@Query() queryParams?: GetAllQueryParams): Promise<GetAllResponseDto<Employee>> {
    this.logger.log('Fetching all employees');
    try {
      const employees = await this.employeeService.getAllUsers(queryParams);
      return employees;
    } catch (error) {
      throw error;
    }
  }

  @Post()
  async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    this.logger.log('Creating a new employee');
    try {
      return await this.employeeService.createEmployee(createEmployeeDto);
    } catch (error) {
      if (error.code === MONGODB_ERRORS.DUPLICATE_KEY_ERROR) {
        throw new ConflictException();
      }
      throw error;
    }
  }

  @Patch(':id')
  async updateEmployee(
    @Param('id') employeeId: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ): Promise<Employee> {
    this.logger.log(`Updating employee with id ${employeeId}`);
    try {
      const updatedEmployee = await this.employeeService.updateEmployee(employeeId, updateEmployeeDto);
      if (!updatedEmployee || updatedEmployee.isDeleted) {
        throw new NotFoundException(EMPLOYEE_CONSTANTS.EMPLOYEE_NOT_FOUND);
      }
      return updatedEmployee;
    } catch (error) {
      if (error instanceof Error && error.name === MONGODB_ERRORS.CAST_ERROR) {
        throw new BadRequestException(ERRORS.CAST_FAILED);
      }
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteEmployee(@Param('id') employeeId: string): Promise<void> {
    this.logger.log(`Deleting employee with id ${employeeId}`);
    try {
      const deletedUser = await this.employeeService.deleteEmployee(employeeId);
      if (!deletedUser) {
        throw new NotFoundException(EMPLOYEE_CONSTANTS.EMPLOYEE_NOT_FOUND);
      }
    } catch (error) {
      if (error instanceof Error && error.name === MONGODB_ERRORS.CAST_ERROR) {
        throw new BadRequestException(ERRORS.CAST_FAILED);
      }
      throw error;
    }
  }

}
