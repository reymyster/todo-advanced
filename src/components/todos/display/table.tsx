"use client";
import { useMemo } from "react";
import { ToDo, Category } from "@/db/types";
import { DataTable } from "./data-table";
import { transformToDosForTableDisplay, ColumnFilterValue } from "./data";
import { columnsAll } from "./columns";

export default function ToDoTable({
  data,
  categories,
}: {
  data: ToDo[];
  categories: Category[];
}) {
  const displayData = useMemo(
    () => transformToDosForTableDisplay({ todos: data, categories }),
    [data, categories],
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
        columns={columnsAll}
        data={displayData}
        initialColumnFilters={[{ id: "status", value: ["open"] }]}
        categoriesForFiltering={categoriesForFiltering}
      />
    </div>
  );
}
