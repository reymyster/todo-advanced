import { NextResponse, NextRequest } from "next/server";
import { eq, ne, asc, desc, and, or, inArray } from "drizzle-orm";
import { todos } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { getDBSingle, getDBPool } from "@/db/utils";

export const runtime = "edge";

export async function POST(request: NextRequest) {
  const db = getDBSingle();

  const ids: number[] = await request.json();

  if (ids.length === 0) return NextResponse.json([]);

  const updated = await db
    .update(todos)
    .set({ completed: false, deleted: false, modified: new Date() })
    .where(
      and(
        inArray(todos.id, ids),
        or(eq(todos.completed, true), eq(todos.deleted, true)),
      ),
    )
    .returning({ updatedId: todos.id });

  if (updated.length > 0) revalidatePath("/api/todos");

  return NextResponse.json(updated.map((u) => u.updatedId));
}
