import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "@/components/shared";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["cyrillic"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Потокэйр",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={cn(
          "antialiased bg-background font-semibold flex flex-col min-h-screen",
          montserrat.variable
        )}
      >
        <Header />
        <main className="px-4 flex-auto" id="main">
          {children}
        </main>
        <Footer />
        <Toaster richColors />
      </body>
    </html>
  );
}
