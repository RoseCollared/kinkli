"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export interface Options {
  name: string;
  initialValue?: string;
  method?: "push" | "replace";
}

export function useSearchParamState(
  options: Options
): ReturnType<typeof useState<string | null | undefined>> {
  const { name, initialValue, method = "replace" } = options;

  const router = useRouter();
  const pathname = usePathname();
  const currentParams = useSearchParams();

  const [state, setState] = useState<string | null | undefined>(
    currentParams.get(name) ?? initialValue
  );

  useEffect(() => {
    const params = new URLSearchParams(currentParams.toString());
    if (typeof state === "string") {
      params.set(name, state);
    } else {
      params.delete(name);
    }
    router[method](pathname + "?" + params.toString(), { scroll: false });
  }, [state, name, router, pathname, currentParams, method]);

  return [state, setState];
}
