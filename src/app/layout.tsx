import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Tront | Next-Gen Crypto Exchange",
  description: "Trade with zero latency on the world's fastest crypto exchange engine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100..800&family=Sora:wght@100..800&display=swap" rel="stylesheet" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background antialiased font-sans transition-colors duration-300"
        )}
      >
        {children}
      </body>
    </html>
  );
}
