import { ArrowRight, Flag, Radar } from "lucide-react";
import type { ComponentType, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { FadeIn } from "@/components/ui/motion-primitives";
import { publicPath } from "@/lib/paths";

type Project = {
  id: string;
  icon: ComponentType<{ className?: string }>;
  iconLabel: string;
  title: string;
  description: string;
  meta: string;
  image: `/${string}`;
  imageAlt: string;
  href?: string;
};

const PROJECTS: Project[] = [
  {
    id: "hackademy",
    icon: Flag,
    iconLabel: "Hackademy",
    title: "A CTF platform inspired by real security incidents.",
    description:
      "Custom challenges and a full-stack platform built by me. First load may take 1–3 minutes on free hosting.",
    meta: "React, Tailwind CSS, JavaScript, Java, Spring Boot, PostgreSQL",
    image: "/projects/hackademy-logo-dark.webp",
    imageAlt: "White Hackademy logo on a dark background",
    href: "https://hackademy-front.onrender.com/",
  },
  {
    id: "ad-home-lab",
    icon: Radar,
    iconLabel: "AD Home Lab",
    title: "An Active Directory lab for attack and detection.",
    description:
      "Emulating attacks with Atomic Red Team and writing Splunk detections from Sysmon logs, mapped to MITRE ATT&CK.",
    meta: "Active Directory, Splunk, PowerShell, Windows Server, Kali Linux, Sysmon",
    image: "/projects/ad-home-lab-dark.webp",
    imageAlt: "Network diagram of my Active Directory home lab",
  },
];

export type ProjectsProps = {
  withHeadline?: boolean;
  viewMoreVisible?: boolean;
  eagerImages?: boolean;
};

export function Projects({
  withHeadline = false,
  viewMoreVisible = false,
  eagerImages = false,
}: ProjectsProps): ReactNode {
  const items = viewMoreVisible ? PROJECTS.slice(0, 4) : PROJECTS;

  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        {withHeadline ? (
          <FadeIn className="flex flex-col items-center gap-5 pt-12 pb-10 text-center sm:pt-20 sm:pb-14">
            <h2 className="text-foreground font-serif text-[2.5rem] leading-[1.05] font-medium tracking-tight md:text-[3rem] lg:text-[3.5rem]">
              My projects
            </h2>
            <p className="text-foreground/65 max-w-[33ch] text-[18px] leading-[1.45] tracking-tight sm:text-[20px]">
              Security labs, practical tools and full-stack projects.
            </p>
          </FadeIn>
        ) : null}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7">
          {items.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              priorityImage={eagerImages && index < 2}
            />
          ))}
        </div>

        {viewMoreVisible ? (
          <div className="mt-12 flex justify-center sm:mt-16">
            <Link
              href="/projects"
              className="border-foreground/8 focus-ring group bg-background text-foreground hover:bg-foreground/5 inline-flex cursor-pointer items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-medium transition-colors"
            >
              View all projects
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  priorityImage,
}: {
  project: Project;
  index: number;
  priorityImage: boolean;
}): ReactNode {
  const Icon = project.icon;
  return (
    <FadeIn delay={Math.min(index * 0.06, 0.3)} className="h-full min-w-0">
      <CardLink href={project.href}>
        <article className="project-card border-foreground/8 bg-background flex h-full cursor-pointer flex-col gap-4 rounded-3xl border p-3 sm:p-3.5">
          <header className="flex items-center gap-2.5 px-1 pt-2">
            <span className="border-foreground/10 bg-background inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border">
              <Icon
                className="text-foreground h-3.5 w-3.5"
                aria-hidden="true"
              />
            </span>
            <span className="text-foreground text-sm font-medium tracking-tight">
              {project.iconLabel}
            </span>
          </header>

          <div className="project-card__image ring-foreground/5 bg-foreground/5 relative aspect-[682/401] w-full shrink-0 overflow-hidden rounded-2xl ring-1">
            <div className="project-card__image-inner">
              <Image
                src={publicPath(project.image)}
                alt={project.imageAlt}
                fill
                sizes="(min-width: 1024px) 540px, (min-width: 768px) 45vw, 100vw"
                className="object-cover object-top"
                priority={priorityImage}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2.5 px-1 pb-1">
            <h3 className="text-foreground text-[20px] leading-[1.2] font-medium tracking-tight sm:text-[22px]">
              {project.title}
            </h3>
            <p className="text-foreground/65 text-[14px] leading-normal tracking-tight sm:text-[15px]">
              {project.description}
            </p>
          </div>

          <p className="text-foreground/50 mt-auto px-1 pb-2 text-[12px] tracking-tight">
            {project.meta}
          </p>
        </article>
      </CardLink>
    </FadeIn>
  );
}

function CardLink({
  href,
  children,
}: {
  href?: string | undefined;
  children: ReactNode;
}): ReactNode {
  if (!href) return children;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="focus-ring block h-full rounded-3xl"
    >
      {children}
    </a>
  );
}
