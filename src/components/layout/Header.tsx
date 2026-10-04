import Link from "next/link";
import { useTranslations } from "next-intl";
import { Box, Button, Container } from "@mui/material";
import type { Locale } from "@/config/locales";
import LinkBehavior from "@/components/common/LinkBehavior";
import { CountrySwitcher } from "@/components/navigation/CountrySwitcher";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { LanguageSwitcher } from "@/components/navigation/LanguageSwitcher";

export function Header({ locale }: { locale: Locale }) {
  const t = useTranslations("Navigation");
  const isArabic = locale === "ar";

  return (
    <header className="site-header">
      <Container maxWidth="lg" className="header-inner" sx={{py:1.5}}>
        <Link className="brand" href={`/${locale}`} aria-label="Easy City home">
          <span className="brand-mark">EC</span>
          <span>easy city</span>
        </Link>
        <nav className="main-nav" aria-label={isArabic ? "التنقل الرئيسي" : "Main navigation"} >
          <Link href={`/${locale}`}>{t("home")}</Link>
          <Link href={`/${locale}/services`}>{t("services")}</Link>
          <Link href={`/${locale}/blog`}>{t("blog")}</Link>
          <Link href={`/${locale}/contact`}>{t("contact")}</Link>
        </nav>
        <Box className="header-actions" sx={{ display: "flex", alignItems: "center", gap: 1.5 }} >
          <LanguageSwitcher locale={locale} />
          <CountrySwitcher locale={locale} />
          <Button
            component={LinkBehavior}
            href={`/${locale}/contact`}
            variant="contained"
            disableElevation
          >
            {t("contact")}
          </Button>
        </Box>
        <MobileMenu locale={locale} />
      </Container>
    </header>
  );
}
