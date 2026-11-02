"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

export function RouteScrollReset(): null {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const browserPathname = useRef<string | null>(null);
  const isHistoryNavigation = useRef(false);

  useLayoutEffect(() => {
    browserPathname.current = window.location.pathname;
    const onPopState = () => {
      isHistoryNavigation.current =
        browserPathname.current !== window.location.pathname;
    };

    window.addEventListener("popstate", onPopState, true);
    return () => window.removeEventListener("popstate", onPopState, true);
  }, []);

  useLayoutEffect(() => {
    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;
    browserPathname.current = window.location.pathname;

    if (isHistoryNavigation.current) {
      isHistoryNavigation.current = false;
      return;
    }

    window.scrollTo(0, 0);
    const frame = requestAnimationFrame(() => window.scrollTo(0, 0));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
