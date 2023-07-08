"use client";
import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewTodo() {
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const onCancel = useCallback(() => router.back(), [router]);

  return (
    <fieldset className="rounded-md border border-gray-400/50 px-4 py-1 mx-auto max-w-2xl">
      <legend className="mx-2 p-1 text-xs">New To-Do</legend>
      <div>Form</div>
      <div className="mb-2 mt-4 flex items-center justify-end gap-x-6">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button asChild>
          <Link href="/settings/categories" prefetch={false}>
            Edit Categories
          </Link>
        </Button>
        <Button disabled={isSaving}>
          <ReloadIcon
            className={cn("mr-2 h-4 w-4 animate-spin", !isSaving && "hidden")}
          />
          Save
        </Button>
      </div>
    </fieldset>
  );
}
