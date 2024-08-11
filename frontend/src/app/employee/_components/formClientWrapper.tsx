"use client";

import React, { useEffect } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  RadioGroup,
  RadioGroupItem,
  Label,
  Input,
  Button,
  Loader,
} from "@/components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  AppDispatch,
  fetchEmployees,
  addEmployee,
  updateEmployee,
} from "@/redux";
import {
  EmployeeFormData,
  EmployeeSchema,
} from "@/validators/employeeValidators";
import { setErrorToast, setSuccessToast } from "@/functions/toast.function";
import { useRouter } from "next/navigation";

interface ClientWrapperProps {
  employeeId?: string;
}

export const FormClientWrapper = ({ employeeId }: ClientWrapperProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const employee = useSelector((state: RootState) =>
    state.employee.employees.find((emp) => emp._id === employeeId)
  );

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
    if (employeeId) {
      if (employee) {
        form.reset(employee);
      } else {
        dispatch(fetchEmployees());
      }
    }
  }, [employee, employeeId, dispatch, form]);

  const onSubmit = async (data: any) => {
    try {
      if (employeeId) {
        const { _id, createdAt, updatedAt, __v, ...filteredData } = data;
        const response = await dispatch(
          updateEmployee({ empId: employeeId, updatedEmployee: filteredData })
        ).unwrap();
        if (response) {
          setSuccessToast("Employee Successfully Updated");
          router.push("/employee/list");
        }
      } else {
        const response = await dispatch(addEmployee(data)).unwrap();
        if (response) {
          form.reset();
          setSuccessToast("Employee Successfully Created");
        }
      }
    } catch (err) {
      console.error(
        `Failed to ${employeeId ? "update" : "create"} employee:`,
        err
      );
      setErrorToast(
        `Failed to ${employeeId ? "update" : "create"} Employee, try again`
      );
    }
  };

  if (employeeId && !employee) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-[400px] space-y-8"
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  id="firstName"
                  placeholder="First Name of the Employee"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  id="lastName"
                  placeholder="Last Name of the Employee"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  placeholder="Email of the Employee"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  id="phoneNumber"
                  placeholder="Phone Number of the Employee"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioGroup value={field.value} onValueChange={field.onChange}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="M" id="option-male" />
                    <Label htmlFor="option-male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="F" id="option-female" />
                    <Label htmlFor="option-female">Female</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button id="button" type="submit">
          {employeeId ? "Update" : "Create"}
        </Button>
      </form>
    </Form>
  );
};
