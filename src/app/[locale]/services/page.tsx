import { Container } from "@mui/material";
import { notFound } from "next/navigation";
import { isLocale } from "@/config/locales";

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <main className="simple-page">
      <Container maxWidth="lg">
        <span className="eyebrow">Easy City</span>
        <h1>{locale === "ar" ? "خدماتنا" : "Our services"}</h1>
        <p>
          {locale === "ar"
            ? "ستظهر هنا خدمات إيزي سيتي المرتبطة بمحتوى ووردبريس."
            : "Easy City services from WordPress will appear here."}
        </p>
      </Container>
    </main>
  );
}
