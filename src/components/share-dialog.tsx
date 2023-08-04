"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import { BiImage, BiLink, BiX } from "react-icons/bi";
import { UrlObject } from "url";
import { Button, IconButton } from "./button";
import { Input } from "./input";

export function ShareDialog() {
  const searchParams = useSearchParams();

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-10 bg-black/50" />
      <Dialog.Content className="fixed left-[50%] top-[50%] z-10 flex max-h-[85vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] flex-col gap-4 overflow-y-auto rounded-xl bg-rose-50 p-6 shadow-2xl focus:outline-none xs:gap-4 xs:p-8">
        <Dialog.Title className="grow text-2xl font-medium sm:text-3xl">
          Share
        </Dialog.Title>
        <Dialog.Description>
          Choose how you want to share your results.
        </Dialog.Description>
        <div className="flex w-full max-w-xs flex-col gap-x-8 gap-y-8 self-center sm:max-w-none sm:flex-row">
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
  return (
    <div className="flex grow basis-0 flex-col gap-2">
      <Link href={href} target="_blank" tabIndex={-1}>
        <Button variant="secondary" className="w-full py-6 sm:py-12">
          <div className="flex flex-col items-center text-base">{children}</div>
        </Button>
      </Link>
      <Input
        readOnly
        defaultValue={`${window.location.origin}${href.pathname}?${href.search}`}
        onFocus={(event) => event.target.select()}
      />
    </div>
  );
}
