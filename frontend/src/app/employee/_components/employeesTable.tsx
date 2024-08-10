"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MainTable } from "@/components";
import {
  fetchEmployees,
  deleteEmployee,
} from "@/redux/actions/employeeActions";
import { selectEmployees, selectLoading, selectError } from "@/redux/selectors";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { getEmployeeTableColumns } from "./employeeTableColumns";
import Loader from "@/components/atoms/loader/loader";

export const EmployeesTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const employees = useSelector(selectEmployees);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const router = useRouter();

  const handleAddEmployee = () => {
    router.push("/employee/add");
  };

  const handleEditEmployee = (empId: string) => {
    router.push(`/employee/edit/${empId}`);
  };

  const handleDeleteEmployee = async (empId: string) => {
    try {
      await dispatch(deleteEmployee(empId)).unwrap();
    } catch (err) {
      console.error("Failed to delete employee: ", err);
    }
  };

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        await dispatch(fetchEmployees()).unwrap();
      } catch (err) {
        console.error("Failed to fetch employees: ", err);
      }
    };
    loadEmployees();
  }, [dispatch]);

  console.log("Employees", employees);

  const columns = getEmployeeTableColumns(
    handleEditEmployee,
    handleDeleteEmployee
  );

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <MainTable
      columns={columns}
      data={employees}
      countTitle="Total Employees"
      count={employees.length}
      action={handleAddEmployee}
      label="Add Employee"
      pagination={true}
      pageSize={10}
    />
  );
};
