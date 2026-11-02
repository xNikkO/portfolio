import type { ReactNode } from "react";
import { PortfolioAurora } from "../shaders/portfolio-aurora";

export function PageBackdrop(): ReactNode {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-200 overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to bottom, black 0%, black 25%, transparent 95%)",
      }}
    >
      <PortfolioAurora />
    </div>
  );
}
