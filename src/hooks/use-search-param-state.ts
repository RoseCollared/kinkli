"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";

export interface Options {
  name: string;
  method?: "push" | "replace";
}

export function useSearchParamState(
  options: Options
): ReturnType<typeof useState<string | null | undefined>> {
  const { name, method = "replace" } = options;

  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const state = useMemo(() => params.get(name), [params, name]);

  const setState = useCallback<
    Dispatch<SetStateAction<string | null | undefined>>
  >(
    (valueOrFn) => {
      let newState: string | null | undefined;
      if (typeof valueOrFn === "function") {
        newState = valueOrFn(state);
      } else {
        newState = valueOrFn;
      }

      const newParams = new URLSearchParams(params.toString());
      if (typeof newState === "string") {
        newParams.set(name, newState);
      } else {
        newParams.delete(name);
      }

      router[method](pathname + "?" + newParams.toString(), { scroll: false });
    },
    [params, method, name, pathname, router, state]
  );

  return [state, setState];
}
