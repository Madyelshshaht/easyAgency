import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button, Container } from "@mui/material";
import { isLocale } from "@/config/locales";
import { countries } from "@/config/countries";
import { createPageMetadata } from "@/lib/seo/metadata";
import LinkBehavior from "@/components/common/LinkBehavior";

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: "Home" });
  return createPageMetadata({ locale, title: t("title"), description: t("description") });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Home" });
  const audiences = t.raw("audiences") as string[];

  return (
    <main>
      <section className="hero-section">
        <Container maxWidth="lg" className="hero-content">
          <div className="hero-copy">
            <span className="eyebrow">{t("eyebrow")}</span>
            <h1>{t("title")}</h1>
            <p>{t("description")}</p>
            <div className="hero-actions">
              <Button
                component={LinkBehavior}
                href={`/${locale}/services`}
                variant="contained"
                size="large"
                disableElevation
              >
                {t("primaryCta")}
              </Button>
              <Button
                component={LinkBehavior}
                href={`/${locale}/contact`}
                variant="outlined"
                size="large"
              >
                {t("secondaryCta")}
              </Button>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />
            <div className="hero-card card-main">
              <span>easy city</span>
              <strong>
                Grow
                <br />
                together.
              </strong>
            </div>
            <div className="hero-card card-float">
              <span className="card-spark">✦</span>
              <strong>+35%</strong>
              <small>business reach</small>
            </div>
            <div className="hero-dot dot-one" />
            <div className="hero-dot dot-two" />
          </div>
        </Container>
      </section>

      <section className="audiences-section">
        <Container maxWidth="lg">
          <div className="section-heading">
            <span className="eyebrow">{t("eyebrow")}</span>
            <h2>{t("audiencesTitle")}</h2>
          </div>
          <div className="audience-grid">
            {audiences.map((audience, index) => (
              <article className="audience-card" key={audience}>
                <span className="audience-number">0{index + 1}</span>
                <h3>{audience}</h3>
                <span className="audience-arrow" aria-hidden="true">
                  ↗
                </span>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="countries-section">
        <Container maxWidth="lg" className="countries-inner">
          <div>
            <span className="eyebrow">Easy City</span>
            <h2>
              {locale === "ar"
                ? "حلول محلية لنمو أعمالك"
                : "Local solutions for growing businesses"}
            </h2>
          </div>
          <div className="country-pills">
            {countries.map((country) => (
              <Button
                key={country.code}
                component={LinkBehavior}
                href={`/${locale}/${country.slug}`}
                variant="outlined"
              >
                {country.name[locale]} <span aria-hidden="true">↗</span>
              </Button>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
