import { NextResponse, NextRequest } from "next/server";
import {
  drizzle,
  VercelPgClient,
  VercelPgDatabase,
} from "drizzle-orm/vercel-postgres";
import { eq, asc, desc } from "drizzle-orm";
import { db as vercel, sql } from "@vercel/postgres";
import { todos } from "@/db/schema";
import { ToDo, NewToDo } from "@/db/types";
import { revalidatePath } from "next/cache";

export const runtime = "edge";

function getDB(client: VercelPgClient) {
  let db: VercelPgDatabase<Record<string, never>>;

  try {
    db = drizzle(client);
  } catch (err) {
    console.error({ err });
    try {
      db = drizzle(client);
    } catch (nextErr) {
      console.error({ nextErr });
      throw new Error("Cannot connect to database.");
    }
  }

  return db;
}

export async function GET() {
  const db = getDB(sql);

  const allTodos = await db
    .select()
    .from(todos)
    .orderBy(asc(todos.due), asc(todos.id));

  return NextResponse.json(allTodos);
}

export async function POST(request: NextRequest) {
  const db = getDB(sql);

  const item: NewToDo = await request.json();

  const newTodo = await db.insert(todos).values(item).returning();

  revalidatePath("/api/todos");

  return NextResponse.json(newTodo);
}
