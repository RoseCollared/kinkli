"use client";

import { Legend } from "@kinklist/components/legend";
import { Loader } from "@kinklist/components/loader";
import { Results } from "@kinklist/components/results/results";
import { ExportProvider } from "@kinklist/context/export-context";
import { primaryInput } from "detect-it";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import html2canvas from "html2canvas";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function ExportPage() {
  const [image, setImage] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  // Detect whether the user is using a mouse or touch input
  // We use an effect to prevent hydration errors
  // This way, the initial client render always matches the server, but then changes if needed
  const [isTouch, setIsTouch] = useState(false);
  useLayoutEffect(() => {
    setIsTouch(primaryInput === "touch");
  }, []);

  // Generate results image after first render
  const resultsRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    async function asyncEffect() {
      const resultsElement = resultsRef.current;
      if (!resultsElement) {
        setError("Couldn't find results to export");
        setIsLoading(false);
        return;
      }
      try {
        const canvas = await html2canvas(resultsElement, {
          width: 1920,
          windowWidth: 1920,

          // For consistent output resolution independent of device
          // (using 1 causes weird artifacts)
          scale: 1.4,
        });
        const url = canvas.toDataURL();
        setImage(url);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    asyncEffect();
  }, []);

  // Animation that plays when clicking the image
  const [scope, animate] = useAnimate();
  // Animation state is kept to prevent starting the animation while it is
  // playing, which causes an jarring transition
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div className="flex min-h-screen min-w-full flex-col items-center gap-8 bg-white px-8 py-12 font-medium text-gray-600 sm:gap-12">
      {isLoading && (
        <AnimatePresence>
          <motion.div
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-x-8 gap-y-4 py-12 text-center sm:flex-row"
          >
            <Loader />
            Generating image...
          </motion.div>
        </AnimatePresence>
      )}

      {!!error && (
        <div className="space-y-4 py-12 text-center">
          {/* :( */}
          <p>Oops! Something went wrong :&#40; </p>
          <pre>{error instanceof Error ? error.message : String(error)}</pre>
        </div>
      )}

      {!isLoading && !error && (
        <AnimatePresence>
          <motion.p
            key="text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-4 max-w-prose text-sm sm:mx-8 sm:text-base"
          >
            Here&apos;s a picture of your results! Save it by{" "}
            {isTouch ? (
              <>
                long-pressing and choosing &ldquo;Save Image&rdquo; or similar
              </>
            ) : (
              <>right-clicking and choosing &ldquo;Save Image As...&rdquo;</>
            )}
          </motion.p>

          <motion.div
            key="image"
            ref={scope}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" }}
            className="relative overflow-hidden rounded-3xl border-4 border-rose-300 shadow-2xl"
          >
            <div className="pointer-events-none absolute -left-1/4 -right-1/4 bottom-0 top-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/75 to-white/0" />
            <img
              src={image}
              alt="results"
              title="This is an image"
              onClick={() => {
                // Play a shimmer and subtle pulse animation on click to
                // indicate that this is an image, not an interactive element
                if (!isAnimating) {
                  animate(
                    "div",
                    { x: ["-100%", "100%"] },
                    {
                      ease: [0, 0.6, 1, 0.4],
                      duration: 0.6,
                      onPlay: () => setIsAnimating(true),
                      onComplete: () => setIsAnimating(false),
                    }
                  );
                  animate(
                    scope.current,
                    { scale: [1, 1.02, 1] },
                    { ease: "easeOut", duration: 0.6 }
                  );
                }
              }}
              className="max-h-[75vh]"
            />
          </motion.div>
        </AnimatePresence>
      )}

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
