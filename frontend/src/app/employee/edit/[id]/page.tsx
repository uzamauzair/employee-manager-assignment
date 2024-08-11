import React from "react";
import { FormClientWrapper, FormHeader } from "../../_components";
import { ListButton } from "../../_components";

const EditEmployee = ({ params }: { params: { id: string } }) => {
  return (
    <div className="relative ">
      <div className="absolute right-40">
        <ListButton />
      </div>
      <div className="flex justify-center items-center my-10">
        <FormHeader
          title="Edit Employee"
          description="Update the employee details"
        >
          <FormClientWrapper employeeId={params.id} />
        </FormHeader>
      </div>
    </div>
  );
};

export default EditEmployee;
