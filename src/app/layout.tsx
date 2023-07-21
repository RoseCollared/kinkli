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
        {children}
      </body>
    </html>
  );
}
