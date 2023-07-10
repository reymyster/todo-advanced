"use client";
import { useMemo } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { ToDo } from "@/db/types";
import ToDoTable from "./table";

export default function Display({
  query,
}: {
  query: UseQueryResult<ToDo[], unknown>;
}) {
  const { isLoading, error, data } = query;

  if (isLoading) return <ReloadIcon className="mr-2 h-8 w-8 animate-spin" />;

  if (error || typeof data === "undefined") return "Problem loading data.";

  return (
    <div className="mt-2">
      <ToDoTable data={data} />
    </div>
  );
}
