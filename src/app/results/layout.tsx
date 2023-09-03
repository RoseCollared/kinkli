import { DefaultLayout } from "@kinklist/components/default-layout";
import { Legend } from "@kinklist/components/legend";
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
