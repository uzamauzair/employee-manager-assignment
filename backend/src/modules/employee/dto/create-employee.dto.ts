import { IsString, IsEmail, IsEnum, IsOptional, Length, IsBoolean } from 'class-validator';
import { GenderType } from '../types';
import { IsPhoneNumber } from '../../../common/decorators';

export class CreateEmployeeDto {
    @IsString()
    @Length(6, 10)
    firstName: string;

    @IsString()
    @Length(6, 10)
    lastName: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber({ message: 'Phone number is not valid' })
    phoneNumber: string;

    @IsEnum(GenderType)
    gender: string;

    @IsOptional()
    @IsBoolean()
    isDeleted?: boolean;
}
