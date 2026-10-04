import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { isLocale, getDirection } from "@/config/locales";
import { AppProviders } from "@/components/providers/AppProviders";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "../globals.css";
import { Box } from "@mui/material";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://easycity.agency"),
  title: { default: "Easy City Agency", template: "%s | Easy City" },
  description: "Digital growth and online business services from Easy City.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params, }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale) || !isLocale(locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const direction = getDirection(locale);

  return (
    <html lang={locale} dir={direction}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <AppProviders locale={locale}>
            <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", }}>
              <Header locale={locale} />
              <Box sx={{ flex: 1 }} > {children} </Box>
              <Footer locale={locale} />
            </Box>
          </AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
