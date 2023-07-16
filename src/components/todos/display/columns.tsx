"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ToDoDisplay, statuses } from "./data";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  useTodoCompleteMutation,
  useTodoDuplicateMutation,
  useTodoReopenMutation,
  useTodoCancelMutation,
} from "@/db/api";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DataTableRowActions } from "./data-table-row-actions";

export const columnsAll: ColumnDef<ToDoDisplay>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
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
    accessorKey: "categoryName",
    header: "Category",
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "due",
    header: "Due",
    cell: ({ row }) => {
      const d = row.getValue<string | null>("due");
      const formatted = d === null ? "" : format(new Date(d), "yyyy-MM-dd");

      return <div className="w-24">{formatted}</div>;
    },
    size: 96,
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
  {
    id: "actions",
    header: ({ table }) => {
      const { rows } = table.getFilteredSelectedRowModel();

      const rowIDs = rows.map((row) => row.original.id);

      const completeMutation = useTodoCompleteMutation();
      const complete = async () => {
        await completeMutation.mutateAsync(rowIDs);
      };

      const duplicateMutation = useTodoDuplicateMutation();
      const duplicate = async () => {
        await duplicateMutation.mutateAsync(rowIDs);
      };

      const reopenMutation = useTodoReopenMutation();
      const reopen = async () => {
        await reopenMutation.mutateAsync(rowIDs);
      };

      const cancelMutation = useTodoCancelMutation();
      const cancel = async () => {
        await cancelMutation.mutateAsync(rowIDs);
      };

      const isLoading = completeMutation.isLoading || reopenMutation.isLoading;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="mx-auto h-8 lg:flex"
              disabled={rows.length === 0 || isLoading}
            >
              <ReloadIcon
                className={cn(
                  "h-4 w-4 animate-spin mx-4",
                  !isLoading && "hidden",
                )}
              />
              <span className={cn(isLoading && "hidden")}>Actions</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem onClick={duplicate}>Make a copy</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={complete}>Complete</DropdownMenuItem>
            <DropdownMenuItem onClick={cancel}>Cancel</DropdownMenuItem>
            <DropdownMenuItem onClick={reopen}>Re-Open</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
