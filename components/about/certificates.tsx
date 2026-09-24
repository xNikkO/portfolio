import type { ReactNode } from "react";
import { publicPath } from "@/lib/paths";

type Certificate = {
  name: string;
  href: string;
};

const CERTIFICATES: Certificate[] = [
  {
    name: "AI Security Certificate",
    href: "https://tryhackme.com/certificate/THM-4BHSHYQDTA",
  },
  {
    name: "CCNA: Introduction to Networks",
    href: publicPath("/certificates/certificate-CCNA.pdf"),
  },
  {
    name: "Jr Penetration Tester",
    href: "https://tryhackme.com/certificate/THM-6R9EE67UBD",
  },
  {
    name: "Pre Security",
    href: "https://tryhackme.com/certificate/THM-ZAEYDTGZQ2",
  },
  {
    name: "Web Fundamentals",
    href: "https://tryhackme.com/certificate/THM-TEAANL4KH7",
  },
  {
    name: "CyberSecurity 101",
    href: "https://tryhackme.com/certificate/THM-FCU7HU6SRY",
  },
  {
    name: "Advent Of Cyber 2025",
    href: "https://tryhackme-certificates.s3-eu-west-1.amazonaws.com/THM-M4FKUXECDS.pdf",
  },
];

export function Certificates(): ReactNode {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-foreground text-[15px] font-semibold tracking-tight">
        Certificates
      </h3>
      <div className="border-foreground/5 bg-foreground/2 dark:bg-foreground/5 rounded-4xl border p-2 sm:p-4">
        <div className="flex flex-wrap gap-3">
          {CERTIFICATES.map((cert) => (
            <a
              key={cert.name}
              href={cert.href}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring border-foreground/8 bg-background text-foreground/85 hover:text-foreground rounded-full border px-4 py-2 text-[14px] tracking-tight transition-colors sm:text-[15px]"
            >
              {cert.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
