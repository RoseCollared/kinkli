import { useEffect, useState } from "react";

export function useIsFirstRender() {
  const [isFirstRender, setIsFirstRender] = useState(true);
  useEffect(() => {
    setIsFirstRender(false);
  }, []);
  return isFirstRender;
}
