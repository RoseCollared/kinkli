import { create } from "zustand";

interface ResultStore {
  result: string | null;
  setResult: (result: string) => void;
}

export const useResultStore = create<ResultStore>((set) => ({
  result: null,
  setResult: (result) => set({ result }),
}));
