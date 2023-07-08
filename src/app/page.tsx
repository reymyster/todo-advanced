import { Button, buttonVariants } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="py-4 text-center text-3xl">TO DO&apos;S</h1>
      <div>
        <Button asChild>
          <Link href="/todo/add" prefetch={false}>
            <PlusIcon className="mr-2 h-4 w-4" />
            New To-Do
          </Link>
        </Button>
      </div>
      <div>
        <Link href="/todo/add" prefetch={false}>
          Plain Link
        </Link>
      </div>
      <div>
        <Link className={buttonVariants()} href="/todo/add" prefetch={false}>
          Button Variants Link
        </Link>
      </div>
    </main>
  );
}
