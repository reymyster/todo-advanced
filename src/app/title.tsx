"use client";
import { useSelectedLayoutSegments } from "next/navigation";

export default function Title() {
  const segments = useSelectedLayoutSegments();

  const title = segments?.findLast((s) => true) ?? "All To Do Items";

  return (
    <h1 className="text-3xl font-bold capitalize tracking-tight text-white">
      {title}
    </h1>
  );
}
