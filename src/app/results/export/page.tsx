"use client";

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
      });
      const url = canvas.toDataURL();
      setImageDataURL(url);
    }
    asyncEffect();
  }, []);

  return (
    <>
      {/* LEFT HERE */}
      {/* TODO: show different header on this page */}
      {/* TODO: include legend in export */}
      {/* TODO: add instructions for saving the results image */}
      {/* TODO: look at other TODOs */}
      <img src={imageDataURL} alt="results" />
      <ExportProvider>
        <div aria-hidden className="absolute left-[-9999px] top-[-9999px]">
          <Results ref={resultsRef} />
        </div>
      </ExportProvider>
    </>
  );
}
