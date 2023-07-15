"use client";

import { useState } from "react";
import { DotsHorizontalIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { ToDoDisplay, statuses } from "./data";
import { useTodoCompleteMutation } from "@/db/api";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
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

interface DataTableRowActionsProps {
  row: Row<ToDoDisplay>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const todoID = row.original.id;

  const completeMutation = useTodoCompleteMutation();
  const markComplete = async () => {
    await completeMutation.mutateAsync([todoID]);
  };

  const isLoading = completeMutation.isLoading;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted mx-auto"
        >
          <ReloadIcon
            className={cn("h-4 w-4 animate-spin", !isLoading && "hidden")}
          />
          <DotsHorizontalIcon
            className={cn("h-4 w-4", isLoading && "hidden")}
          />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={markComplete}>
          Mark Completed
        </DropdownMenuItem>
        <DropdownMenuItem>Cancel</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
