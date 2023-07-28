"use client";

import { Legend } from "@kinklist/components/legend";
import { Results } from "@kinklist/components/results/results";
import { ExportProvider } from "@kinklist/context/export-context";
import html2canvas from "html2canvas";
import { useEffect, useRef, useState } from "react";

export default function ExportPage() {
  const [imageDataURL, setImageDataURL] = useState<string>();
  const resultsRef = useRef<HTMLDivElement>(null);

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
    <div className="flex min-h-screen min-w-full flex-col items-center gap-8 bg-white px-8 py-8 sm:gap-12 sm:py-12">
      {/* LEFT HERE */}
      {/* TODO: add instructions for saving the results image */}
      {/* TODO: look at other TODOs */}

      <p className="mx-4 max-w-prose text-sm font-medium text-gray-600 sm:mx-8 sm:text-base">
        Here&apos;s a picture of your results! You can save it by right-clicking
        and choosing &ldquo;Save Image As...&rdquo; (on a computer) or
        long-pressing (on a mobile device).
      </p>

      <img
        src={imageDataURL}
        alt="results"
        className="max-h-[75vh] max-w-full rounded-3xl border-4 border-rose-300 shadow-2xl"
      />

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
