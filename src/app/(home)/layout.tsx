import { BackToTopButton } from "@kinklist/components/back-to-top-button";
import { Legend } from "@kinklist/components/legend";
import { ShareButton } from "@kinklist/components/share-button";

// This route group exists because the layout is different from the results page

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="flex w-full items-center justify-center gap-8 px-12 pb-2 pt-12 sm:justify-between sm:pt-16">
        <div className="hidden grow sm:block">
          {/* Placeholder which grows to ensure title is centered */}
        </div>
        <h1 className="text-4xl font-bold drop-shadow-sm xs:text-5xl">
          Kinklist
        </h1>
        <div className="flex basis-0 justify-end sm:grow">
          <ShareButton />
        </div>
      </header>
      <Legend />
      <main>{children}</main>
      <BackToTopButton />
    </>
  );
}