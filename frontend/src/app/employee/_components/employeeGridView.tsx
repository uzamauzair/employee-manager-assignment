"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { selectEmployees, selectLoading, selectError } from "@/redux";
import { EmployeeCard } from "./employeeCard";
import Loader from "@/components/atoms/loader/loader";
import { deleteEmployee } from "@/redux/actions/employeeActions";
import { AppDispatch } from "@/redux/store";
import Pagination from "@/components/molucules/pagination/paginiation";
import { Button } from "@/components/atoms/button";

export const EmployeeGrid = () => {
  const employees = useSelector(selectEmployees);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const totalPages = Math.ceil(employees.length / pageSize);

  const handleEdit = (id: string) => {
    router.push(`/employee/edit/${id}`);
  };

  const handleAdd = () => {
    router.push(`/employee/add`);
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteEmployee(id)).unwrap();
    } catch (err) {
      console.error("Failed to delete employee: ", err);
    }
  };

  // Calculate paginated employees
  const paginatedEmployees = employees.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto">
      {/* Employee Count */}
      <div className="text-[20px] flex items-center justify-between w-full">
        <h2 className="text-[20px]">Total Employees: {employees.length}</h2>
        <Button variant="default" size="lg" onClick={handleAdd}>
          Add Employee
        </Button>
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-10">
        {paginatedEmployees.map((employee) => (
          <EmployeeCard
            key={employee._id}
            firstName={employee.firstName}
            lastName={employee.lastName}
            email={employee.email}
            phoneNumber={employee.phoneNumber}
            gender={employee.gender}
            onEdit={() => handleEdit(employee._id!)}
            onDelete={() => handleDelete(employee._id!)}
          />
        ))}
        {paginatedEmployees.length === 0 && (
          <h1 className="text-center w-full h-[50vh] text-xl font-bold col-span-4">
            No Employees Found
          </h1>
        )}
      </div>

      {/* Reusable Pagination Component */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
