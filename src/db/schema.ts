import {
  pgTable,
  boolean,
  date,
  integer,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

export const categories = pgTable(
  "categories",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 64 }).notNull(),
    description: varchar("description", { length: 256 }),
    created: timestamp("created", { withTimezone: true })
      .notNull()
      .defaultNow(),
    modified: timestamp("modified", { withTimezone: true }),
    sortOrder: integer("sort_order").notNull().default(0),
    enabled: boolean("enabled").notNull().default(true),
  },
  (categories) => {
    return {
      nameIndex: uniqueIndex("name_idx").on(categories.name),
    };
  },
);

export const todos = pgTable("todos", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").references(() => categories.id),
  title: varchar("title", { length: 256 }).notNull(),
  description: varchar("description", { length: 1024 }),
  due: date("due"),
  completed: boolean("completed").notNull().default(false),
  deleted: boolean("deleted").notNull().default(false),
  created: timestamp("created", { withTimezone: true }).notNull().defaultNow(),
  modified: timestamp("modified", { withTimezone: true }),
});
