import { NextRequest, NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { migrate } from "drizzle-orm/vercel-postgres/migrator";
import { db } from "@vercel/postgres";

export async function GET(request: NextRequest) {
  const client = await db.connect();
  const driz = drizzle(client);

  await migrate(driz, {
    migrationsFolder: "./migrations-folder",
  });

  return NextResponse.json(true);
}
