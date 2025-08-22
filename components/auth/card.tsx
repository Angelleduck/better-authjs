import { PropsWithChildren } from "react";

export function Card({ children }: PropsWithChildren) {
  return (
    <div className="w-[min(calc(100%-20px),400px)] bg-white rounded-xl px-6 py-7 space-y-5">
      {children}
    </div>
  );
}
