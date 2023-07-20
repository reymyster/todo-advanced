"use client";
import { useMemo, useEffect } from "react";
import { ToDo, Category } from "@/db/types";
import { DataTable } from "./data-table";
import {
  transformToDosForTableDisplay,
  ColumnFilterValue,
  useStore,
} from "./data";
import { useColumns } from "./columns";

export default function ToDoTable({
  data,
  categories,
  newTodoURL,
}: {
  data: ToDo[];
  categories: Category[];
  newTodoURL: string;
}) {
  const columns = useColumns();
  const categoryFilterID = useStore((state) => state.categoryFilterID);

  const displayData = useMemo(
    () =>
      transformToDosForTableDisplay({
        todos: data,
        categories,
        categoryFilterID,
      }),
    [data, categories, categoryFilterID],
  );

  const categoriesForFiltering = useMemo(
    () =>
      categories.map(
        (c) => ({ value: c.name, label: c.name }) as ColumnFilterValue,
      ),
    [categories],
  );

  return (
    <div>
      <DataTable
        columns={columns}
        data={displayData}
        categoriesForFiltering={categoriesForFiltering}
        newTodoURL={newTodoURL}
      />
    </div>
  );
}
