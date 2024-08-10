import { AppConfigService } from '../../config/app';
import {
  TestSetup, deleteRequest,
  getRequest,
  postRequest,
  verifyDataAgainstDTO,
  verifyErrorResponse,
} from '../../common';
import { EmployeeDTOStub } from '../../../test/stubs';
import { Employee, EmployeeSchema } from './entities';

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

  describe('createEmployee - /employee (POST)', () => {

    it('should return the saved object', async () => {
      const dto = EmployeeDTOStub()
      console.log("dto", dto);

      const response = await createEmployee(dto);
      console.log("response", response.body);

      const { data } = response.body;
      expect(response.status).toBe(201);
      verifyDataAgainstDTO(data, EmployeeDTOStub());
    });
  })

})