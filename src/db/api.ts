import { Category, NewCategory, ToDo, NewToDo } from "./types";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

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

async function insertCategory(item: NewCategory) {
  return await apiPOST("categories", item);
}

export function useCategoryCreateMutation(args?: { onSuccess?: () => void }) {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: insertCategory,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERY_KEYS.CATEGORIES] });
      args?.onSuccess?.();
    },
  });
  return mutation;
}

async function deleteCategory(id: number) {
  return await apiDELETE(`categories/${id}`);
}

export function useCategoryDeleteMutation(args?: { onSuccess?: () => void }) {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERY_KEYS.CATEGORIES] });
      args?.onSuccess?.();
    },
  });
  return mutation;
}

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

export function useTodoCreateMutation(args?: { onSuccess?: () => void }) {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: insertTodo,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERY_KEYS.TODOS] });
      args?.onSuccess?.();
    },
  });
  return mutation;
}

async function completeTodos(ids: number[]) {
  return await apiPOST("todos/complete", ids);
}

export function useTodoCompleteMutation(args?: { onSuccess?: () => void }) {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: completeTodos,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERY_KEYS.TODOS] });
      args?.onSuccess?.();
    },
  });
  return mutation;
}

async function duplicateTodos(ids: number[]) {
  return await apiPOST("todos/duplicate", ids);
}

export function useTodoDuplicateMutation(args?: { onSuccess?: () => void }) {
  const client = useQueryClient();
  const mutation = useMutation({
    mutationFn: duplicateTodos,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERY_KEYS.TODOS] });
      args?.onSuccess?.();
    },
  });
  return mutation;
}
