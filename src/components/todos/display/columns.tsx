"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ToDoDisplay, statuses, useStore } from "./data";
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
import { useToast } from "@/components/ui/use-toast";

import { DataTableRowActions } from "./data-table-row-actions";
import { useEffect } from "react";

export function useColumns(args?: {
  categoryFilterID?: number | null;
}): ColumnDef<ToDoDisplay>[] {
  const { toast } = useToast();

  function onModified(data: number[]) {
    toast({
      description: `${data.length} ${
        data.length === 1 ? "item has" : "items have"
      } been modified.`,
    });
  }

  function onCreated(data: number[]) {
    toast({
      description: `${data.length} ${
        data.length === 1 ? "item has" : "items have"
      } been created.`,
    });
  }

  const completeMutation = useTodoCompleteMutation({ onSuccess: onModified });
  const duplicateMutation = useTodoDuplicateMutation({ onSuccess: onCreated });
  const reopenMutation = useTodoReopenMutation({ onSuccess: onModified });
  const cancelMutation = useTodoCancelMutation({ onSuccess: onModified });
  const setSelectedRowsMutating = useStore(
    (state) => state.setSelectedRowsMutating,
  );
  const categoryFilterID = args?.categoryFilterID;

  const isMutating =
    completeMutation.isLoading ||
    duplicateMutation.isLoading ||
    reopenMutation.isLoading ||
    cancelMutation.isLoading;
  useEffect(
    () => setSelectedRowsMutating(isMutating),
    [setSelectedRowsMutating, isMutating],
  );

  return [
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
    ...(!categoryFilterID
      ? [
          {
            accessorKey: "categoryName",
            header: "Category",
            filterFn: (row: Row<ToDoDisplay>, id: string, value: any) => {
              return value.includes(row.getValue(id));
            },
          },
        ]
      : []),
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

        const complete = async () => {
          await completeMutation.mutateAsync(rowIDs);
        };

        const duplicate = async () => {
          await duplicateMutation.mutateAsync(rowIDs);
        };

        const reopen = async () => {
          await reopenMutation.mutateAsync(rowIDs);
        };

        const cancel = async () => {
          await cancelMutation.mutateAsync(rowIDs);
        };

        const isLoading =
          completeMutation.isLoading ||
          reopenMutation.isLoading ||
          reopenMutation.isLoading ||
          cancelMutation.isLoading;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="mx-auto h-8 lg:flex"
                disabled={rows.length === 0 || isLoading}
              >
                <span>Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem onClick={duplicate}>
                Make a copy
              </DropdownMenuItem>
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
}
