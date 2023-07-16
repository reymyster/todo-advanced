"use client";

import { Cross2Icon, PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

import {
  statuses,
  ColumnFilterValue,
  initialColumnFilters,
  useStore,
} from "./data";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  categoriesForFiltering?: ColumnFilterValue[];
  newTodoURL: string;
}

export function DataTableToolbar<TData>({
  table,
  categoriesForFiltering,
  newTodoURL,
}: DataTableToolbarProps<TData>) {
  const areFiltersChanged =
    JSON.stringify(table.getState().columnFilters) !==
    JSON.stringify(initialColumnFilters);

  const isFetching = useStore((state) => state.isFetching);

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("categoryName") && (
          <DataTableFacetedFilter
            column={table.getColumn("categoryName")}
            title="Category"
            options={categoriesForFiltering ?? []}
          />
        )}
        {areFiltersChanged && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {isFetching && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
        <Button
          variant="outline"
          size="sm"
          className="ml-auto hidden h-8 lg:flex"
          asChild
        >
          <Link href={newTodoURL} prefetch={false}>
            <PlusIcon className="mr-2 h-4 w-4" />
            New
          </Link>
        </Button>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
