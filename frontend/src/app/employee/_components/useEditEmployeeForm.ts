"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch, fetchEmployees, updateEmployee } from "@/redux";
import { EmployeeFormData, EmployeeSchema } from "@/validators/employeeValidators";
import { setErrorToast, setSuccessToast } from "@/functions/toast.function";
import { useRouter } from "next/navigation";

export const useEditEmployeeForm = (employeeId: string) => {
    const dispatch = useDispatch<AppDispatch>();
    const employee = useSelector((state: RootState) =>
        state.employee.employees.find((emp) => emp._id === employeeId)
    );
    const router = useRouter();

    const form = useForm<EmployeeFormData>({
        resolver: yupResolver(EmployeeSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            gender: "M",
        },
    });

    useEffect(() => {
        if (employee) {
            form.reset(employee);
        } else {
            dispatch(fetchEmployees());
        }
    }, [employee, dispatch, form]);

    const onSubmit = async (data: any) => {
        try {
            const { _id, createdAt, updatedAt, __v, ...filteredData } = data;

            const response = await dispatch(
                updateEmployee({ empId: employeeId, updatedEmployee: filteredData })
            ).unwrap();
            if (response) {
                setSuccessToast("Employee Successfully Updated");
                router.push("/employee/list");
            }
        } catch (err) {
            console.error("Failed to update employee:", err);
            setErrorToast("Failed to update Employee, try again");
        }
    };

    return {
        form,
        employee,
        onSubmit,
    };
};
