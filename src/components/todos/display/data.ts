import * as React from "react";
import { ToDo, Category } from "@/db/types";
import {
  StopwatchIcon,
  CheckCircledIcon,
  CrossCircledIcon,
} from "@radix-ui/react-icons";
import { create } from "zustand";
import { ColumnFiltersState } from "@tanstack/react-table";

type ToDoCalculatedColumns = {
  categoryName: string;
  status: string;
};

export type ToDoDisplay = ToDo & ToDoCalculatedColumns;

export type ColumnFilterValue = {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
};

export function transformToDosForTableDisplay({
  todos,
  categories,
}: {
  todos: ToDo[];
  categories: Category[];
}) {
  return todos.map((t) => {
    const categoryName = categories.find((c) => c.id === t.categoryId)?.name;
    const status = t.deleted ? "canceled" : t.completed ? "closed" : "open";

    return {
      ...t,
      categoryName,
      status,
    } as ToDoDisplay;
  });
}

export const statuses: ColumnFilterValue[] = [
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
  {
    value: "closed",
    label: "Closed",
    icon: CheckCircledIcon,
  },
  {
    value: "open",
    label: "In Progress",
    icon: StopwatchIcon,
  },
];

export const initialColumnFilters: ColumnFiltersState = [
  { id: "status", value: ["open"] },
];

type State = {
  isFetching: boolean;
  isRowMutating: boolean;
  areSelectedRowsMutating: boolean;
};

type Action = {
  setIsFetching: (f: State["isFetching"]) => void;
  setRowMutating: (f: State["isRowMutating"]) => void;
  setSelectedRowsMutating: (f: State["isFetching"]) => void;
};

export const useStore = create<State & Action>((set) => ({
  isFetching: false,
  isRowMutating: false,
  areSelectedRowsMutating: false,
  setIsFetching: (f) => set(() => ({ isFetching: f })),
  setRowMutating: (f) => set(() => ({ isRowMutating: f })),
  setSelectedRowsMutating: (f) => set(() => ({ areSelectedRowsMutating: f })),
}));
