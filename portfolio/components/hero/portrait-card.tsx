import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { publicPath } from "@/lib/paths";

export function PortraitCard() {
  return (
    <div className="relative isolate mx-auto w-full max-w-72 sm:max-w-80 lg:max-w-88">
      <div
        aria-hidden="true"
        className="border-foreground/10 bg-foreground/5 absolute inset-0 -z-10 -rotate-3 rounded-4xl border"
      />
      <Link
        href="/about"
        aria-label="More about Nikodem Mahlik"
        className="focus-ring group border-foreground/10 bg-background relative block rotate-2 rounded-4xl border p-3 shadow-xl shadow-black/10 transition-transform duration-200 ease-out hover:rotate-0 focus-visible:rotate-0 active:scale-[0.98] motion-reduce:transition-none dark:shadow-black/30"
      >
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-[#dededb]">
          <Image
            src={publicPath("/portraits/nikodem-illustrated-v2.png")}
            alt="Hand-drawn black-and-white portrait of Nikodem Mahlik"
            fill
            sizes="(min-width: 1024px) 328px, (min-width: 640px) 296px, 264px"
            className="object-contain p-4 sm:p-5"
            priority
          />
          <span
            aria-hidden="true"
            className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-neutral-950 text-white"
          >
            <ArrowUpRight className="h-5 w-5" strokeWidth={1.75} />
          </span>
        </div>

        <div className="flex items-end justify-between gap-3 px-2 pt-5 pb-3 text-left">
          <div>
            <p className="text-foreground/55 mb-1 text-[13px] tracking-tight">
              A little about me
            </p>
            <p className="text-foreground text-[24px] leading-tight font-medium tracking-tight">
              Nikodem Mahlik
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
