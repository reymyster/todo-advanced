import { NextResponse, NextRequest } from "next/server";
import { eq, asc, desc } from "drizzle-orm";
import { todos } from "@/db/schema";
import { ToDo, NewToDo } from "@/db/types";
import { revalidatePath } from "next/cache";
import { getDBSingle, getDBPool } from "@/db/utils";

export const runtime = "edge";

export async function GET() {
  const db = getDBSingle();

  const allTodos = await db
    .select()
    .from(todos)
    .orderBy(asc(todos.due), asc(todos.id));

  return NextResponse.json(allTodos);
}

export async function POST(request: NextRequest) {
  const db = getDBSingle();

  const item: NewToDo = await request.json();

  const newTodo = await db.insert(todos).values(item).returning();

  revalidatePath("/api/todos");

  return NextResponse.json(newTodo);
}
