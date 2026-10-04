"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Box, Button, Drawer, IconButton, Stack } from "@mui/material";
import type { Locale } from "@/config/locales";
import { CountrySwitcher } from "./CountrySwitcher";

export function MobileMenu({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Navigation");

  return (
    <>
      <IconButton
        className="mobile-menu-button"
        aria-label={locale === "ar" ? "فتح القائمة" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen(true)}
        color="primary"
      >
        <span aria-hidden="true">☰</span>
      </IconButton>
      <Drawer anchor={locale === "ar" ? "right" : "right"} open={open} onClose={() => setOpen(false)} sx={{ position: "relative" }}>
        <Box
          className="mobile-menu-close"
          sx={{
            // backgroundColor: "red",
            border: "1px solid black",
            position: "absolute",
            right: 10, top: 5,
            py: 0.0, px: 0.5,
            borderRadius: "50%",
            cursor: "pointer",
            color: "black",
            fontWeight: "bold"
          }}
          onClick={() => setOpen(false)} aria-label={locale === "ar" ? "إغلاق القائمة" : "Close menu"}
        >
          x
        </Box>
        <Stack className="mobile-menu-content" spacing={2} sx={{ pt: 4 }}>
          <Link href={`/${locale}`} onClick={() => setOpen(false)}>
            {t("home")}
          </Link>
          <Link href={`/${locale}/services`} onClick={() => setOpen(false)}>
            {t("services")}
          </Link>
          <Link href={`/${locale}/blog`} onClick={() => setOpen(false)}>
            {t("blog")}
          </Link>
          <Link href={`/${locale}/contact`} onClick={() => setOpen(false)}>
            {t("contact")}
          </Link>
          <CountrySwitcher locale={locale} />
          <Button component={Link} href={`/${locale === "ar" ? "en" : "ar"}`} onClick={() => setOpen(false)} variant="outlined" >
            {t("language")}
          </Button>

        </Stack>
      </Drawer>
    </>
  );
}
