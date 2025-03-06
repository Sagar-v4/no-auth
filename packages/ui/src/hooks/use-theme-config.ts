"use client";

import { useLocalStorage } from "usehooks-ts";

export function useThemeConfig() {
  return useLocalStorage("theme-config", {
    theme: "zinc",
    radius: 0.5,
  });
}
