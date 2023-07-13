import { ToDo, Category } from "@/db/types";

type ToDoCalculatedColumns = {
  categoryName: string;
  status: string;
};

export type ToDoDisplay = ToDo & ToDoCalculatedColumns;

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
