import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsEnum, IsOptional, Length, IsBoolean } from 'class-validator';
import { GenderType } from '../types';

export class CreateEmployeeDto {
    @IsString()
    @Length(6, 10)
    firstName: string;

    @IsString()
    @Length(6, 10)
    lastName: string;

    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    contact?: string;

    @IsString()
    phoneNumber: string;

    @IsEnum(GenderType)
    gender: string;

    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;
}
