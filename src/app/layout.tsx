import { BackToTopButton } from "@kinklist/components/back-to-top-button";
import { Legend } from "@kinklist/components/legend";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kinklist",
  description: "The kinkiest kinklist of all kinky lists",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-rose-50 text-gray-800 ${inter.className}`}>
        <main className="flex min-h-screen flex-col items-center">
          <header className="flex w-full justify-center gap-8 px-12 pb-2 pt-12 sm:pt-16">
            <h1 className="text-4xl font-bold drop-shadow-sm xs:text-5xl">
              Kinklist
            </h1>
          </header>
          <Legend className="sm:sticky sm:top-0" />
          {children}
          <BackToTopButton />
        </main>
      </body>
    </html>
  );
}
