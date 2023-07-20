"use client";

import { useTodos, useCategories } from "@/db/api";
import DisplayTodos from "@/components/todos/display/display";
import { useStore } from "@/components/todos/display/data";
import { useEffect } from "react";

export default function Home() {
  const query = useTodos();
  const queryCategory = useCategories();

  const setCategoryFilterID = useStore((state) => state.setCategoryFilterID);

  useEffect(() => setCategoryFilterID(null), [setCategoryFilterID]);

  return (
    <div className="mx-auto px-4 py-4 sm:px-6 lg:px-8">
      <DisplayTodos
        query={query}
        queryCategory={queryCategory}
        newTodoURL="/todo/add"
      />
    </div>
  );
}
