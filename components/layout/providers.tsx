"use client";

import { ReducedMotionProvider } from "@/lib/motion";
import { RouteScrollReset } from "@/components/layout/route-scroll-reset";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }): ReactNode {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ReducedMotionProvider>
        <RouteScrollReset />
        {children}
      </ReducedMotionProvider>
    </ThemeProvider>
  );
}
