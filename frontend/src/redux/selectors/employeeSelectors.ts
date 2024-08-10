import { RootState } from '../store';

export const selectEmployees = (state: RootState) => state.employee.employees;
export const selectLoading = (state: RootState) => state.employee.loading;
export const selectError = (state: RootState) => state.employee.error;
