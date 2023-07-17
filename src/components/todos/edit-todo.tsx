"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

import { ToDo } from "@/db/types";
import { useCategories, useTodoEditMutation } from "@/db/api";

import {
  ReloadIcon,
  CaretSortIcon,
  CheckIcon,
  CalendarIcon,
} from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  categoryId: z.number({ required_error: "Please select a category." }),
  title: z.string().min(2).max(256),
  description: z
    .string()
    .max(1024, "Description is too long, please shorten.")
    .nullable(),
  due: z.date().nullable(),
  completed: z.boolean(),
  deleted: z.boolean(),
});

export default function EditTodo({ todo }: { todo: ToDo }) {
  const { data: categories } = useCategories();
  const router = useRouter();

  const cancel = useCallback(() => router.back(), [router]);

  const mutation = useTodoEditMutation({ onSuccess: cancel });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      categoryId: todo.categoryId,
      title: todo.title,
      description: todo.description,
      due: todo.due === null ? null : new Date(todo.due),
      completed: todo.completed,
      deleted: todo.deleted,
    },
  });

  async function submit(values: z.infer<typeof formSchema>) {
    await mutation.mutateAsync({
      id: todo.id,
      categoryId: values.categoryId,
      title: values.title,
      description: values.description,
      due: values.due !== null ? format(values.due, "yyyy-MM-dd") : null,
      completed: values.completed,
      deleted: values.deleted,
      created: todo.created,
      modified: new Date(),
    });
  }

  return (
    <fieldset className="rounded-md border border-gray-400/50 px-4 py-1 mx-auto max-w-2xl">
      <legend className="mx-2 p-1 text-xs">Edit To-Do</legend>
      <div className="py-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="space-y-8">
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
              name="due"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Due</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        /* @ts-ignore */
                        selected={field.value}
                        /* @ts-ignore */
                        onSelect={field.onChange}
                        /* @ts-ignore */
                        disabled={(date) => {
                          date < new Date();
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormDescription>
                    When this to-do list is expected to be done.
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
            <FormField
              control={form.control}
              name="completed"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Completed</FormLabel>
                    <FormDescription>
                      This to-do item has been completed.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="deleted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormLabel>Disabled</FormLabel>
                    <FormDescription>
                      This to-do item has been canceled/disabled.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end gap-x-6">
              <Button type="button" variant="ghost" onClick={cancel}>
                Cancel
              </Button>
              <Button type="submit">
                <ReloadIcon
                  className={cn(
                    "mr-2 h-4 w-4 animate-spin",
                    !mutation.isLoading && "hidden",
                  )}
                />
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </fieldset>
  );
}
