import { NextResponse, NextRequest } from "next/server";
import { eq, asc, desc } from "drizzle-orm";
import { todos } from "@/db/schema";
import { ToDo } from "@/db/types";
import { revalidatePath } from "next/cache";
import { getDBSingle, getDBPool } from "@/db/utils";

export const runtime = "edge";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = Number(params.id);
  const db = getDBSingle();

  const item: ToDo = await request.json();

  if (item.id !== id) return NextResponse.error();

  const { categoryId, title, description, due, completed, deleted } = item;

  const updated = await db
    .update(todos)
    .set({
      categoryId,
      title,
      description,
      due,
      completed,
      deleted,
      modified: new Date(),
    })
    .where(eq(todos.id, id))
    .returning({ updatedId: todos.id });

  if (updated.length > 0) revalidatePath("/api/todos");

  return NextResponse.json(updated);
}
