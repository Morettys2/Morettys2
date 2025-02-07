"use client";

import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function FooterComponent({ isDarkMode }: { isDarkMode: boolean }) {
  const t = useTranslations();

  return (
    <footer
      className={`border-t border-gray-200 ${isDarkMode ? "text-white" : "bg-white text-gray-800"}`}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">João Pedro Moretti</h2>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              {t("main.me.role")}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="https://github.com/Morettys2"
              className={`hover:text-gray-600 transition-colors ${
                isDarkMode ? "text-gray-300 hover:text-gray-100" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Github className="w-6 h-6" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/jo%C3%A3o-pedro-do-prado-moretti-891083227/"
              className={`hover:text-gray-600 transition-colors ${
                isDarkMode ? "text-gray-300 hover:text-gray-100" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Linkedin className="w-6 h-6" />
              <span className="sr-only">LinkedIn</span>
            </Link>
            <Link
              href="https://x.com/Moretty361832"
              className={`hover:text-gray-600 transition-colors ${
                isDarkMode ? "text-gray-300 hover:text-gray-100" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Twitter className="w-6 h-6" />
              <span className="sr-only">Twitter</span>
            </Link>
            <Link
              href="mailto:m0rettyy20@gmail.com"
              className={`hover:text-gray-600 transition-colors ${
                isDarkMode ? "text-gray-300 hover:text-gray-100" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Mail className="w-6 h-6" />
              <span className="sr-only">Email</span>
            </Link>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
            &copy; {new Date().getFullYear()} João Pedro Moretti. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
