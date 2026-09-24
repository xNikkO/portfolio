"use client";

import { useTheme } from "next-themes";
import Aurora from "./aurora";

const DARK_COLORS: [string, string, string] = ["#707070", "#e5e5e5", "#707070"];
const LIGHT_COLORS: [string, string, string] = ["#d4d4d4", "#a3a3a3", "#d4d4d4"];

export function PortfolioAurora() {
  const { resolvedTheme } = useTheme();
  const isLight = resolvedTheme !== "dark";

  return (
    <Aurora
      colorStops={isLight ? LIGHT_COLORS : DARK_COLORS}
      blend={0.55}
      amplitude={0.85}
      speed={0.35}
      lightMode={isLight}
    />
  );
}
