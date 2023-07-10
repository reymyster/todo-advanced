"use client";
import { ToDo } from "@/db/types";
import { DataTable } from "./data-table";
import { columnsAll } from "./columns";

export default function ToDoTable({ data }: { data: ToDo[] }) {
  return (
    <div>
      <DataTable columns={columnsAll} data={data} />
    </div>
  );
}
