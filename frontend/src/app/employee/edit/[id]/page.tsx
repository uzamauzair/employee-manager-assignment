import React from "react";
import { FormClientWrapper, FormHeader } from "../../_components";

const EditEmployee = ({ params }: { params: { id: string } }) => {
  return (
    <div className="flex justify-center items-center my-10">
      <FormHeader
        title="Edit Employee"
        description="Update the employee details"
      >
        <FormClientWrapper employeeId={params.id} />
      </FormHeader>
    </div>
  );
};

export default EditEmployee;
