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
      console.log(resultsElement);
      const canvas = await html2canvas(resultsElement);
      const url = canvas.toDataURL();
      console.log(url);
      setImageDataURL(url);
    }
    asyncEffect();
  }, []);

  return (
    <>
        {/* LEFT HERE */}
        {/* Try to hide the results */}
        {/* Don't show the layout */}
        {/* Improve generated image  */}
        <img src={imageDataURL} />
        <Results isExport ref={resultsRef} />
    </>
  );
}
