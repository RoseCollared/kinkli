import { DefaultLayout } from "@kinklist/components/default-layout";
import { ShareButton } from "@kinklist/components/share-button";
import type { ReactNode } from "react";

// This route group `(home)` exists because the layout is slightly different from the results page

export default function HomeLayout({ children }: { children: ReactNode }) {
  return <DefaultLayout buttons={<ShareButton />}>{children}</DefaultLayout>;
}
