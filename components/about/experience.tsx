"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";
import { publicPath } from "@/lib/paths";

type Entry = {
  company: string;
  role: string;
  period?: string;
  description?: string;
  slug?: string;
  brand?: string;
  logo?: `/${string}`;
};

const ENTRIES: Entry[] = [
  {
    company: "Cybersecurity & IT Operations",
    role: "Intern",
    period: "Jul 2026 – Present",
    description: "Delivering projects, learning new tools and building full-stack skills.",
    logo: "/experience/internship.png",
  },
  {
    company: "Municipal Office in Kościerzyna",
    role: "IT Support Intern",
    description: "Computer setup, troubleshooting and technical support.",
    brand: "#0AE448",
  },
];

const COLLAPSED_COUNT = 2.5;
const ROW_HEIGHT = 64;
const ROW_GAP = 8;

export function Experience(): ReactNode {
  const [open, setOpen] = useState(false);
  const collapsedHeight =
    Math.floor(COLLAPSED_COUNT) * ROW_HEIGHT +
    Math.floor(COLLAPSED_COUNT) * ROW_GAP +
    (COLLAPSED_COUNT % 1) * ROW_HEIGHT;
  const hiddenCount = Math.max(0, ENTRIES.length - Math.floor(COLLAPSED_COUNT));
  const collapsed = hiddenCount > 0 && !open;

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
        Experience
      </h3>
      <div
        className={`border-foreground/5 bg-foreground/2 dark:bg-foreground/5 relative overflow-hidden rounded-4xl border px-2 pt-2 sm:px-4 sm:pt-4 ${
          collapsed ? "pb-0" : "pb-2 sm:pb-4"
        }`}
      >
        <motion.div
          className="relative"
          initial={false}
          animate={{
            height: collapsed ? collapsedHeight : "auto",
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: "hidden" }}
        >
          <ul className="flex flex-col gap-2">
            {ENTRIES.map((entry) => (
              <li
                key={`${entry.company}-${entry.period}`}
                className="bg-background border-foreground/5 flex items-center gap-4 rounded-3xl border p-2"
                style={{ minHeight: ROW_HEIGHT }}
              >
                <CompanyLogo entry={entry} />
                <div className="flex min-w-0 flex-col">
                  <span className="text-foreground text-[17px] font-semibold tracking-tight sm:text-[18px]">
                    {entry.company}
                  </span>
                  <span className="text-foreground/65 mt-0.5 text-[14px] tracking-tight sm:text-[15px]">
                    {entry.role}
                    {entry.period && (
                      <>
                        <span className="text-foreground/30 mx-2">•</span>
                        <span className="text-foreground/55">{entry.period}</span>
                      </>
                    )}
                  </span>
                  {entry.description && (
                    <p className="text-foreground/65 mt-1 text-[14px] leading-normal tracking-tight">
                      {entry.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        <AnimatePresence>
          {collapsed && (
            <motion.div
              key="fade"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0"
              style={{
                height: ROW_HEIGHT,
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                maskImage:
                  "linear-gradient(to bottom, transparent 0%, black 80%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent 0%, black 80%)",
              }}
            />
          )}
        </AnimatePresence>

        {hiddenCount > 0 && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className={`focus-ring text-foreground flex w-full cursor-pointer items-center justify-center gap-1.5 bg-transparent text-[15px] font-medium tracking-tight ${
              open
                ? "relative mt-4"
                : "absolute inset-x-0 bottom-0 z-10 py-3 sm:py-4"
            }`}
          >
            {open ? "Show less" : `Show ${hiddenCount} more`}
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="inline-flex"
            >
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </motion.span>
          </button>
        )}
      </div>
    </div>
  );
}

function CompanyLogo({ entry }: { entry: Entry }): ReactNode {
  const initials = entry.company.charAt(0);
  return (
    <span
      className="ring-foreground/8 inline-flex h-12 w-12 shrink-0 items-center justify-center bg-white ring-1 dark:ring-white/10"
      aria-hidden="true"
      style={{
        borderRadius: 14,
        ...(entry.slug || entry.logo ? {} : { backgroundColor: entry.brand }),
      }}
    >
      {entry.slug || entry.logo ? (
        <img
          src={entry.logo ? publicPath(entry.logo) : `https://cdn.simpleicons.org/${entry.slug}`}
          alt=""
          width={24}
          height={24}
          className="h-6 w-6"
          draggable={false}
        />
      ) : (
        <span className="text-[18px] font-semibold tracking-tight text-white">
          {initials}
        </span>
      )}
    </span>
  );
}
