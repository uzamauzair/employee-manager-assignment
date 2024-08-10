import { Button } from "@/components/atoms/button";
import { Employee } from "@/redux/slices/employeeSlice";

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
      render: (_: any, record: any) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handleEditEmployee(record.id)}
          >
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={() => handleDeleteEmployee(record.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];
};
