"use client";

import { useMemo, type ReactNode } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import rtlPlugin from "stylis-plugin-rtl";
import { createAppTheme } from "@/theme/theme";
import type { Locale } from "@/config/locales";
import { getDirection } from "@/config/locales";

export function AppProviders({ locale, children, }: { locale: Locale; children: ReactNode; }) {
  const direction = getDirection(locale);
  const theme = useMemo(() => createAppTheme(direction), [direction]);
  const stylisPlugins = direction === "rtl" ? [rtlPlugin] : [];

  return (
    <AppRouterCacheProvider options={{ key: direction === "rtl" ? "muirtl" : "mui", stylisPlugins }} >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
}
