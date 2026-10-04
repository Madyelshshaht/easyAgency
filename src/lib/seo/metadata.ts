import type { Metadata } from "next";
import type { Locale } from "@/config/locales";

type MetadataInput = {
  locale: Locale;
  title: string;
  description: string;
  pathname?: string;
};

export function createPageMetadata({ locale, title, description, pathname = "", }: MetadataInput): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://easycity.agency";
  const canonical = new URL(`/${locale}${pathname}`, siteUrl).toString();

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        ar: new URL(`/ar${pathname}`, siteUrl).toString(),
        en: new URL(`/en${pathname}`, siteUrl).toString(),
        "x-default": new URL("/ar", siteUrl).toString(),
      },
    },
    openGraph: { title, description, url: canonical, siteName: "Easy City", locale },
    twitter: { card: "summary_large_image", title, description },
  };
}
