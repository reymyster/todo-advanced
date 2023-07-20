"use client";
import { useSelectedLayoutSegments } from "next/navigation";
import { useCategories } from "@/db/api";

export default function Title() {
  const segments = useSelectedLayoutSegments();
  const { data: categories } = useCategories();

  let title = segments?.findLast((s) => true) ?? "All To Do Items";
  let subtitle: string | null = null;

  if (
    segments.length === 3 &&
    segments[0] === "todo" &&
    segments[1] === "edit"
  ) {
    title = "Edit To-Do";
  } else if (segments.length === 2 && segments[0] === "categories") {
    let category = categories?.find((c) => c.id === Number(segments[1]));
    if (category) {
      title = category.name;
      subtitle = category.description;
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold capitalize tracking-tight text-white">
        {title}
      </h1>
      {subtitle && <p className="text-sm pl-0.5 text-white">{subtitle}</p>}
    </>
  );
}
