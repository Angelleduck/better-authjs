import { CircleCheck } from "lucide-react";

export default function SuccessCard({ message }: { message?: string }) {
  return (
    <div className="bg-emerald-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-emerald-500">
      <CircleCheck className="w-4 h-4" />
      <p>{message}</p>
    </div>
  );
}
