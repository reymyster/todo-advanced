"use client";

import { useCallback } from "react";
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
  const globalFilter = useStore((state) => state.globalFilter);
  const setGlobalFilter = useStore((state) => state.setGlobalFilter);
  const categoryFilterID = useStore((state) => state.categoryFilterID);

  const areFiltersChanged =
    !!globalFilter ||
    JSON.stringify(table.getState().columnFilters) !==
      JSON.stringify(initialColumnFilters);

  const resetFilters = useCallback(() => {
    if (globalFilter) setGlobalFilter("");
    table.resetColumnFilters();
  }, [globalFilter, setGlobalFilter, table]);

  const isFetching = useStore((state) => state.isFetching);
  const isRowMutating = useStore((state) => state.isRowMutating);
  const areSelectedRowsMutating = useStore(
    (state) => state.areSelectedRowsMutating,
  );

  const isDataChanging = isFetching || isRowMutating || areSelectedRowsMutating;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {!categoryFilterID && table.getColumn("categoryName") && (
          <DataTableFacetedFilter
            column={table.getColumn("categoryName")}
            title="Category"
            options={categoriesForFiltering ?? []}
          />
        )}
        {areFiltersChanged && (
          <Button
            variant="ghost"
            onClick={resetFilters}
            className="h-8 px-2 lg:px-3"
          >
            Reset <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {isDataChanging && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
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
