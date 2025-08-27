"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="h-screen bg-[radial-gradient(at_center_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 flex justify-center  items-center flex-col ">
      <h2 className="text-[140px] font-extrabold leading-none">404</h2>
      <h2 className="text-xl mb-2">Something went wrong!</h2>
      <button type="button" className="bg-white p-2 rounded-md" onClick={reset}>
        Try again
      </button>
    </div>
  );
}
