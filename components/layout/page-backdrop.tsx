import type { ReactNode } from "react";

export function PageBackdrop(): ReactNode {
  return (
    <div
      aria-hidden="true"
      className="page-backdrop pointer-events-none absolute inset-x-0 top-0 -z-10 h-200"
    />
  );
}
