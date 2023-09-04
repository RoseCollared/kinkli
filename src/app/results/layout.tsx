import { DefaultLayout } from "@kinkli/components/default-layout";
import { Legend } from "@kinkli/components/legend";
import type { ReactNode } from "react";
import { CopyButton, ImageButton } from "./buttons";

export default function ResultsLayout({ children }: { children: ReactNode }) {
  return (
    <DefaultLayout
      buttons={
        <>
          <CopyButton />
          <ImageButton />
        </>
      }
      legend={<Legend showNA />}
    >
      {children}
    </DefaultLayout>
  );
}
