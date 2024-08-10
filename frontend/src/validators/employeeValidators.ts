import * as yup from "yup";
import { emailValidator, nameValidator } from "./comonValidators";

// Phone number regex expression
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const phoneNumberValidator = yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required("required")
    .min(10, "too short")
    .max(10, "too long");

export const genderValidator = yup
    .string()
    .oneOf(['M', 'F'], 'Gender must be either M or F')
    .required("required")

export const EmployeeSchema = yup
    .object()
    .shape({
        firstName: nameValidator,
        lastName: nameValidator,
        email: emailValidator,
        phoneNumber: phoneNumberValidator,
        gender: genderValidator
    })
    .required();

export type EmployeeFormData = yup.InferType<typeof EmployeeSchema>;
