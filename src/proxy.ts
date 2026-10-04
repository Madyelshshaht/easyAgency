import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { getCountryByCode, getCountryBySlug } from "@/config/countries";
import { defaultLocale, isLocale } from "@/config/locales";
import { routing } from "@/i18n/routing";

const handleI18n = createMiddleware(routing);

function detectLocale(request: NextRequest) {
  const savedLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (isLocale(savedLocale)) return savedLocale;

  const preferred = request.headers.get("accept-language") ?? "";
  const language = preferred
    .split(",")
    .map((item) => item.trim().split(";")[0]?.toLowerCase())
    .find(
      (item) =>
        item === "ar" ||
        item?.startsWith("ar-") ||
        item === "en" ||
        item?.startsWith("en-"),
    );
  if (language) return language.startsWith("ar") ? "ar" : "en";
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const locale = detectLocale(request);
    const savedCountry = request.cookies.get("country")?.value;
    const detectedCountry = request.cookies.get("detected_country")?.value;
    const country =
      (savedCountry ? getCountryBySlug(savedCountry) : undefined) ??
      (detectedCountry ? getCountryBySlug(detectedCountry) : undefined) ??
      getCountryByCode(request.headers.get("x-vercel-ip-country") ?? undefined);
    const target = new URL(
      country ? `/${locale}/${country.slug}` : `/${locale}`,
      request.url,
    );
    const response = NextResponse.redirect(target);

    if (country && !savedCountry && !detectedCountry) {
      response.cookies.set("detected_country", country.slug, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
    }
    return response;
  }

  return handleI18n(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
