import { notFound } from "next/navigation";
import { Container } from "@mui/material";
import { isLocale } from "@/config/locales";
import { getCountryBySlug } from "@/config/countries";
import { createPageMetadata } from "@/lib/seo/metadata";


// Meta Data seo
export async function generateMetadata({ params }: PageProps<"/[locale]/[country]">) {
  const { locale, country: slug } = await params;
  const country = getCountryBySlug(slug);
  if (!isLocale(locale) || !country) return {};
  const title = `${country.name[locale]} `;
  const description =
    locale === "ar" ? `اكتشف خدمات إيزي سيتي في ${country.name.ar}.` : `Explore Easy City services in ${country.name.en}.`;
  return createPageMetadata({ locale, title, description, pathname: `/${slug}` });
}

export default async function CountryPage({ params }: PageProps<"/[locale]/[country]">) {
  const { locale, country: slug } = await params;
  const country = getCountryBySlug(slug);
  console.log("country:", country);

  if (!isLocale(locale) || !country) notFound();

  return (
    <main className="country-page">
      <Container maxWidth="lg">
        <span className="eyebrow">Easy City / {country.code}</span>
        <h1> {locale === "ar" ? `إيزي سيتي في ${country.name.ar}` : `Easy City in ${country.name.en}`} </h1>
        <p> {locale === "ar" ? "نجهز تجربة مناسبة لسوقك المحلي." : "A digital growth experience for your local market."} </p>
      </Container>
    </main>
  );
}
