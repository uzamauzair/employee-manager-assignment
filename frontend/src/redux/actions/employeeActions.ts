import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '@/utils';
import { Employee, ApiResponse } from '../slices';

const EMPLOYEE_ENDPOINT = '/employee';

export const fetchEmployees = createAsyncThunk<Employee[]>('employee/fetchEmployees', async () => {
    const response = await api.get<ApiResponse>(`${EMPLOYEE_ENDPOINT}`);
    return response.data.data.items
});

export const addEmployee = createAsyncThunk<Employee, Employee>('employee/addEmployee', async (newEmployee) => {
    const response = await api.post<Employee>(`${EMPLOYEE_ENDPOINT}`, newEmployee);
    return response.data;
});

export const updateEmployee = createAsyncThunk<Employee, { empId: string; updatedEmployee: Employee }>(
    'employee/updateEmployee',
    async ({ empId, updatedEmployee }) => {
        const response = await api.put<Employee>(`${EMPLOYEE_ENDPOINT}/${empId}`, updatedEmployee);
        return response.data;
    }
);

export const deleteEmployee = createAsyncThunk<string, string>('employee/deleteEmployee', async (empId) => {
    await api.delete(`${EMPLOYEE_ENDPOINT}/${empId}`);
    return empId;
});
