"use client";
import { useSelectedLayoutSegments } from "next/navigation";

export default function Title() {
  const segments = useSelectedLayoutSegments();

  let title = segments?.findLast((s) => true) ?? "All To Do Items";

  if (
    segments.length === 3 &&
    segments[0] == "todo" &&
    segments[1] === "edit"
  ) {
    title = "Edit To-Do";
  }

  return (
    <h1 className="text-3xl font-bold capitalize tracking-tight text-white">
      {title}
    </h1>
  );
}
