"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ToDoDisplay, statuses } from "./data";
import { format } from "date-fns";

export const columnsAll: ColumnDef<ToDoDisplay>[] = [
  {
    accessorKey: "due",
    header: "Due",
    cell: ({ row }) => {
      const d = row.getValue<string | null>("due");
      const formatted = d === null ? "" : format(new Date(d), "yyyy-MM-dd");

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "categoryName",
    header: "Category",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = statuses.find(
        (s) => s.value === row.getValue<string>("status"),
      );

      if (!status) return null;

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
