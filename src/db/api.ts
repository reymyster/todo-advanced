import { Category, NewCategory } from "./types";

export async function fetchAllCategories() {
  const response = await fetch("/api/categories");

  if (!response.ok) {
    debugger;
    throw new Error("Network error.");
  }

  const Categories: Category[] = await response.json();

  return Categories;
}

export async function insertCategory(item: NewCategory) {
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
