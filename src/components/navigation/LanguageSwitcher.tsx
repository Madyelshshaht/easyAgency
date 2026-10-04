"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import type { Locale } from "@/config/locales";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const segments = pathname.split("/");
  segments[1] = locale === "ar" ? "en" : "ar";

  return (
    <Link className="language-link" href={segments.join("/") || `/${locale}`}>
      {t("language")}
    </Link>
  );
}
