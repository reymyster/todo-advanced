"use client";
import { useState, useCallback } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  categoryId: z.number(),
  title: z.string().min(2).max(256),
  description: z.string().max(1024).nullable(),
  due: z.date().nullable(),
});

export default function NewTodo() {
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const onCancel = useCallback(() => router.back(), [router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: 0,
      title: "",
      description: "",
      due: null,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values });
  }

  return (
    <fieldset className="rounded-md border border-gray-400/50 px-4 py-1 mx-auto max-w-2xl">
      <legend className="mx-2 p-1 text-xs">New To-Do</legend>
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the title for your to-do.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end gap-x-6">
              <Button variant="ghost" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </Form>
      </div>
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
