import { NextResponse, NextRequest } from "next/server";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { eq, asc, desc } from "drizzle-orm";
import { db as vercel, sql } from "@vercel/postgres";
import { categories } from "@/db/schema";
import { Category, NewCategory } from "@/db/types";
import { revalidatePath } from "next/cache";

export async function GET() {
  const db = drizzle(sql);

  const allCategories = await db
    .select()
    .from(categories)
    .orderBy(asc(categories.sortOrder), asc(categories.name));

  return NextResponse.json(allCategories);
}

export async function POST(request: NextRequest) {
  const db = drizzle(sql);

  const item: NewCategory = await request.json();

  const newCategory = await db.insert(categories).values(item).returning();

  revalidatePath("/api/categories");

  return NextResponse.json(newCategory);
}

export async function PUT(request: NextRequest) {
  const db = drizzle(sql);

  const item: Category = await request.json();

  const { name, description, sortOrder, enabled } = item;

  const modified = await db
    .update(categories)
    .set({
      name,
      description,
      sortOrder,
      enabled,
      modified: new Date(),
    })
    .where(eq(categories.id, item.id))
    .returning();

  revalidatePath("/api/categories");

  return NextResponse.json(modified);
}
