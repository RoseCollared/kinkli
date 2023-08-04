"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { BiSolidShareAlt } from "react-icons/bi";
import { Button } from "./button";
import { ShareDialog } from "./share-dialog";

export function ShareButton() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button icon={<BiSolidShareAlt />}>
          Share
        </Button>
      </Dialog.Trigger>
      <ShareDialog />
    </Dialog.Root>
  );
}
