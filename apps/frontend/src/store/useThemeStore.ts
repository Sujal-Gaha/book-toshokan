import { Dispatch, SetStateAction } from "react";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type TMode = "light" | "dark";

type TState = {
  mode: TMode;
};

type TAction = {
  setMode: Dispatch<SetStateAction<TMode>>;
  toggleMode: () => void;
};

export const useThemeStore = create<TState & TAction>((set) => ({
  mode: "dark",
  setMode: () => set((state) => ({ mode: state.mode })),
  toggleMode: () =>
    set((state) => ({ mode: state.mode === "dark" ? "light" : "dark" })),
}));

export const useStore = create<TState & TAction>()(
  devtools(
    persist(
      (set) => ({
        mode: "dark",
        setMode: () => set((state) => ({ mode: state.mode })),
        toggleMode: () =>
          set((state) => ({ mode: state.mode === "dark" ? "light" : "dark" })),
      }),
      { name: "theme-storage" }
    )
  )
);
