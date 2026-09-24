"use client";

import { useTheme } from "next-themes";
import Grainient from "./grainient";

export function PortfolioGrainient() {
  const { resolvedTheme } = useTheme();

  return (
    <Grainient
      color1="#6d6d6d"
      color2="#0a0a0a"
      color3="#292929"
      timeSpeed={0.18}
      colorBalance={0.51}
      grainAmount={0.1}
      grainScale={2}
      grainAnimated={false}
      contrast={1.5}
      saturation={0}
      lightMode={resolvedTheme !== "dark"}
    />
  );
}
