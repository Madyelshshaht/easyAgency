import type { MetadataRoute } from "next";
import { countries } from "@/config/countries";
import { locales } from "@/config/locales";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://easycity.agency";
  const paths = ["", "/services", "/blog", "/contact"];
  const urls = locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteUrl}/${locale}${path}`,
      lastModified: new Date(),
    })),
  );
  const countryUrls = locales.flatMap((locale) =>
    countries.map((country) => ({
      url: `${siteUrl}/${locale}/${country.slug}`,
      lastModified: new Date(),
    })),
  );
  return [...urls, ...countryUrls];
}
