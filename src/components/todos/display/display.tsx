"use client";
import { useMemo } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { ToDo } from "@/db/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ToDoTable from "./table";

const EmptySet: ToDo[] = [];

export default function Display({
  query,
}: {
  query: UseQueryResult<ToDo[], unknown>;
}) {
  const { isLoading, error, data } = query;

  const active = useMemo(() => {
    if (typeof data === "undefined" || data.length === 0) return EmptySet;

    return data.filter((d) => !d.deleted && !d.completed);
  }, [data]);

  const completed = useMemo(() => {
    if (typeof data === "undefined" || data.length === 0) return EmptySet;

    return data.filter((d) => !d.deleted && d.completed);
  }, [data]);

  if (isLoading) return <ReloadIcon className="mr-2 h-8 w-8 animate-spin" />;

  if (error || typeof data === "undefined") return "Problem loading data.";

  return (
    <div>
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
        <TabsContent value="active">
          <ToDoTable data={active} />
        </TabsContent>
        <TabsContent value="completed">
          <ToDoTable data={completed} />
        </TabsContent>
        <TabsContent value="all">
          <ToDoTable data={data} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
