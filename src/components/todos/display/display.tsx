"use client";
import { useMemo } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { ToDo, Category } from "@/db/types";
import ToDoTable from "./table";

export default function Display({
  query,
  queryCategory,
}: {
  query: UseQueryResult<ToDo[], unknown>;
  queryCategory: UseQueryResult<Category[], unknown>;
}) {
  const { isLoading, error, data } = query;
  const {
    isLoading: categoriesLoading,
    error: categoriesError,
    data: categories,
  } = queryCategory;

  if (isLoading || categoriesLoading)
    return <ReloadIcon className="mr-2 h-8 w-8 animate-spin" />;

  if (
    error ||
    categoriesError ||
    typeof data === "undefined" ||
    typeof categories === "undefined"
  )
    return "Problem loading data.";

  return (
    <div className="mt-2">
      <ToDoTable data={data} categories={categories} />
    </div>
  );
}
