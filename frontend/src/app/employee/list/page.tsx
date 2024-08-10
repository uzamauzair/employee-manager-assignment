"use client";
import { useSelector, useDispatch } from "react-redux";
import { EmployeesTable } from "../_components";
import { EmployeeGrid } from "../_components/employeeGridView";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RootState, AppDispatch } from "@/redux/store";
import { toggleView } from "@/redux/slices/viewGridSlice";

const ListEmployees = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isGridView = useSelector((state: RootState) => state.view.isGridView);

  const handleViewToggle = () => {
    dispatch(toggleView());
  };

  return (
    <>
      <div className="flex justify-between items-center w-[90%] m-auto">
        <div className="border-l-[7px] border-black ml-6 mt-6">
          <h1 className="px-4 font-bold text-[25px]">Employees</h1>
        </div>
        {/* Switch to toggle between grid and table view  */}
        <div className="flex items-center space-x-2 mt-6 mr-4">
          <Label> Grid View</Label>
          <Switch
            id="view-toggle"
            checked={isGridView}
            onCheckedChange={handleViewToggle}
          />
        </div>
      </div>

      <div className="container mx-auto my-8 w-[90%]">
        {isGridView ? <EmployeeGrid /> : <EmployeesTable />}
      </div>
    </>
  );
};

export default ListEmployees;
