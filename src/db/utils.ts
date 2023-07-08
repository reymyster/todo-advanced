import {
  drizzle,
  VercelPgClient,
  VercelPgDatabase,
} from "drizzle-orm/vercel-postgres";
import { db as vercel, sql } from "@vercel/postgres";

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

export function getDBSingle() {
  return getDB(sql);
}

export function getDBPool() {
  return getDB(vercel);
}
