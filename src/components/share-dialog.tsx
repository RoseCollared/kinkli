"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { ReactNode } from "react";
import { BiCheck, BiCopyAlt, BiImage, BiLink, BiX } from "react-icons/bi";
import useClipboard from "react-use-clipboard";
import type { UrlObject } from "url";
import { Button, IconButton } from "./button";
import { Input } from "./input";

export function ShareDialog() {
  const searchParams = useSearchParams();

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-10 bg-black/50" />
      <Dialog.Content className="fixed left-[50%] top-[50%] z-10 flex max-h-[85vh] w-[90vw] max-w-md translate-x-[-50%] translate-y-[-50%] flex-col gap-4 overflow-y-auto rounded-xl border-2 border-rose-300 bg-rose-50 p-6 drop-shadow-2xl focus:outline-none xs:gap-4 xs:p-8 sm:max-w-2xl">
        <Dialog.Title className="grow text-2xl font-medium sm:text-3xl">
          Share
        </Dialog.Title>
        <Dialog.Description>
          Choose how you want to share your results.
        </Dialog.Description>
        <div className="flex flex-col gap-x-8 gap-y-8 sm:max-w-none sm:flex-row">
          <ShareOption
            href={{ pathname: "/results", search: searchParams.toString() }}
          >
            <BiLink aria-hidden className="h-12 w-12 fill-rose-400" />
            Link
          </ShareOption>
          <ShareOption
            href={{
              pathname: "/results/export",
              search: searchParams.toString(),
            }}
          >
            <BiImage aria-hidden className="h-12 w-12 fill-rose-400" />
            Image
          </ShareOption>
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

interface ShareOptionProps {
  href: UrlObject;
  children?: ReactNode;
}

function ShareOption({ href, children }: ShareOptionProps) {
  const url = `${window.location.origin}${href.pathname}?${href.search}`;
  const [isCopied, copy] = useClipboard(url, { successDuration: 2000 });

  return (
    <div className="flex grow basis-0 flex-col gap-2">
      <Link href={href} target="_blank" tabIndex={-1}>
        <Button variant="secondary" className="w-full py-6 sm:py-12">
          <div className="flex flex-col items-center text-base">{children}</div>
        </Button>
      </Link>
      <div className="flex items-center gap-2">
        <Input
          readOnly
          defaultValue={url}
          onFocus={(event) => event.target.select()}
          className="min-w-0 grow"
        />
        <IconButton
          onClick={copy}
          icon={
            isCopied ? (
              <BiCheck className="h-5 w-5" />
            ) : (
              <BiCopyAlt className="h-4 w-4" />
            )
          }
          aria-label={isCopied ? "Copied" : "Copy"}
          title={isCopied ? "Copied" : "Copy"}
          className={isCopied ? "p-1.5 sm:p-1.5" : "p-2 sm:p-2"}
        />
      </div>
    </div>
  );
}

// LEFT HERE
// TODO: add a little description under each share option (or tooltip on mobile?), secondary text color
// TODO: add icon to indicate button opens in new tab
