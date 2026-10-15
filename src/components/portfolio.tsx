"use client";

import { useState, useEffect } from "react";
import {
  Moon,
  Sun,
  Briefcase,
  GraduationCap,
  CodeXml,
  User,
  Layers,
  MapPin,
  Mail,
  Github,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import US from "country-flag-icons/react/3x2/US";
import BR from "country-flag-icons/react/3x2/BR";
import useLocale from "@/hooks/useLocale";
import DownloadCVButton from "./DownloadCVButton";
import { FooterComponent } from "./Footer";

const GITHUB_URL = "https://github.com/Morettys2";
const LINKEDIN_URL =
  "https://www.linkedin.com/in/jo%C3%A3o-pedro-do-prado-moretti-891083227/";
const EMAIL = "m0rettyy20@gmail.com";

const skills = {
  frontend: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS"],
  backend: ["Node.js", "NestJS", "PHP"],
  database: ["Oracle", "MySQL", "SQL Server"],
  tools: ["Git", "GitHub", "Postman"],
} as const;

const positions = [
  {
    key: "unimed",
    current: true,
    stack: ["Node.js", "TypeScript", "React", "Oracle", "Git"],
  },
  {
    key: "personal",
    current: false,
    stack: ["Next.js", "NestJS", "TypeScript", "Tailwind CSS"],
  },
] as const;

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
      {children}
    </li>
  );
}

function SectionTitle({
  icon: Icon,
  children,
}: {
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <h3 className="mb-6 flex items-center gap-2 text-2xl font-bold">
      <Icon className="h-6 w-6 text-muted-foreground" />
      {children}
    </h3>
  );
}

export function PortfolioComponent() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const t = useTranslations();
  const { locale, switchLocale: changeLanguage } = useLocale();

  useEffect(() => {
    // O script inline do layout já aplicou a classe antes da renderização
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleTheme = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <nav className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <CodeXml className="h-6 w-6" />
            <span className="hidden font-bold sm:inline">
              {t("header.title")}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Link href={`${GITHUB_URL}?tab=repositories`} target="_blank">
              <Button variant="ghost">{t("header.projects")}</Button>
            </Link>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" aria-label={t("header.language")}>
                  {locale === "en" ? (
                    <US title="United States" className="h-6 w-6" />
                  ) : (
                    <BR title="Brazil" className="h-6 w-6" />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="mx-4 flex w-fit flex-col space-y-2 p-2">
                <Button
                  className="justify-start gap-2"
                  variant="ghost"
                  onClick={() => changeLanguage("en")}
                >
                  <US title="United States" className="h-6 w-6" />
                  <span className="font-medium">EN-US</span>
                </Button>
                <Button
                  className="justify-start gap-2"
                  variant="ghost"
                  onClick={() => changeLanguage("pt")}
                >
                  <BR title="Brazil" className="h-6 w-6" />
                  <span className="font-medium">PT-BR</span>
                </Button>
              </PopoverContent>
            </Popover>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={t("header.theme")}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </Button>
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-4xl space-y-20 px-4 py-16 md:py-24">
        <section className="space-y-6">
          <p className="font-mono text-sm text-muted-foreground">
            {t("main.me.greeting")}
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            {t("main.me.name")}
          </h1>
          <div className="space-y-2">
            <p className="text-xl font-semibold md:text-2xl">
              {t("main.me.role")}
            </p>
            <p className="inline-flex items-center gap-2 text-muted-foreground">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>
              {t("main.me.current")}
            </p>
          </div>
          <p className="max-w-2xl text-lg text-muted-foreground">
            {t("main.me.summary")}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <DownloadCVButton />
            <a href={`mailto:${EMAIL}`}>
              <Button variant="outline" className="gap-2">
                <Mail className="h-4 w-4" />
                {t("main.me.contact")}
              </Button>
            </a>
            <Link href={GITHUB_URL} target="_blank" aria-label="GitHub">
              <Button variant="ghost" size="icon">
                <Github className="h-5 w-5" />
              </Button>
            </Link>
            <Link href={LINKEDIN_URL} target="_blank" aria-label="LinkedIn">
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        <section>
          <SectionTitle icon={User}>{t("main.about.title")}</SectionTitle>
          <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {t("main.about.description")}
          </p>
        </section>

        <section>
          <SectionTitle icon={Briefcase}>
            {t("main.experience.title")}
          </SectionTitle>
          <ol className="relative space-y-10 border-l border-border pl-6">
            {positions.map(({ key, current, stack }) => (
              <li key={key} className="relative">
                <span
                  className={`absolute -left-[31px] top-1.5 h-3 w-3 rounded-full ring-4 ring-background ${
                    current ? "bg-green-500" : "bg-muted-foreground"
                  }`}
                />
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="font-mono text-sm text-muted-foreground">
                    {t(`main.experience.positions.${key}.duration`)}
                  </p>
                  {current && (
                    <span className="rounded-full border border-green-500/40 px-2 py-0.5 text-xs font-medium text-green-600 dark:text-green-400">
                      {t("main.experience.current")}
                    </span>
                  )}
                </div>
                <h4 className="mt-1 text-xl font-semibold">
                  {t(`main.experience.positions.${key}.title`)}
                  <span className="text-muted-foreground">
                    {" · "}
                    {t(`main.experience.positions.${key}.company`)}
                  </span>
                </h4>
                <p className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {t(`main.experience.positions.${key}.location`)}
                </p>
                <p className="mt-3 max-w-3xl leading-relaxed">
                  {t(`main.experience.positions.${key}.description`)}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {stack.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <SectionTitle icon={Layers}>{t("main.skills.title")}</SectionTitle>
          <div className="grid gap-4 sm:grid-cols-2">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group} className="rounded-lg border p-4">
                <p className="mb-3 text-sm font-semibold text-muted-foreground">
                  {t(`main.skills.${group}`)}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {items.map((tech) => (
                    <Tag key={tech}>{tech}</Tag>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle icon={GraduationCap}>
            {t("main.education.title")}
          </SectionTitle>
          <div className="rounded-lg border p-4">
            <p className="font-mono text-sm text-muted-foreground">
              {t("main.education.duration")}
            </p>
            <h4 className="mt-1 text-xl font-semibold">
              {t("main.education.degree")}
            </h4>
            <p className="text-muted-foreground">
              {t("main.education.level")} · {t("main.education.institution")}
            </p>
          </div>
        </section>
      </main>

      <FooterComponent />
    </div>
  );
}
