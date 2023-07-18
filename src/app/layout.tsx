import { BackToTopButton } from "@kinklist/components/back-to-top-button";
import { Legend } from "@kinklist/components/legend";
import { ShareButton } from "@kinklist/components/share-button";
import { Title } from "@kinklist/components/title";
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
      <body
        className={`flex min-h-screen flex-col items-center bg-rose-50 text-gray-800 ${inter.className}`}
      >
        <header className="flex w-full justify-between gap-8 px-12 pb-2 pt-12 sm:pt-16">
          <div className="grow">
            {/* Placeholder which grows to ensure title is centered */}
          </div>
          <Title />
          <div className="flex grow basis-0 justify-end">
            <ShareButton />
          </div>
        </header>
        <Legend className="sm:sticky sm:top-0" />
        <main>{children}</main>
        <BackToTopButton />
      </body>
    </html>
  );
}
