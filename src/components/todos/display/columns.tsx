"use client";

import {
  StopwatchIcon,
  CheckCircledIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { ToDoDisplay } from "./data";
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
      const status = row.getValue<string>("status");
      const classNames = "mr-2 h-4 w-4 text-muted-foreground";
      let icon: JSX.Element, text: string;
      switch (status) {
        case "canceled":
          icon = <CrossCircledIcon className={classNames} />;
          text = "Canceled";
          break;
        case "closed":
          icon = <CheckCircledIcon className={classNames} />;
          text = "Done";
          break;
        case "open":
        default:
          icon = <StopwatchIcon className={classNames} />;
          text = "In Progress";
          break;
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
