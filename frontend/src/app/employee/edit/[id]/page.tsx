"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  RootState,
  AppDispatch,
  fetchEmployees,
  updateEmployee,
} from "@/redux";
import {
  EmployeeFormData,
  EmployeeSchema,
} from "@/validators/employeeValidators";
import { Button } from "@/components/atoms/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { setErrorToast, setSuccessToast } from "@/functions/toast.function";
import { useRouter } from "next/navigation";

const EditEmployee = ({ params }: { params: { id: string } }) => {
  const dispatch = useDispatch<AppDispatch>();
  const employee = useSelector((state: RootState) =>
    state.employee.employees.find((emp) => emp._id === params.id)
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
      dispatch(fetchEmployees()); // Fetch employees if not already fetched
    }
  }, [employee, dispatch, form]);

  const onSubmit = async (data: any) => {
    try {
      const { _id, createdAt, updatedAt, __v, ...filteredData } = data;

      const response = await dispatch(
        updateEmployee({ empId: params.id, updatedEmployee: filteredData })
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

  if (!employee) {
    return <div>Loading...</div>; // or handle loading state appropriately
  }

  return (
    <>
      <div className="flex justify-center items-center my-10">
        <Card className="border border-yellow-950 px-5 pb-5">
          <CardHeader>
            <CardTitle>Edit Employee</CardTitle>
            <CardDescription>Update the employee details</CardDescription>
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
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <RadioGroup
                          value={field.value}
                          onValueChange={field.onChange} // use onValueChange instead of onChange for correct event handling
                        >
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
                  Update
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default EditEmployee;
