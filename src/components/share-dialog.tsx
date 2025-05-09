"use client";

import { useIsFirstRender } from "@kinkli/hooks/use-is-first-render";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import Link, { type LinkProps } from "next/link";
import { useSearchParams } from "next/navigation";
import { BiImage, BiLink, BiX } from "react-icons/bi";
import useClipboard from "react-use-clipboard";
import { Button } from "./button";

export function ShareDialog({ open }: { open: boolean }) {
  // Pass only the `answers` search param to the links
  const searchParams = useSearchParams();
  const linkParams = new URLSearchParams();
  const answers = searchParams.get("answers");
  if (answers) linkParams.set("answers", answers);

  return (
    <AnimatePresence>
      {open && (
        <Dialog.Portal forceMount>
          <Dialog.Overlay asChild>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-10 bg-black/50"
            />
          </Dialog.Overlay>
          <Dialog.Content asChild>
            <div className="fixed left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                variants={{
                  initial: {
                    opacity: 0,
                    scale: 0.6,
                  },
                  animate: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      type: "spring",
                    },
                  },
                  exit: {
                    opacity: 0,
                    scale: 0.9,
                  },
                }}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex max-h-[85vh] w-[90vw] max-w-md flex-col gap-4 overflow-y-auto rounded-xl border-2 border-rose-300 bg-white p-6 drop-shadow-2xl focus:outline-none dark:border-red-700 dark:bg-zinc-900 xs:gap-4 xs:p-8 sm:max-w-2xl"
              >
                <Dialog.Title className="grow text-2xl font-semibold sm:text-3xl">
                  Share
                </Dialog.Title>
                <Dialog.Description>
                  You can choose to share your results in two different ways.
                </Dialog.Description>
                <div className="flex flex-col gap-x-8 gap-y-8 sm:max-w-none sm:flex-row">
                  <LinkOption
                    href={{
                      pathname: "/results",
                      search: linkParams.toString(),
                    }}
                  />
                  <ImageOption
                    href={{
                      pathname: "/results/export",
                      search: linkParams.toString(),
                    }}
                  />
                </div>
                <Dialog.Close asChild>
                  <Button
                    variant="tertiary"
                    icon={<BiX className="h-6 w-6 sm:h-8 sm:w-8" />}
                    className="absolute right-2 top-2 shrink-0 p-0.5 sm:p-0.5"
                  />
                </Dialog.Close>
              </motion.div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      )}
    </AnimatePresence>
  );
}

function LinkOption({ href }: { href: LinkProps["href"] }) {
  const absoluteUrl =
    typeof window !== "undefined"
      ? window.location.host +
        (typeof href === "string" ? href : `${href.pathname}?${href.search}`)
      : "";

  const [isCopied, copy] = useClipboard(absoluteUrl, {
    successDuration: 2500,
  });

  const isFirstRender = useIsFirstRender();

  return (
    <div className="flex grow basis-0 flex-col gap-2">
      <div className="flex justify-between gap-2">
        <h3 className="text-xl font-medium">Link</h3>
        <Button
          as={motion.button}
          layout
          onClick={() => copy()}
          className="px-2.5 py-0 text-base sm:px-2.5 sm:text-base"
        >
          <motion.span
            layout
            key={String(isCopied)}
            initial={isFirstRender ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            // Can't do an exit animation because we're not using <AnimatePresence>.
            // I couldn't find a way to animate the width of the button without
            // rendering both elements (entering and exiting) at the same time
            // which makes the button way too wide for some period of time.
            transition={{ delay: 0.2 }}
          >
            {isCopied ? "Copied" : "Copy"}
          </motion.span>
        </Button>
      </div>

      <Link href={href} target="_blank" tabIndex={-1}>
        <Button variant="secondary" className="w-full py-6 sm:py-12">
          <div className="flex flex-col items-center text-base">
            <BiLink
              aria-hidden
              className="h-12 w-12 fill-rose-400 dark:fill-gray-600"
            />
            Open link
          </div>
        </Button>
      </Link>

      <p className="px-2 text-gray-500 dark:text-gray-200">
        A link lets you edit your answers later. It is also easier to view on
        mobile devices and more accessible to people with vision impairments.
      </p>
    </div>
  );
}

function ImageOption({ href }: { href: LinkProps["href"] }) {
  return (
    <div className="flex grow basis-0 flex-col gap-2">
      <h3 className="text-xl font-medium">Image</h3>

      <Link href={href} target="_blank" tabIndex={-1}>
        <Button variant="secondary" className="w-full py-6 sm:py-12">
          <div className="flex flex-col items-center text-base">
            <BiImage
              aria-hidden
              className="h-12 w-12 fill-rose-400 dark:fill-gray-600"
            />
            Generate image
          </div>
        </Button>
      </Link>

      <p className="px-2 text-gray-500 dark:text-gray-200">
        An image is always the same no matter how you&apos;re viewing it.
      </p>
    </div>
  );
}
