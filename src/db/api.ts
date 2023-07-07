import { Category, NewCategory } from "./types";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

const QUERY_KEYS = {
  CATEGORIES: "categories",
} as const;

async function fetchAllCategories() {
  const response = await fetch("/api/categories");

  if (!response.ok) {
    debugger;
    throw new Error("Network error.");
  }

  const Categories: Category[] = await response.json();

  return Categories;
}

async function insertCategory(item: NewCategory) {
  const response = await fetch("/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(item),
  });

  if (!response.ok) {
    debugger;
    throw new Error("Problem saving.");
  }

  return true;
}

export function useCategories() {
  const query = useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: fetchAllCategories,
  });
  return query;
}

export function useCategoryMutation(args?: { onSuccess?: () => void }) {
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
