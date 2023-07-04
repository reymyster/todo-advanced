import { Category } from "./types";

export async function fetchAllCategories() {
  const response = await fetch("/api/categories");

  if (!response.ok) {
    debugger;
    throw new Error("Network error.");
  }

  const Categories: Category[] = await response.json();

  return Categories;
}
