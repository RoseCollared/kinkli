"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { BiImage, BiLink, BiX } from "react-icons/bi";
import { Button, IconButton } from "./button";

export function ShareDialog() {
  const searchParams = useSearchParams();

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 z-10 bg-black/50" />
      <Dialog.Content className="fixed left-[50%] top-[50%] z-10 flex max-h-[85vh] w-[90vw] max-w-[600px] translate-x-[-50%] translate-y-[-50%] flex-col gap-4 xs:gap-8 rounded-xl bg-rose-50 p-6 shadow-2xl focus:outline-none xs:p-8">
        <Dialog.Title className="grow text-2xl font-medium sm:text-3xl">
          Share your results
        </Dialog.Title>
        <Dialog.Description className="flex w-full max-w-xs flex-col gap-x-8 gap-y-4 self-center sm:max-w-none sm:flex-row">
          <Link
            href={{ pathname: "/results", search: searchParams.toString() }}
            target="_blank"
            className="grow"
          >
            <Button variant="secondary" className="w-full py-12">
              <div className="flex flex-col items-center text-base">
                <BiLink aria-hidden className="h-12 w-12 fill-rose-400" />
                Link
              </div>
            </Button>
          </Link>
          <Link
            href={{ pathname: "/results/export", search: searchParams.toString() }}
            target="_blank"
            className="grow"
          >
            <Button variant="secondary" className="w-full py-12">
              <div className="flex flex-col items-center text-base">
                <BiImage aria-hidden className="h-12 w-12 fill-rose-400" />
                Image
              </div>
            </Button>
          </Link>
        </Dialog.Description>
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
