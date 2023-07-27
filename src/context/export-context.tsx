import { createContext, useContext } from "react";

const context = createContext(false);

export function useIsExport() {
  return useContext(context);
}

export function ExportProvider({ value = true, children }) {
  return <context.Provider value={value}>{children}</context.Provider>;
}
