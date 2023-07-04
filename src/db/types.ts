import { categories, todos } from "./schema";
import { InferModel } from "drizzle-orm";

export type Category = InferModel<typeof categories>;
export type NewCategory = InferModel<typeof categories, "insert">;

export type ToDo = InferModel<typeof todos>;
export type NewToDo = InferModel<typeof todos, "insert">;
