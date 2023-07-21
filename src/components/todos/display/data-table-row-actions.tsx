"use client";

import { useEffect, useCallback } from "react";
import { DotsHorizontalIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { ToDoDisplay, statuses, useStore } from "./data";
import {
  useTodoCompleteMutation,
  useTodoDuplicateMutation,
  useTodoReopenMutation,
  useTodoCancelMutation,
} from "@/db/api";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
import { useToast } from "@/components/ui/use-toast";

interface DataTableRowActionsProps {
  row: Row<ToDoDisplay>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const todoID = row.original.id;
  const setRowMutating = useStore((state) => state.setRowMutating);
  const router = useRouter();
  const { toast } = useToast();

  const edit = useCallback(
    () => router.push(`/todo/edit/${todoID}`),
    [router, todoID],
  );

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
  const markComplete = async () => {
    await completeMutation.mutateAsync([todoID]);
  };

  const duplicateMutation = useTodoDuplicateMutation({ onSuccess: onCreated });
  const duplicateTodo = async () => {
    await duplicateMutation.mutateAsync([todoID]);
  };

  const reopenMutation = useTodoReopenMutation({ onSuccess: onModified });
  const reopenTodo = async () => {
    await reopenMutation.mutateAsync([todoID]);
  };

  const cancelMutation = useTodoCancelMutation({ onSuccess: onModified });
  const cancel = async () => {
    await cancelMutation.mutateAsync([todoID]);
  };

  const isLoading =
    completeMutation.isLoading ||
    duplicateMutation.isLoading ||
    reopenMutation.isLoading ||
    cancelMutation.isLoading;

  useEffect(() => setRowMutating(isLoading), [setRowMutating, isLoading]);

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
        <DropdownMenuItem asChild>
          <Link href={`/todo/edit/${todoID}`} prefetch={false}>
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={duplicateTodo}>Make a copy</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={markComplete}
          disabled={row.original.completed}
        >
          Complete
        </DropdownMenuItem>
        <DropdownMenuItem onClick={cancel} disabled={row.original.deleted}>
          Cancel
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={reopenTodo}
          disabled={row.original.status === "open"}
        >
          Re-Open
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
