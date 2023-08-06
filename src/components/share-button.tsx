"use client";

import { useSearchParamState } from "@kinklist/hooks/use-search-param-state";
import * as Dialog from "@radix-ui/react-dialog";
import { BiSolidShareAlt } from "react-icons/bi";
import { Button } from "./button";
import { ShareDialog } from "./share-dialog";

export function ShareButton() {
  const [openParam, setOpenParam] = useSearchParamState({
    name: "share-dialog",
    method: "push",
  });

  // FIXME: hydration error when loading the page with openParam === "open"

  return (
    <Dialog.Root
      open={openParam === "open"}
      onOpenChange={(open) => setOpenParam(open ? "open" : null)}
    >
      <Dialog.Trigger asChild>
        <Button icon={<BiSolidShareAlt />}>Share</Button>
      </Dialog.Trigger>
      <ShareDialog open={openParam === "open"} />
    </Dialog.Root>
  );
}
