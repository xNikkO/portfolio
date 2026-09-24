"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

export function RouteScrollReset(): null {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);

  useLayoutEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;

    window.scrollTo(0, 0);
    const frame = requestAnimationFrame(() => window.scrollTo(0, 0));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
