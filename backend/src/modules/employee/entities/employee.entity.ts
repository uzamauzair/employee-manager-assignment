import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { GenderType } from '../types';

export type EmployeeDocument = HydratedDocument<Employee>;

@Schema({ timestamps: true })
export class Employee {
    @Prop({ required: true, minlength: 6, maxlength: 10 })
    @ApiProperty()
    firstName: string;

    @Prop({ required: true, minlength: 6, maxlength: 10 })
    @ApiProperty()
    lastName: string;

    @Prop({ required: true, unique: true })
    @ApiProperty()
    email: string;

    @Prop({ required: true })
    phoneNumber: string;

    @Prop({ required: true, enum: GenderType })
    gender: string;

    @Prop({ default: false })
    isDeleted: boolean;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
