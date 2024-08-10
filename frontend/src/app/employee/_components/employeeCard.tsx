import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/molucules/card/card";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Button } from "@/components/atoms/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/molucules/alert-dialog/alert-dialog";

type EmployeeCardProps = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  onEdit: () => void;
  onDelete: () => void;
};

export const EmployeeCard = ({
  firstName,
  lastName,
  email,
  phoneNumber,
  gender,
  onEdit,
  onDelete,
}: EmployeeCardProps) => {
  return (
    <Card className="w-full h-full p-4 hover:scale-95 duration-200 ease-linear relative border border-black">
      <CardHeader>
        <CardTitle>{`${firstName} ${lastName}`}</CardTitle>
        <CardDescription>{email}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Phone: {phoneNumber}</p>
        <p>Gender: {gender === "M" ? "Male" : "Female"}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="link"
          onClick={onEdit}
          className="text-blue-500 hover:text-blue-700"
        >
          <FaEdit size={30} />
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="link" className="text-red-500 hover:text-red-700">
              <FaTrashAlt size={30} />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                employee.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};
