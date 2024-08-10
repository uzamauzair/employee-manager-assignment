import { Button } from "@/components/atoms/button";
import { Employee } from "@/redux";
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

export const getEmployeeTableColumns = (
  handleEditEmployee: (empId: string) => void,
  handleDeleteEmployee: (empId: string) => void
) => {
  return [
    {
      title: "First Name",
      dataIndex: "firstName" as keyof Employee,
    },
    {
      title: "Last Name",
      dataIndex: "lastName" as keyof Employee,
    },
    {
      title: "Email",
      dataIndex: "email" as keyof Employee,
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber" as keyof Employee,
    },
    {
      title: "Gender",
      dataIndex: "gender" as keyof Employee,
    },
    {
      title: "Actions",
      dataIndex: "actions" as keyof Employee,
      render: (_: any, record: Employee) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleEditEmployee(record._id!)}
          >
            Edit
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  employee.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => handleDeleteEmployee(record._id!)}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ];
};
