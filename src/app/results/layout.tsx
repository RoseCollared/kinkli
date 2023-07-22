import { BackToTopButton } from "@kinklist/components/back-to-top-button";
import { Button } from "@kinklist/components/button";
import { Legend } from "@kinklist/components/legend";
import Link from "next/link";
import { BiLeftArrowAlt } from "react-icons/bi";

export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="flex w-full flex-col-reverse items-center justify-center gap-x-8 gap-y-2 px-12 pt-12 sm:flex-row sm:justify-between sm:pb-2 sm:pt-16">
        <div className="flex basis-0 items-center justify-start sm:grow">
          <Link href="/">
            <Button
              variant="tertiary"
              className="px-3 py-2 text-base sm:px-3 sm:text-base"
            >
              <Button.Icon Component={BiLeftArrowAlt} className="w-6 h-6" />
              Start from scratch...
            </Button>
          </Link>
        </div>
        <h1 className="text-4xl font-bold drop-shadow-sm xs:text-5xl">
          Kinklist
        </h1>
        <div className="hidden grow sm:block">
          {/* Placeholder which grows to ensure title is centered */}
        </div>
      </header>
      <Legend />
      <main>{children}</main>
      <BackToTopButton />
    </>
  );
}
