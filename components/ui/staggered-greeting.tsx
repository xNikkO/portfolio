"use client";

// Local reveal animation; this is not the licensed React Bits Pro component.
import { motion } from "motion/react";
import { useReducedMotion } from "@/lib/motion";

const TEXT = "Hey, I'm Nikodem";

export function StaggeredGreeting() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <p className="text-foreground py-1 text-[20px] font-medium leading-tight tracking-tight">
        {TEXT}
      </p>
    );
  }

  return (
    <p className="text-foreground text-[20px] font-medium leading-tight tracking-tight">
      <span className="sr-only">{TEXT}</span>
      <span aria-hidden="true" className="inline-flex flex-wrap justify-center gap-x-[0.3em]">
        {TEXT.split(" ").map((word, index) => (
          <span key={`${word}-${index}`} className="inline-block overflow-hidden py-1">
            <motion.span
              className="inline-block"
              initial={{ transform: "translateY(110%)", opacity: 0 }}
              animate={{ transform: "translateY(0%)", opacity: 1 }}
              transition={{
                duration: 0.65,
                delay: 0.12 + index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </span>
    </p>
  );
}
