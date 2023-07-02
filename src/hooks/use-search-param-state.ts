"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function useSearchParamState(
  name: string,
  initialValue?: string
): ReturnType<typeof useState<string | null | undefined>> {
  const router = useRouter();
  const pathname = usePathname();
  const currentParams = useSearchParams();

  const [state, setState] = useState<string | null | undefined>(
    currentParams.get(name) ?? initialValue
  );

  useEffect(() => {
    const params = new URLSearchParams(currentParams.toString());
    if (state) params.set(name, state);
    router.replace(pathname + "?" + params.toString());
  }, [state, name, router, pathname, currentParams]);

  return [state, setState];
}
