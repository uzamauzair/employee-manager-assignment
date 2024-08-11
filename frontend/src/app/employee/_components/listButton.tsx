"use client";
import React from "react";
import { Button } from "@/components";
import { useRouter } from "next/navigation";

export const ListButton = () => {
  const router = useRouter();

  return (
    <Button onClick={() => router.push("/employee/list")}>Employee List</Button>
  );
};
