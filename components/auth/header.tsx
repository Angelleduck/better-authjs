import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}
export default function Header({ label }: HeaderProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className={`text-3xl font-semibold ${font.className}`}>🔐 Auth</h1>
      <p className="text-muted-foreground text-sm text-neutral-600">{label}</p>
    </div>
  );
}
