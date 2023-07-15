import { ReloadIcon } from "@radix-ui/react-icons";

export default function Loading() {
  return (
    <div className="flex items-center justify-center">
      <ReloadIcon className="h-8 w-8 animate-spin" />
    </div>
  );
}
