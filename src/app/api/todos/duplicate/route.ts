import { NextResponse, NextRequest } from "next/server";
import { eq, ne, asc, desc, and, inArray } from "drizzle-orm";
import { todos } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { getDBSingle, getDBPool } from "@/db/utils";
import { ToDo, NewToDo } from "@/db/types";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const db = getDBPool();

  const ids: number[] = await request.json();

  if (ids.length === 0) return NextResponse.json([]);

  const todosToDuplicate = await db
    .select()
    .from(todos)
    .where(inArray(todos.id, ids));

  if (todosToDuplicate.length === 0) return NextResponse.json([]);

  const newTodos = todosToDuplicate.map((old) => {
    return <NewToDo>{
      categoryId: old.categoryId,
      title: old.title,
      description: old.description,
      due: old.due,
    };
  });

  const inserted = await db
    .insert(todos)
    .values(newTodos)
    .returning({ insertedId: todos.id });

  if (inserted.length > 0) revalidatePath("/api/todos");

  return NextResponse.json(inserted.map((i) => i.insertedId));
}
