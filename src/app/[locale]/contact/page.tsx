import { Container } from "@mui/material";
import { notFound } from "next/navigation";
import { isLocale } from "@/config/locales";

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <main className="simple-page">
      <Container maxWidth="lg">
        <span className="eyebrow">Easy City</span>
        <h1>{locale === "ar" ? "تواصل معنا" : "Contact us"}</h1>
        <p>
          {locale === "ar"
            ? "سيتم توصيل النموذج بوجهة الإرسال الحالية بعد التحقق منها."
            : "The contact form will be connected to its current submission provider after verification."}
        </p>
      </Container>
    </main>
  );
}
