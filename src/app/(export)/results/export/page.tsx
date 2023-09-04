"use client";

import { Button } from "@kinkli/components/button";
import { Legend } from "@kinkli/components/legend";
import { Loader } from "@kinkli/components/loader";
import { Results } from "@kinkli/components/results/results";
import { ExportProvider } from "@kinkli/context/export-context";
import { primaryInput } from "detect-it";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import html2canvas from "html2canvas";
import { useTheme } from "next-themes";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function ExportPage() {
  const [image, setImage] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  const resultsRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme: theme } = useTheme();

  // Detect whether the user is using a mouse or touch input
  // We use an effect to prevent hydration errors
  // This way, the initial client render always matches the server, but then changes if needed
  const [isTouch, setIsTouch] = useState(false);
  useLayoutEffect(() => {
    setIsTouch(primaryInput === "touch");
  }, []);

  const generateImageEffect = () => {
    setIsLoading(true);
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
    setTimeout(asyncEffect, 0);
  };

  // Generate results image after first render
  useEffect(generateImageEffect, [theme]);

  // Animation that plays when clicking the image
  const [scope, animate] = useAnimate();
  // Animation state is kept to prevent starting the animation while it is
  // playing, which causes an jarring transition
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div className="flex flex-col items-center gap-8 px-8 pb-8 pt-20 font-medium text-gray-600 dark:text-gray-200">
      {isLoading && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
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
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4 py-12 text-center"
          >
            {/* :( */}
            <p>Oops! Something went wrong :&#40; </p>
            <pre>{error instanceof Error ? error.message : String(error)}</pre>
            <Button
              onClick={() => {
                setError(null);
                generateImageEffect();
              }}
            >
              Try again
            </Button>
          </motion.div>
        </AnimatePresence>
      )}

      {!isLoading && !error && (
        <AnimatePresence>
          <motion.p
            key="text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mx-4 max-w-prose sm:mx-8 sm:text-base"
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
            exit={{ opacity: 0 }}
            transition={{ type: "spring" }}
            className="relative overflow-hidden rounded-3xl border-4 border-rose-300 shadow-2xl dark:border-red-700 dark:shadow-red-950"
          >
            <div className="pointer-events-none absolute -left-1/4 -right-1/4 bottom-0 top-0 -translate-x-full bg-gradient-to-r from-white/0 via-white/75 to-white/0" />
            <img
              src={image}
              alt="results"
              title="This is an image of your results"
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
              className="max-h-[70vh]"
            />
          </motion.div>
        </AnimatePresence>
      )}

      <ExportProvider>
        <div
          aria-hidden
          ref={resultsRef}
          className="absolute left-[-9999px] top-[-9999px] flex w-[1920px] flex-col items-center gap-8 bg-rose-50 p-12 pt-8 dark:bg-zinc-800"
        >
          <Legend
            showNA
            className="border-none pt-4 sm:static sm:bg-transparent"
          />
          <Results />
        </div>
      </ExportProvider>
    </div>
  );
}
