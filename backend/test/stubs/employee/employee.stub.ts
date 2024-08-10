import { CreateEmployeeDto } from "../../../src/modules/employee/dto";
import { GenderType } from "../../../src/modules/employee/types";

export const EmployeeDTOStub = (
    firstName?: string,
    lastName?: string,
    email?: string,
    phoneNumber?: string,
    gender?: GenderType,
): CreateEmployeeDto => {
    return {
        firstName: firstName ?? 'Johnyee',
        lastName: lastName ?? 'Delowee',
        email: email ?? 'johndoe@test.com',
        phoneNumber: phoneNumber ?? '0777654321',
        gender: gender ?? GenderType.MALE,
    };
};
