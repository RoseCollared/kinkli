import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kinklist",
  description: "The kinkiest kinklist of all kinky lists",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`flex min-h-screen flex-col items-center bg-rose-50 text-gray-800 ${inter.className}`}
      >
        {children}
      </body>
    </html>
  );
}
