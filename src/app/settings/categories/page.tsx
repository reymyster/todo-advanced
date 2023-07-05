"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAllCategories } from "@/db/api";
import classNames from "classnames";
import Link from "next/link";
import AddForm from "./add";

export default function Categories() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchAllCategories,
  });

  if (isLoading) return "Loading...";

  if (error && !data) return "An error has occurred";

  return (
    <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 lg:px-8">
      <AddForm />
      <ul role="list" className="divide-y divide-gray-200">
        {data?.map((category) => {
          return (
            <li
              key={category.id}
              className="flex items-center justify-between gap-x-6 py-5"
            >
              <div className="min-w-0">
                <div className="flex items-start gap-x-3">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {category.name}
                  </p>
                  <p
                    className={classNames(
                      { hidden: category.enabled },
                      "bg-red-50 text-red-700 ring-red-600/20",
                      "mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                    )}
                  >
                    Disabled
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                  <p className="whitespace-nowrap">
                    Sort: {category.sortOrder}
                  </p>
                  <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <p className="truncate">Desc: {category.description}</p>
                </div>
              </div>
              <div className="flex flex-none items-center gap-x-4">
                <Link
                  href="/"
                  prefetch={false}
                  className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                >
                  Edit<span className="sr-only"> {category.name}</span>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
