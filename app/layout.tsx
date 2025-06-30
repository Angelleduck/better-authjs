import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auth Home",
  description: "Test our security",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
