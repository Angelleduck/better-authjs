import { Poppins } from "next/font/google";
import Link from "next/link";

const Poppins_font = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["600"],
});

export default function Home() {
  return (
    <main className="h-screen bg-[radial-gradient(at_center_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 flex justify-center  items-center flex-col">
      <div className="text-white space-y-6 text-center">
        <div
          className={`text-6xl font-semibold text-white drop-shadow-md ${Poppins_font.className}`}
        >
          🔐 Auth
        </div>
        <p className="text-lg">A simple authentication service</p>

        <Link className="inline-block" href="/auth/login">
          <button className=" text-sm rounded-lg bg-white text-black py-[10px] px-8">
            sign in
          </button>
        </Link>
      </div>
    </main>
  );
}
