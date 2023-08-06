"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BiCheck, BiCopy, BiImage, BiLinkExternal, BiX } from "react-icons/bi";
import useClipboard from "react-use-clipboard";
import { Button, IconButton } from "./button";
import { Input } from "./input";

export function ShareDialog() {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-10 bg-black/50" />
      <Dialog.Content className="fixed left-[50%] top-[50%] z-10 flex max-h-[85vh] w-[90vw] max-w-md translate-x-[-50%] translate-y-[-50%] flex-col gap-4 overflow-y-auto rounded-xl border-2 border-rose-300 bg-white p-6 drop-shadow-2xl focus:outline-none xs:gap-4 xs:p-8 sm:max-w-2xl">
        <Dialog.Title className="grow text-2xl font-semibold sm:text-3xl">
          Share
        </Dialog.Title>
        <Dialog.Description>
          We recommend sharing your results link, but you can also generate an
          image.
        </Dialog.Description>
        <div className="flex flex-col gap-x-8 gap-y-8 sm:max-w-none sm:flex-row">
          <LinkOption />
          <ImageOption />
        </div>
        <Dialog.Close asChild>
          <IconButton
            variant="tertiary"
            icon={<BiX className="h-6 w-6 sm:h-8 sm:w-8" />}
            className="absolute right-2 top-2 shrink-0 p-0.5 sm:p-0.5"
          />
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

function LinkOption() {
  const searchParams = useSearchParams();
  const url = `${window.location.origin}/results${
    searchParams.toString() && `?${searchParams.toString()}`
  }`;
  const [isCopied, copy] = useClipboard(url, { successDuration: 2000 });

  return (
    <div className="flex grow basis-0 flex-col gap-2">
      <h3 className="text-xl font-medium">Link</h3>
      <Button
        onClick={copy}
        variant="secondary"
        className="w-full py-6 sm:py-12"
      >
        <div className="flex flex-col items-center text-base">
          {isCopied ? (
            <>
              <BiCheck aria-hidden className="h-12 w-12 fill-rose-400" />
              Copied
            </>
          ) : (
            <>
              <BiCopy aria-hidden className="h-12 w-12 fill-rose-400" />
              Copy link
            </>
          )}
        </div>
      </Button>
      <div className="flex items-center gap-2">
        <Input
          readOnly
          defaultValue={url}
          onFocus={(event) => event.target.select()}
          className="min-w-0 grow"
        />
        <Link
          href={{ pathname: "/results", search: searchParams.toString() }}
          target="_blank"
          tabIndex={-1}
        >
          <IconButton
            icon={<BiLinkExternal className="h-4 w-4" />}
            aria-label="Open link in new tab"
            title="Open link in new tab"
            className="p-2 sm:p-2"
          />
        </Link>
      </div>
      <p className="px-2 text-gray-500">
        A link is easier to view on mobile devices and more accessible to people
        with vision impairments.
      </p>
    </div>
  );
}

function ImageOption() {
  const searchParams = useSearchParams();

  return (
    <div className="flex grow basis-0 flex-col gap-2">
      <h3 className="text-xl font-medium">Image</h3>
      <Link
        href={{ pathname: "/results/export", search: searchParams.toString() }}
        target="_blank"
        tabIndex={-1}
      >
        <Button variant="secondary" className="w-full py-6 sm:py-12">
          <div className="flex flex-col items-center text-base">
            <BiImage aria-hidden className="h-12 w-12 fill-rose-400" />
            Generate image
          </div>
        </Button>
      </Link>
      <p className="px-2 text-gray-500">
        An image is always the same no matter how you&apos;re viewing it.
      </p>
    </div>
  );
}
