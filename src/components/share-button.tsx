"use client";

import { useSearchParamState } from "@kinklist/hooks/use-search-param-state";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { BiSolidShareAlt } from "react-icons/bi";
import { Button } from "./button";
import { ShareDialog } from "./share-dialog";

export function ShareButton() {
  const [open, setOpen] = useState(false);
  const [openParam, setOpenParam] = useSearchParamState({
    name: "share-dialog",
    method: "push",
  });

  // Set the open state of the dialog in an effect to prevent hydration error
  // when loading the page with openParam === "open"
  useEffect(() => {
    setOpen(openParam === "open");
  }, [openParam]);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => setOpenParam(open ? "open" : null)}
    >
      <Dialog.Trigger asChild>
        <Button icon={<BiSolidShareAlt />} variant="secondary">Share</Button>
      </Dialog.Trigger>
      {/* We pass an `open` prop to the dialog so we can render the content
      conditionally, which is required to use <AnimatePresence /> to animate
      the opening/closing of the dialog. */}
      <ShareDialog open={open} />
    </Dialog.Root>
  );
}
