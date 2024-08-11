"use client";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { setErrorToast, setSuccessToast } from "@/functions/toast.function";
import { addEmployee, AppDispatch, RootState } from "@/redux";
import { EmployeeFormData, EmployeeSchema } from "@/validators";

export const useAddEmployeeForm = () => {
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

    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state: RootState) => state.employee.loading);
    const error = useSelector((state: RootState) => state.employee.error);

    const onSubmit = async (data: EmployeeFormData) => {
        try {
            const response = await dispatch(addEmployee(data)).unwrap();
            if (response) {
                form.reset();
                setSuccessToast("Employee Successfully Created");
            }
        } catch (err) {
            console.error("Failed to add employee:", err);
            setErrorToast("Failed to create Employee, try again");
        }
    };

    return {
        form,
        loading,
        error,
        onSubmit,
    };
};
