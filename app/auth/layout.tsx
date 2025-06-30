export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-screen bg-[radial-gradient(at_center_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 flex justify-center  items-center flex-col">
      {children}
    </main>
  );
}
