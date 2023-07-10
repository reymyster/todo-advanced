"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useTodos } from "@/db/api";
import DisplayTodos from "@/components/todos/display/display";

export default function Home() {
  const query = useTodos();

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="flex justify-end py-2">
        <Button asChild>
          <Link href="/todo/add" prefetch={false}>
            <PlusIcon className="mr-2 h-4 w-4" />
            New To-Do
          </Link>
        </Button>
      </div>
      <DisplayTodos query={query} />
    </main>
  );
}
