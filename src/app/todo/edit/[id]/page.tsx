import EditTodo from "@/components/todos/edit-todo";
import { getDBSingle } from "@/db/utils";
import { todos } from "@/db/schema";
import { eq } from "drizzle-orm";

async function getData(id: number) {
  const db = getDBSingle();

  const results = await db.select().from(todos).where(eq(todos.id, id));

  if (results.length !== 1)
    throw new Error(`Unexpected number of results: ${results.length}`);

  return results[0];
}

export default async function EditTodoPage({
  params,
}: {
  params: { id: number };
}) {
  const { id } = params;
  const data = await getData(id);

  return (
    <div>
      <EditTodo todo={data} />
    </div>
  );
}
