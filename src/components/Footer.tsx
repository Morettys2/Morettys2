"use client";

import { Github, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

const links = [
  { href: "https://github.com/Morettys2", label: "GitHub", Icon: Github },
  {
    href: "https://www.linkedin.com/in/jo%C3%A3o-pedro-do-prado-moretti-891083227/",
    label: "LinkedIn",
    Icon: Linkedin,
  },
  { href: "mailto:m0rettyy20@gmail.com", label: "Email", Icon: Mail },
];

export function FooterComponent() {
  const t = useTranslations();

  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
        <div className="text-center md:text-left">
          <p className="font-bold">João Pedro Moretti</p>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} · {t("main.footer.rights")}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {links.map(({ href, label, Icon }) => (
            <Link
              key={label}
              href={href}
              target="_blank"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Icon className="h-5 w-5" />
              <span className="sr-only">{label}</span>
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
