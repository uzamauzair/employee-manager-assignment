import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchEmployees, addEmployee, updateEmployee, deleteEmployee } from '../actions';

export interface Employee {
    _id?: string;  // Updated to string to reflect MongoDB's ObjectId
    firstName?: string;
    lastName?: string;
    email?: string;
    phoneNumber?: string;
    gender?: 'M' | 'F';
}

export interface ApiResponse {
    data: {
        items: Employee[];
    };
}

export interface EmployeeState {
    employees: Employee[];
    loading: boolean;
    error: string | null;
}

const initialState: EmployeeState = {
    employees: [],
    loading: false,
    error: null,
};

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<Employee[]>) => {
                state.loading = false;
                state.employees = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload.error.message;
            })
            .addCase(addEmployee.fulfilled, (state, action: PayloadAction<Employee>) => {
                state.employees.push(action.payload);
            })
            .addCase(updateEmployee.fulfilled, (state, action: PayloadAction<Employee>) => {
                const index = state.employees.findIndex(emp => emp._id === action.payload._id);
                if (index !== -1) {
                    state.employees[index] = action.payload;
                }
            })
            .addCase(deleteEmployee.fulfilled, (state, action: PayloadAction<string>) => {
                state.employees = state.employees.filter(emp => emp._id !== action.payload);
            });
    },
});

export const { resetError } = employeeSlice.actions;

export default employeeSlice.reducer;
