import * as React from "react";
import {
  Table as ShadcnTable,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "./table";
import { Button, Pagination } from "@/components";

interface AnyObject {
  [key: string]: any;
}

interface GenericTableProps<T extends AnyObject> {
  columns: {
    title: string;
    dataIndex: keyof T;
    render?: (value: any, record: T) => React.ReactNode;
  }[];
  data: T[];
  sizeOptions?: number[] | string[];
  tableTitle?: string;
  countTitle?: string;
  count?: number;
  onRow?: (record: T) => React.HTMLAttributes<HTMLTableRowElement>;
  label?: string;
  action?: () => void;
  pagination?: boolean;
  pageSize?: number;
}

export const MainTable = <T extends AnyObject>({
  columns,
  data,
  tableTitle,
  countTitle,
  count,
  onRow,
  label,
  action,
  pagination = true,
  pageSize = 10,
}: GenericTableProps<T>) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = Math.ceil(data.length / pageSize);

  const paginatedData = pagination
    ? data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    : data;

  return (
    <div className="relative w-full overflow-auto">
      <div className="flex flex-col items-start justify-normal gap-[30px] pb-[30px]">
        {tableTitle && (
          <div className="border-l-[7px] border-black">
            <h1 className="px-4 font-bold text-[25px]">{tableTitle}</h1>
          </div>
        )}
        <div className="text-[20px] flex items-center justify-between w-full">
          {countTitle}：{count}
          {action && (
            <div className="h-full flex items-end justify-end lg:pr-2">
              <Button variant="default" size="lg" onClick={action}>
                {label}
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="h-[70vh] relative overflow-auto">
        <ShadcnTable className="w-full caption-bottom text-sm border border-gray-300 mb-10">
          <TableHeader className="sticky top-0 bg-white z-10 !text-black">
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.dataIndex.toString()}>
                  {col.title}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow key={index} {...onRow?.(item)}>
                {columns.map((col) => (
                  <TableCell key={col.dataIndex.toString()}>
                    {col.render
                      ? col.render(item[col.dataIndex], item)
                      : item[col.dataIndex]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          {pagination && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={columns.length}>
                  {/* Reusable Pagination Component */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </ShadcnTable>
      </div>
    </div>
  );
};
