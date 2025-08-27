"use client";

export default function NotFound() {
  function goHome() {
    window.location.href = "/home";
  }
  return (
    <div className="h-screen bg-[radial-gradient(at_center_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 flex justify-center  items-center flex-col ">
      <h2 className="text-[140px] font-extrabold leading-none">404</h2>
      <h2 className="text-xl mb-2">Page not found</h2>
      <button
        type="button"
        className="bg-white p-2 rounded-md"
        onClick={goHome}
      >
        Go home
      </button>
    </div>
  );
}
