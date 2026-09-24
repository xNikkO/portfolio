import type { ReactNode } from "react";

import { HeroCtas } from "./hero-ctas";
import { PortraitCard } from "./portrait-card";
import { FadeIn } from "@/components/ui/motion-primitives";
import { StaggeredGreeting } from "@/components/ui/staggered-greeting";

export function Hero(): ReactNode {
  return (
    <section className="relative w-full">
      <div className="mx-auto grid w-full max-w-275 grid-cols-1 items-center gap-14 px-6 pt-40 pb-24 sm:px-10 sm:pt-48 sm:pb-32 md:grid-cols-[1.2fr_1fr] md:gap-10">
        <div className="flex min-w-0 flex-col items-center gap-4 text-center md:items-start md:text-left">
          <StaggeredGreeting />

          <FadeIn
            delay={0.2}
            className="flex w-full flex-col items-center gap-5 md:items-start"
          >
            <h1 className="text-foreground text-[2.5rem] leading-[1.05] font-medium tracking-tight md:text-[2.65rem] lg:text-[3.65rem]">
              <span className="block">Cybersecurity &</span>
              <span className="block">development</span>
            </h1>

            <p className="text-foreground/65 max-w-[40ch] text-[20px] leading-[1.4] tracking-tight sm:text-[22px]">
              Computer Science student building security tools and growing
              through hands-on internship projects.
            </p>

            <HeroCtas />
          </FadeIn>
        </div>

        <FadeIn delay={0.3} className="w-full px-2 sm:px-3">
          <PortraitCard />
        </FadeIn>
      </div>
    </section>
  );
}
