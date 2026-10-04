import Link from "next/link";
import { Container, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import type { Locale } from "@/config/locales";

export function Footer({ locale }: { locale: Locale }) {
  const t = useTranslations("Footer");
  return (
    <footer className="site-footer">
      <Container maxWidth="lg" className="footer-inner">
        <Link className="brand footer-brand" href={`/${locale}`}>
          <span className="brand-mark">EC</span>
          <span>easy city</span>
        </Link>
        <Typography variant="body2">{t("copyright")}</Typography>
      </Container>
    </footer>
  );
}
