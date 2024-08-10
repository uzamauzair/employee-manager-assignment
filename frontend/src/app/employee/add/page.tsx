"use client";
import { Button } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/molucules/card/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/organisms/form/form";
import { Input } from "@/components/atoms/input/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdownMenu/dropdown-menu";

import { setErrorToast, setSuccessToast } from "@/functions/toast.function";
import { addEmployee, AppDispatch, RootState } from "@/redux";
import {
  EmployeeFormData,
  EmployeeSchema,
} from "@/validators/employeeValidators";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

const AddEmployee = () => {
  const form = useForm<EmployeeFormData>({
    resolver: yupResolver(EmployeeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      gender: "M", // or set to a default like 'M' or 'F' if preferred
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
  return (
    <>
      <div className="flex justify-center items-center my-10 ">
        <Card className="border border-yellow-950 px-5 pb-5">
          <CardHeader>
            <CardTitle>Create Employee</CardTitle>
            <CardDescription>Create a new Employee</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
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
                    <FormItem className="space-x-2">
                      <FormLabel>Select Your Gender</FormLabel>
                      <FormControl>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="default">
                              {field.value === "M"
                                ? "Male"
                                : field.value === "F"
                                ? "Female"
                                : "Select Gender"}
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              onSelect={() => field.onChange("M")}
                            >
                              Male
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onSelect={() => field.onChange("F")}
                            >
                              Female
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button id="button" variant="outline" type="submit">
                  Submit
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AddEmployee;
