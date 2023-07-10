"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ToDo } from "@/db/types";
import { format } from "date-fns";

export const columnsAll: ColumnDef<ToDo>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "due",
    header: "Due",
    cell: ({ row }) => {
      const d = new Date(row.getValue("due"));
      const formatted = format(d, "yyyy-MM-dd");

      return <div>{formatted}</div>;
    },
  },
];
