"use client";
import { useEffect, useMemo } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { ToDo, Category } from "@/db/types";
import ToDoTable from "./table";
import { useStore } from "./data";

export default function Display({
  query,
  queryCategory,
  newTodoURL,
}: {
  query: UseQueryResult<ToDo[], unknown>;
  queryCategory: UseQueryResult<Category[], unknown>;
  newTodoURL: string;
}) {
  const { isLoading, error, data, isFetching: todosFetching } = query;
  const {
    isLoading: categoriesLoading,
    error: categoriesError,
    data: categories,
    isFetching: categoriesFetching,
  } = queryCategory;
  const setIsFetching = useStore((state) => state.setIsFetching);

  useEffect(
    () => setIsFetching(todosFetching || categoriesFetching),
    [todosFetching, categoriesFetching, setIsFetching],
  );

  if (isLoading || categoriesLoading)
    return (
      <div className="flex items-center justify-center">
        <ReloadIcon className="h-8 w-8 animate-spin" />
      </div>
    );

  if (
    error ||
    categoriesError ||
    typeof data === "undefined" ||
    typeof categories === "undefined"
  )
    return "Problem loading data.";

  return (
    <div className="mt-2">
      <ToDoTable data={data} categories={categories} newTodoURL={newTodoURL} />
    </div>
  );
}
