"use client";
import { SyntheticEvent, useState } from "react";
import { useCategoryCreateMutation } from "@/db/api";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

export default function AddForm() {
  const [categoryName, setCategoryName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);

  const onReset = () => {
    setCategoryName("");
    setDesc("");
  };

  const mutation = useCategoryCreateMutation({ onSuccess: onReset });

  const onSave = async (event: SyntheticEvent) => {
    event.preventDefault();
    setIsSaving(true);
    console.log({ categoryName, desc });
    await mutation.mutateAsync({
      name: categoryName,
      description: desc,
    });
    setIsSaving(false);
  };

  return (
    <fieldset className="rounded-md border border-gray-400/50 px-4 py-1">
      <legend className="mx-2 p-1 text-xs">Add Category</legend>
      <div>
        <div className="border-b border-gray-900/10 pb-6">
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="category"
                    id="category"
                    autoComplete="none"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Category Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.currentTarget.value)}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md border-0 bg-transparent py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={desc}
                  onChange={(e) => setDesc(e.currentTarget.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-2 mt-4 flex items-center justify-end gap-x-6">
        <Button variant="ghost" onClick={onReset}>
          Reset
        </Button>
        <Button disabled={isSaving} onClick={(e) => onSave(e)}>
          <ReloadIcon
            className={cn("mr-2 h-4 w-4 animate-spin", !isSaving && "hidden")}
          />
          Save
        </Button>
      </div>
    </fieldset>
  );
}
