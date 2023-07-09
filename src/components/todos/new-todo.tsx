"use client";
import { useState, useCallback } from "react";
import { ReloadIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCategories } from "@/db/api";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  categoryId: z.number({ required_error: "Please select a category." }),
  title: z.string().min(2).max(256),
  description: z
    .string()
    .max(1024, "Description is too long, please shorten.")
    .nullable(),
  due: z.date().nullable(),
});

export default function NewTodo() {
  const [isSaving, setIsSaving] = useState(false);
  const {
    isLoading: categoriesLoading,
    error: categoriesLoadingError,
    data: categories,
  } = useCategories();
  const router = useRouter();

  const onCancel = useCallback(() => router.back(), [router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: undefined,
      title: "",
      description: undefined,
      due: null,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ values });
  }

  return (
    <fieldset className="rounded-md border border-gray-400/50 px-4 py-1 mx-auto max-w-2xl">
      <legend className="mx-2 p-1 text-xs">New To-Do</legend>
      <div className="py-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Category</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] md:w-96 justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? categories?.find((c) => c.id === field.value)
                                ?.name
                            : "Select category"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] md:w-96 p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search categories..."
                          className="h-9"
                        />
                        <CommandEmpty>No categories found.</CommandEmpty>
                        <CommandGroup>
                          {categories?.map((category) => (
                            <CommandItem
                              key={category.id}
                              value={category.name}
                              onSelect={(value) => {
                                form.setValue("categoryId", category.id);
                              }}
                            >
                              {category.name}
                              <CheckIcon
                                className={cn(
                                  "ml-auto h-4 w-4",
                                  category.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    Category for this to-do item.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    {/* @ts-ignore */}
                    <Textarea className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription>
                    More detailed description of this to-do.
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
    </fieldset>
  );
}
