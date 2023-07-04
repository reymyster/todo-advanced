"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAllCategories } from "@/db/api";

export default function Categories() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchAllCategories,
  });

  if (isLoading) return "Loading...";

  if (error && !data) return "An error has occurred";

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <ul>
        {data?.map((category) => {
          return (
            <li key={category.id}>
              <h3>{category.name}</h3>
              <p className="text-xs">{category.description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
