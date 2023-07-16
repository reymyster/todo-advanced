import { Category, NewCategory, ToDo, NewToDo } from "./types";
import {
  useMutation,
  useQueryClient,
  useQuery,
  MutationFunction,
  QueryKey,
} from "@tanstack/react-query";

const QUERY_KEYS = {
  CATEGORIES: "categories",
  TODOS: "todos",
} as const;

async function apiGET(endpoint: string) {
  const response = await fetch(`/api/${endpoint}`);

  if (!response.ok) {
    throw new Error(`Error getting /api/${endpoint}: ${response.statusText}`);
  }

  return await response.json();
}

async function apiPOST(endpoint: string, body: any) {
  const response = await fetch(`/api/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Error posting /api/${endpoint}: ${response.statusText}`);
  }

  return true;
}

async function apiDELETE(endpoint: string) {
  const response = await fetch(`/api/${endpoint}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Error delete /api/${endpoint}: ${response.statusText}`);
  }

  return true;
}

async function fetchAllCategories() {
  const Categories: Category[] = await apiGET("categories");

  return Categories;
}

export function useCategories() {
  const query = useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: fetchAllCategories,
    retry: 1,
    cacheTime: 120 * 60 * 1000,
    staleTime: 60 * 60 * 1000,
  });
  return query;
}

function createMutation<TData, TVar>({
  mutationFn,
  queryKey,
}: {
  mutationFn: MutationFunction<TData, TVar>;
  queryKey: QueryKey | undefined;
}) {
  return function (args?: { onSuccess?: () => void }) {
    const client = useQueryClient();
    const mutation = useMutation({
      mutationFn,
      onSuccess: () => {
        client.invalidateQueries({ queryKey });
        args?.onSuccess?.();
      },
    });
    return mutation;
  };
}

async function insertCategory(item: NewCategory) {
  return await apiPOST("categories", item);
}

export const useCategoryCreateMutation = createMutation({
  mutationFn: insertCategory,
  queryKey: [QUERY_KEYS.CATEGORIES],
});

async function deleteCategory(id: number) {
  return await apiDELETE(`categories/${id}`);
}

export const useCategoryDeleteMutation = createMutation({
  mutationFn: deleteCategory,
  queryKey: [QUERY_KEYS.CATEGORIES],
});

async function fetchAllTodos() {
  const Todos: ToDo[] = await apiGET("todos");

  return Todos;
}

export function useTodos() {
  const query = useQuery({
    queryKey: [QUERY_KEYS.TODOS],
    queryFn: fetchAllTodos,
    retry: 1,
    cacheTime: 120 * 60 * 1000,
    staleTime: 60 * 60 * 1000,
  });
  return query;
}

async function insertTodo(item: NewToDo) {
  return await apiPOST("todos", item);
}

export const useTodoCreateMutation = createMutation({
  mutationFn: insertTodo,
  queryKey: [QUERY_KEYS.TODOS],
});

async function completeTodos(ids: number[]) {
  return await apiPOST("todos/complete", ids);
}

export const useTodoCompleteMutation = createMutation({
  mutationFn: completeTodos,
  queryKey: [QUERY_KEYS.TODOS],
});

async function duplicateTodos(ids: number[]) {
  return await apiPOST("todos/duplicate", ids);
}

export const useTodoDuplicateMutation = createMutation({
  mutationFn: duplicateTodos,
  queryKey: [QUERY_KEYS.TODOS],
});

async function reopenTodos(ids: number[]) {
  return await apiPOST("todos/reopen", ids);
}

export const useTodoReopenMutation = createMutation({
  mutationFn: reopenTodos,
  queryKey: [QUERY_KEYS.TODOS],
});
