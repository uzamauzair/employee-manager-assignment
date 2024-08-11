import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components";

interface EmployeeCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const FormHeader = ({
  title,
  description,
  children,
}: EmployeeCardProps) => {
  return (
    <Card className="border border-yellow-950 px-5 pb-5">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">{children}</CardContent>
    </Card>
  );
};
