"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useTodos } from "@/db/api";

export default function Home() {
  const {
    isLoading: todosLoading,
    error: todosError,
    data: todos,
  } = useTodos();

  if (todosLoading) return <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />;

  if (todosError) return "An error has occurred.";

  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="py-4 text-center text-3xl">TO DO&apos;S</h1>
      <div>
        <Button asChild>
          <Link href="/todo/add" prefetch={false}>
            <PlusIcon className="mr-2 h-4 w-4" />
            New To-Do
          </Link>
        </Button>
      </div>
      <hr />
      <div>{JSON.stringify(todos)}</div>
    </main>
  );
}
