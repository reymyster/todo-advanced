"use client";

import {
  StopwatchIcon,
  CheckCircledIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
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
      const d = row.getValue<string | null>("due");
      const formatted = d === null ? "" : format(new Date(d), "yyyy-MM-dd");

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "completed",
    header: "Status",
    cell: ({ row }) => {
      const deleted = row.getValue<boolean>("deleted");
      const completed = row.getValue<boolean>("completed");
      const classNames = "mr-2 h-4 w-4 text-muted-foreground";
      let icon: JSX.Element, text: string;
      if (deleted) {
        icon = <CrossCircledIcon className={classNames} />;
        text = "Canceled";
      } else if (completed) {
        icon = <CheckCircledIcon className={classNames} />;
        text = "Done";
      } else {
        icon = <StopwatchIcon className={classNames} />;
        text = "In Progress";
      }
      return (
        <div className="flex w-[100px] items-center">
          {icon}
          <span>{text}</span>
        </div>
      );
    },
  },
];
