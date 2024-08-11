import React from "react";
import { FormClientWrapper, FormHeader } from "../_components";
import { ListButton } from "../_components";

const AddEmployee = () => {
  return (
    <div className="relative ">
      <div className="absolute right-40">
        <ListButton />
      </div>
      <div className="flex justify-center items-center my-10">
        <FormHeader title="Create Employee" description="Create a new Employee">
          <FormClientWrapper />
        </FormHeader>
      </div>
    </div>
  );
};

export default AddEmployee;
