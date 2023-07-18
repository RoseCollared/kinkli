"use client";

import Link from "next/link";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./button";

export function ShareButton() {
  const currentSearch = useSearchParams();
  const [newSearch, setNewSearch] = useState<
    URLSearchParams | ReadonlyURLSearchParams
  >(currentSearch);

  // Keep the "answers" param, discard the rest
  useEffect(() => {
    const search = new URLSearchParams();
    const answers = currentSearch.get("answers");
    if (answers !== null) {
      search.set("answers", answers);
    }
    setNewSearch(search);
  }, [currentSearch]);

  return (
    <Link href={{ pathname: "/result", search: newSearch.toString() }}>
      <Button>Share</Button>
    </Link>
  );
}
