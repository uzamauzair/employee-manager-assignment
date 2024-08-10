import { AppConfigService } from '../../config/app';
import {
  TestSetup, deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
  verifyDataAgainstDTO,
  verifyErrorResponse,
} from '../../common';
import { EmployeeDTOStub } from '../../../test/stubs';
import { Employee, EmployeeSchema } from './entities';
import { GenderType } from './types';

const ENDPOINT = '/employee';

describe('Employee e2e', () => {
  let appConfig: AppConfigService;

  const testSetup: TestSetup<Employee> = new TestSetup(
    Employee,
    EmployeeSchema,
  );

  beforeAll(async () => {
    await testSetup.setup();
    appConfig = testSetup.getApp().get<AppConfigService>(AppConfigService);
  });

  afterAll(async () => {
    await testSetup.tearDown();
  });

  afterEach(async () => {
    await testSetup.clearCollections();
  });

  const createEmployee = async (employeeDto = EmployeeDTOStub()) => {
    return await postRequest(testSetup, ENDPOINT, employeeDto);
  };

  const createMultipleEmployees = async () => {
    const employeeDto1 = EmployeeDTOStub();
    const employeeDto2 = EmployeeDTOStub('employeeF', 'employeeL', 'test@email.com', '0777609615', GenderType.MALE);
    const response1 = await createEmployee(employeeDto1)
    const response2 = await createEmployee(employeeDto2)
    return { response1, response2 };
  };

  describe('createEmployee - /employee (POST)', () => {

    it('should return the saved object', async () => {
      const dto = EmployeeDTOStub()
      const response = await createEmployee(dto);
      const { data } = response.body;
      expect(response.status).toBe(201);
      verifyDataAgainstDTO(data, EmployeeDTOStub());
    });

    it.each([
      [{ ...EmployeeDTOStub(), firstName: '' }, 'firstName must be longer than or equal to 6 characters'],
      [{ ...EmployeeDTOStub(), lastName: '' }, 'lastName must be longer than or equal to 6 characters'],
      [{ ...EmployeeDTOStub(), email: '' }, 'email must be an email'],
      [{ ...EmployeeDTOStub(), phoneNumber: '' }, 'Phone number is not valid'],
      [{ ...EmployeeDTOStub(), gender: '' }, 'gender must be one of the following values: M, F']
    ])('should throw a validation error', async (invalidDto, errorMessage) => {
      const response = await createEmployee(invalidDto);
      verifyErrorResponse(response, 400, errorMessage);
    });

    it('should handle concurrent employee creation without conflicts', async () => {
      const employeeDto1 = EmployeeDTOStub();
      const employeeDto2 = EmployeeDTOStub('employeeF', 'employeeL', 'test@email.com', '0777609615', GenderType.MALE);
      const [response1, response2] = await Promise.all([
        createEmployee(employeeDto1),
        createEmployee(employeeDto2),
      ]);
      verifyDataAgainstDTO(response1.body.data, employeeDto1);
      verifyDataAgainstDTO(response2.body.data, employeeDto2);
    });

    it('should throw a conflict exception for duplicate entry', async () => {
      const employeeDto = EmployeeDTOStub();
      await createEmployee(employeeDto);
      const response = await createEmployee(employeeDto);
      verifyErrorResponse(response, 409, 'Employee Already Exist in this email');
    });

    it('should be able to create a soft deleted employee', async () => {
      const employeeDto = EmployeeDTOStub();
      const response = await createEmployee(employeeDto);
      const employeeId = response.body.data._id;

      const deletedEmployee = await deleteRequest(testSetup, `${ENDPOINT}/${employeeId}`);
      expect(deletedEmployee.status).toBe(204);

      const recreatedEmployee = await createEmployee(employeeDto);
      const { data } = recreatedEmployee.body;
      verifyDataAgainstDTO(data, employeeDto);
    });
  })

  describe('getEmployee - /employees (GET)', () => {
    beforeEach(() => {
    });

    it('should return an array of Employees', async () => {
      const employeeDto = EmployeeDTOStub();
      await createEmployee(employeeDto);
      const response = await getRequest(testSetup, ENDPOINT);
      const { data } = response.body;
      expect(data.items.length).toBe(1);
      verifyDataAgainstDTO(data.items[0], employeeDto);
      expect(data.count).toBe(1);
    });

    it('should return an empty array', async () => {
      const response = await getRequest(testSetup, ENDPOINT);
      const { data } = response.body;
      expect(data.items.length).toBe(0);
      expect(data.count).toBe(0);
    });

    it('should return employees with limit', async () => {
      const { response1 } = await createMultipleEmployees();
      const response = await getRequest(testSetup, ENDPOINT, { limit: 1, start: 0 });
      const { data } = response.body;
      expect(data.items.length).toBe(1);
      verifyDataAgainstDTO(data.items[0], response1.body.data);
      expect(data.count).toBe(2);
    });

    it('should return employees with limit and start', async () => {
      const { response2 } = await createMultipleEmployees();
      const response = await getRequest(testSetup, ENDPOINT, { limit: 1, start: 1 });
      const { data } = response.body;
      expect(data.items.length).toBe(1);
      verifyDataAgainstDTO(data.items[0], response2.body.data);
      expect(data.count).toBe(2);
    });

    it('should return employees with start, limit and sorted by createdAt in descending order', async () => {
      const { response1 } = await createMultipleEmployees();
      const response = await getRequest(testSetup, ENDPOINT, {
        limit: 1,
        sort: '-createdAt',
        start: 1,
      });
      const { data } = response.body;
      expect(data.items.length).toBe(1);
      verifyDataAgainstDTO(data.items[0], response1.body.data);
      expect(data.count).toBe(2);
    });
  });

  describe('deleteEmployee - /employee/:id (DELETE)', () => {
    let employeeId: string;
    beforeEach(async () => {
      const response = await createEmployee();
      employeeId = response.body.data._id;
    });

    it('should soft delete a employee by id', async () => {
      const response = await deleteRequest(testSetup, `${ENDPOINT}/${employeeId}`);
      expect(response.status).toBe(204);
      const deletedEmployee = await getRequest(testSetup, `${ENDPOINT}/${employeeId}`);
      expect(deletedEmployee.status).toBe(404);
    });

    it('should return 404 when employee is not found', async () => {
      const response = await deleteRequest(testSetup, `${ENDPOINT}/${testSetup.invalidId}`);
      expect(response.status).toBe(404);
    });
  });

  describe('updateEmployee - /employee/:id (PATCH)', () => {
    let employeeId: string;
    beforeEach(async () => {
      const response = await createEmployee();
      employeeId = response.body.data._id;
    });

    it('should return the updated user', async () => {
      const updateDto = EmployeeDTOStub('Usama Uza');
      const response = await patchRequest(testSetup, `${ENDPOINT}/${employeeId}`, updateDto);
      const { data } = response.body;
      expect(data.firstName).toBe('Usama Uza');
      verifyDataAgainstDTO(data, updateDto);
    });

    it.each([
      [{ ...EmployeeDTOStub(), firstName: '' }, 'firstName must be longer than or equal to 6 characters'],
      [{ ...EmployeeDTOStub(), lastName: '' }, 'lastName must be longer than or equal to 6 characters'],
      [{ ...EmployeeDTOStub(), email: '' }, 'email must be an email'],
      [{ ...EmployeeDTOStub(), phoneNumber: '' }, 'Phone number is not valid'],
      [{ ...EmployeeDTOStub(), gender: '' }, 'gender must be one of the following values: M, F']
    ])('should throw a validation error', async (invalidDto, errorMessage) => {
      const response = await patchRequest(testSetup, `${ENDPOINT}/${employeeId}`, invalidDto);
      verifyErrorResponse(response, 400, errorMessage);
    });

    it('should return 404 when user is not found', async () => {
      const response = await patchRequest(
        testSetup,
        `${ENDPOINT}/${testSetup.invalidId}`,
        EmployeeDTOStub('Usama Uza'),
      );
      expect(response.status).toBe(404);
    });
  });

})