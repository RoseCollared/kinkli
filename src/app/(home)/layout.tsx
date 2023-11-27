import { DefaultLayout } from "@kinkli/components/default-layout";
import { Legend } from "@kinkli/components/legend";
import { ShareButton } from "@kinkli/components/share-button";
import type { ReactNode } from "react";

// This route group `(home)` exists because the layout is slightly different from the results page

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <DefaultLayout buttons={<ShareButton />}>
      <Legend />
      <main className="mx-4 mb-12 flex flex-col gap-8">{children}</main>
    </DefaultLayout>
  );
}
