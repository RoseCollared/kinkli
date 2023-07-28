"use client";

import { Legend } from "@kinklist/components/legend";
import { Results } from "@kinklist/components/results/results";
import { ExportProvider } from "@kinklist/context/export-context";
import { primaryInput } from "detect-it";
import html2canvas from "html2canvas";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { BiSolidImage } from "react-icons/bi";

export default function ExportPage() {
  const [imageDataURL, setImageDataURL] = useState<string>();
  const resultsRef = useRef<HTMLDivElement>(null);

  // Using an effect to prevent hydration errors
  // This way, the initial client render always matches the server, but then changes if needed
  const [isTouch, setIsTouch] = useState(false);
  useLayoutEffect(() => {
    setIsTouch(primaryInput === "touch");
  }, []);

  // Render results as image after first React render
  useEffect(() => {
    async function asyncEffect() {
      const resultsElement = resultsRef.current;
      if (!resultsElement) {
        alert("Whoops, I can't find any results to export!");
        return;
      }
      const canvas = await html2canvas(resultsElement, {
        width: 1920,
        windowWidth: 1920,

        // For consistent output resolution independent of device
        // (using 1 causes weird artifacts)
        scale: 1.4,
      });
      const url = canvas.toDataURL();
      setImageDataURL(url);
    }
    asyncEffect();
  }, []);

  return (
    <div className="flex min-h-screen min-w-full flex-col items-center gap-8 bg-white px-8 py-12 sm:gap-12">
      <p className="mx-4 max-w-prose text-sm font-medium text-gray-600 sm:mx-8 sm:text-base">
        Here&apos;s a picture of your results! You can save it by{" "}
        {isTouch ? (
          <>long-pressing and choosing &ldquo;Save Image&rdquo; or similar</>
        ) : (
          <>right-clicking and choosing &ldquo;Save Image As...&rdquo;</>
        )}
      </p>

      <div className="group relative overflow-hidden rounded-3xl border-4 border-rose-300 shadow-2xl">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <BiSolidImage className="h-16 w-16 fill-black/75 sm:h-24 sm:w-24" />
        </div>
        <img
          src={imageDataURL}
          alt="results"
          className="max-h-[75vh]"
          title="This is an image"
        />
      </div>

      <ExportProvider>
        <div
          aria-hidden
          ref={resultsRef}
          className="absolute left-[-9999px] top-[-9999px] flex w-[1920px] flex-col items-center gap-8 bg-rose-50 p-12 pt-8"
        >
          <Legend className="border-none pt-4 sm:static sm:bg-transparent" />
          <Results />
        </div>
      </ExportProvider>
    </div>
  );
}
