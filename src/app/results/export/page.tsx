"use client";

import { Results } from "@kinklist/components/results/results";
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
      {/* Use context to pass down isExport prop */}
      {/* Show different header */}
      <img src={imageDataURL} alt="results" />
      <div aria-hidden className="absolute left-[-9999px] top-[-9999px]">
        <Results isExport ref={resultsRef} />
      </div>
    </>
  );
}
