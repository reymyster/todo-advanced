import { NextResponse, NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { getDBSingle } from "@/db/utils";
import { categories } from "@/db/schema";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } },
) {
  const { id } = params;
  const db = getDBSingle();

  await db.delete(categories).where(eq(categories.id, id));

  return NextResponse.json(true);
}
