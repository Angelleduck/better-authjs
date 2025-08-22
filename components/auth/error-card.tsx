import { TriangleAlertIcon } from "lucide-react";

export function ErrorCard({ message }: { message?: string }) {
  return (
    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
      <TriangleAlertIcon className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
}
