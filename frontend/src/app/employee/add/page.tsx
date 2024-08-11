import React from "react";
import { FormClientWrapper, FormHeader } from "../_components";

const AddEmployee = () => {
  return (
    <div className="flex justify-center items-center my-10">
      <FormHeader title="Create Employee" description="Create a new Employee">
        <FormClientWrapper />
      </FormHeader>
    </div>
  );
};

export default AddEmployee;
